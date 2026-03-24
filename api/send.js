import { Resend } from 'resend';

export default async function handler(req, res) {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY");
        return res.status(500).json({ success: false, error: 'Server misconfiguration.' });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, message, websiteUrl } = req.body;
        
        // 1. Spam Protection / Honeypot
        if (websiteUrl) {
            console.warn(`Spam detected from IP ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
            return res.status(200).json({ success: true, message: 'Message received.' });
        }

        // 2. Validation
        if (!name || name.trim().length < 2) {
            return res.status(400).json({ success: false, error: 'Name is required and must be at least 2 characters.' });
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
             return res.status(400).json({ success: false, error: 'A valid email address is required.' });
        }

        if (phone && phone.trim().length > 0) {
            const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
            }
        }

        if (!message || message.trim().length < 10) {
            return res.status(400).json({ success: false, error: 'Message must be at least 10 characters long.' });
        }

        // 3. Send Email
        const targetEmail = process.env.TARGET_EMAIL || 'cads24x7@gmail.com';
        
        const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb; color: #333; }
        .container { max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff; }
        .header { background-color: #800180; padding: 20px; text-align: center; }
        .header h2 { color: #ffffff; margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .intro { font-size: 16px; margin-top: 0; margin-bottom: 20px; }
        .details-box { background-color: #ffffff; padding: 20px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin: 0 0 20px 0; border: 1px solid #edf2f7; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 12px 0; border-bottom: 1px solid #edf2f7; color: #2d3748; }
        .label { width: 100px; font-weight: bold; color: #4a5568; }
        .message-label { padding: 15px 0 5px 0; font-weight: bold; color: #4a5568; border-bottom: none; }
        .message-content { padding: 15px; background-color: #f1f5f9; border-radius: 6px; color: #2d3748; line-height: 1.6; white-space: pre-wrap; font-size: 15px; border-bottom: none; }
        .footer { text-align: center; color: #718096; font-size: 12px; margin-top: 20px; }
        
        @media only screen and (max-width: 600px) {
            .container { border-radius: 0; border: none; }
            .content { padding: 20px 15px; }
            .details-box { padding: 15px; }
            td { display: block; width: 100%; box-sizing: border-box; padding: 8px 0; border-bottom: none; }
            .label { padding-bottom: 2px; border-bottom: none; }
            .value { padding-bottom: 12px; border-bottom: 1px solid #edf2f7; }
            .message-label { padding-top: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Enquiry Received</h2>
        </div>
        <div class="content">
            <p class="intro">You have received a new enquiry from the C-Advertisements website.</p>
            
            <div class="details-box">
                <table>
                    <tr>
                        <td class="label">Name:</td>
                        <td class="value">${name}</td>
                    </tr>
                    <tr>
                        <td class="label">Email:</td>
                        <td class="value"><a href="mailto:${email}" style="color: #800180; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                        <td class="label">Phone:</td>
                        <td class="value">${phone ? phone : 'Not provided'}</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="message-label">Message:</td>
                    </tr>
                    <tr>
                        <td colspan="2" class="message-content">${message}</td>
                    </tr>
                </table>
            </div>
            <p class="footer">Sent securely via Resend API</p>
        </div>
    </div>
</body>
</html>
        `;

        const { data, error } = await resend.emails.send({
            from: 'CAds <onboarding@resend.dev>', // Resend sandbox default from or custom domain
            to: targetEmail,
            reply_to: email, // Add reply_to so the client can reply directly to the customer
            subject: `New Message from User "${name}" for cadvertisements`,
            html: htmlBody
        });

        if (error) {
            console.error(`Resend API Error:`, error);
            return res.status(500).json({ success: false, error: 'Failed to send email. Please try again later.' });
        }

        return res.status(200).json({ success: true, message: 'Your message has been sent successfully!' });

    } catch (err) {
        console.error(`Server Error:`, err);
        return res.status(500).json({ success: false, error: 'An unexpected error occurred.' });
    }
};
