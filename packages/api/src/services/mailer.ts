import transport from '../config/mailer/config';

function sendVerificationEmail(email: string, token: string) {
    return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify your email address',
        html: `
            <h1>Verify your email address</h1>
            <p>Use this code to complete the submit process:</p>
            <p><b>${token}</b></p>
        `
    });
}

export const mailerService = { sendVerificationEmail };
