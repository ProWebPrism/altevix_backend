const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const { name, email, company, message } = req.body;
    console.log(name, email, company, message);
    

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service (e.g., Gmail, Outlook)
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password
            },
        });

        // Email options
        const mailOptions = {
            from: email,
            to: 'sidharthan624@gmail.com', // Your recipient email address
            subject: `New Enquiry from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Your enquiry has been sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
};
