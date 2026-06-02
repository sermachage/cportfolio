import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { createRateLimiter, getClientIp } from '@/lib/rate-limit/rate-limiter';

export async function POST(request: NextRequest) {
    try {
        // Apply rate limiting
        const rateLimiter = createRateLimiter();
        const identifier = getClientIp(request);
        const { success, limit, reset, remaining } = await rateLimiter.limit(identifier);

        // Set rate limit headers
        const headers = {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
        };

        if (!success) {
            console.warn(`Rate limit exceeded for IP: ${identifier}`);
            return NextResponse.json(
                { 
                    message: 'Too many requests. Please try again later.',
                    retryAfter: new Date(reset).toISOString()
                },
                { status: 429, headers }
            );
        }

        const body = await request.json();
        const { to, subject, text, html, replyTo } = body;

        // Validate required fields
        if (!to || !subject) {
            return NextResponse.json(
                { message: 'Missing required fields: to, subject' },
                { status: 400 }
            );
        }

        // Check for required OAuth2 environment variables
        const {
            EMAIL_USER,
            EMAIL_CLIENT_ID,
            EMAIL_CLIENT_SECRET,
            EMAIL_REFRESH_TOKEN,
        } = process.env;

        if (
            !EMAIL_USER ||
            !EMAIL_CLIENT_ID ||
            !EMAIL_CLIENT_SECRET ||
            !EMAIL_REFRESH_TOKEN
        ) {
            console.error('Missing Gmail OAuth2 configuration environment variables');
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const oAuth2Client = new google.auth.OAuth2(
            EMAIL_CLIENT_ID,
            EMAIL_CLIENT_SECRET
        );
        oAuth2Client.setCredentials({ refresh_token: EMAIL_REFRESH_TOKEN });

        const accessTokenResponse = await oAuth2Client.getAccessToken();
        const accessToken =
            typeof accessTokenResponse === 'string'
                ? accessTokenResponse
                : accessTokenResponse?.token;

        if (!accessToken) {
            console.error('Failed to acquire Gmail OAuth2 access token');
            return NextResponse.json(
                { message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: EMAIL_USER,
                clientId: EMAIL_CLIENT_ID,
                clientSecret: EMAIL_CLIENT_SECRET,
                refreshToken: EMAIL_REFRESH_TOKEN,
                accessToken,
            },
        });

        // Verify transporter configuration
        await transporter.verify();

        // Send email
        const info = await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to,
            replyTo: replyTo || undefined, // Allow replying directly to the sender
            subject,
            text,
            html,
        });

        console.log('Email sent successfully:', info.messageId);

        return NextResponse.json({ 
            message: 'Email sent successfully',
            messageId: info.messageId 
        }, { headers });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            {
                message: 'Failed to send email',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}