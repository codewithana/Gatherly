const nodemailer=require('nodemailer');
const dotenv=require('dotenv');
dotenv.config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
});
exports.sendOtpEmail = async (email, otp, type) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Account Verification',

            text: `Your OTP is ${otp}. It will expire in 5 minutes.`,

            html: `
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; background-color:#f4f6f9;
                         font-family:Arial,Helvetica,sans-serif;">

                <div style="max-width:600px; margin:30px auto;
                            background:#ffffff; border-radius:12px;
                            overflow:hidden; border:1px solid #e5e7eb;">

                    <div style="background:#2563eb; padding:25px;
                                text-align:center; color:#ffffff;">
                        <h1 style="margin:0; font-size:26px;">
                            ${process.env.APP_NAME || 'Your App'}
                        </h1>
                        <p style="margin:8px 0 0; font-size:14px;">
                            Secure Account Verification
                        </p>
                    </div>

                    <div style="padding:30px 25px; color:#374151;">
                        <h2 style="margin-top:0; color:#111827;">
                            Verify Your Account
                        </h2>

                        <p style="font-size:15px; line-height:1.7;">
                            Hello,
                        </p>

                        <p style="font-size:15px; line-height:1.7;">
                            Use the One-Time Password (OTP) below to
                            ${type === 'reset'
                                ? 'reset your password'
                                : 'verify your account'}.
                        </p>

                        <div style="margin:28px 0; padding:22px;
                                    background:#eff6ff; border:1px dashed #93c5fd;
                                    border-radius:8px; text-align:center;">

                            <p style="margin:0 0 10px; font-size:12px;
                                      color:#6b7280; text-transform:uppercase;
                                      letter-spacing:2px;">
                                Your Verification Code
                            </p>

                            <div style="font-size:32px; font-weight:bold;
                                        letter-spacing:8px; color:#1d4ed8;">
                                ${otp}
                            </div>
                        </div>

                        <p style="font-size:14px; line-height:1.7;">
                            This OTP is valid for
                            <strong>5 minutes</strong>. Please complete
                            verification before it expires.
                        </p>

                        <div style="margin-top:24px; padding:15px;
                                    background:#fff7ed; border-radius:6px;
                                    color:#9a3412; font-size:13px;
                                    line-height:1.6;">
                            <strong>Security Notice:</strong>
                            Never share this OTP with anyone.
                            Our team will never ask you to disclose it.
                            If you did not request this code, please
                            ignore this email.
                        </div>
                    </div>

                    <div style="padding:18px; background:#f9fafb;
                                text-align:center; border-top:1px solid #e5e7eb;">
                        <p style="margin:0; color:#6b7280; font-size:12px;">
                            This is an automated email. Please do not reply.
                        </p>
                        <p style="margin:8px 0 0; color:#9ca3af; font-size:11px;">
                            &copy; ${new Date().getFullYear()}
                            ${process.env.APP_NAME || 'Your App'}
                        </p>
                    </div>

                </div>
            </body>
            </html>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully to ${email}`);

    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

exports.sendEventBookingEmail = async (email, booking) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Booking Confirmed: ${booking.eventName}`,

            text: `Your booking for ${booking.eventName} is confirmed.
            Booking ID: ${booking.bookingId}
            Date: ${booking.eventDate}
            Venue: ${booking.venue}`,

            html: `
            <!DOCTYPE html>
            <html>
            <body style="margin:0; padding:0; background:#f3f4f6;
                         font-family:Arial,sans-serif;">

                <div style="max-width:600px; margin:30px auto;
                            background:#ffffff; border-radius:12px;
                            overflow:hidden; border:1px solid #e5e7eb;">

                    <div style="background:#16a34a; padding:28px;
                                text-align:center; color:#ffffff;">
                        <h1 style="margin:0;">Booking Confirmed!</h1>
                        <p style="margin:10px 0 0;">
                            Your event booking was successful.
                        </p>
                    </div>

                    <div style="padding:28px; color:#374151;">
                        <h2 style="color:#111827;">
                            Hello ${booking.attendeeName || 'there'},
                        </h2>

                        <p style="line-height:1.7;">
                            Thank you for booking with us.
                            We're excited to have you join us!
                            Here are your booking details:
                        </p>

                        <div style="background:#f9fafb; padding:20px;
                                    border-radius:8px; margin:22px 0;">

                            <h2 style="margin-top:0; color:#2563eb;">
                                ${booking.eventName}
                            </h2>

                            <p><strong>Booking ID:</strong>
                                ${booking.bookingId}</p>

                            <p><strong>Date:</strong>
                                ${booking.eventDate}</p>

                            <p><strong>Time:</strong>
                                ${booking.eventTime || 'As scheduled'}</p>

                            <p><strong>Venue:</strong>
                                ${booking.venue}</p>

                            <p><strong>Attendees:</strong>
                                ${booking.attendees || 1}</p>

                            <p><strong>Amount Paid:</strong>
                                ${booking.amountPaid ?? 'N/A'}</p>
                        </div>

                        <p style="font-size:14px; line-height:1.7;">
                            Please keep your booking ID for future
                            reference and present your ticket or
                            confirmation at the venue if required.
                        </p>

                        <p style="margin-top:25px;">
                            We look forward to seeing you!
                        </p>

                        <p>Best regards,<br>
                        <strong>${process.env.APP_NAME || 'Event Team'}</strong></p>
                    </div>

                    <div style="background:#f9fafb; padding:18px;
                                text-align:center; color:#9ca3af;
                                font-size:12px;">
                        This is an automated email. Please do not reply.
                        <br><br>
                        &copy; ${new Date().getFullYear()}
                        ${process.env.APP_NAME || 'Event Team'}
                    </div>

                </div>
            </body>
            </html>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Booking confirmation sent to ${email}`);

    } catch (error) {
        console.error('Error sending booking confirmation:', error);
        throw error;
    }
};