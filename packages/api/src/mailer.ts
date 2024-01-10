import transport from './config/mailer/config';

function sendVerificationEmail(email: string, token: string) {
    return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify your email address',
        html: `
            <h1>Verify your email address</h1>
            <p>Click <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">here</a> to verify your email address.</p>
        `
    });
}

export const mailerService = { sendVerificationEmail };
