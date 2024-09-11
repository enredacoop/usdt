import transport from '../config/mailer/config';

function sendVerificationEmail(email: string, token: string) {
    return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Verify your email address',
        html: `
            <h3>Verify your email address</h3>
            <p>Use this code to complete the submit process:</p>
            <p><b>${token}</b></p>
        `
    });
}

function sendResultLinkEmail(uuid: string, email: string) {
    const baseURL = process.env.FRONTEND_URL as string;
    const url = `${baseURL}/results/${uuid}` as string;
    return transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Results for your document are ready',
        html: `
            <h3>Results for your document are ready</h3>
            <p>Follow this link to have an overview of your document</p>
            <p><a href="${url}" target="_blank">${url}</a></p>
        `
    });
}

export const mailerService = { sendVerificationEmail, sendResultLinkEmail };
