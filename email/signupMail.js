const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hassanafnan09@gmail.com',
        pass: 'mqqz refd vdqh ibbd'
    }
});

const mailOptions = {
    from: 'hassanafnan09@gmail.com',
    to: 'i221094@nu.edu.pk',
    subject: 'Welcome to [Your Website Name] Community!',
    html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <p>Dear [Name],</p>
            <p>I am thrilled to welcome you to the [Your Website Name] community! Thank you for signing up and joining our platform. We're excited to have you on board.</p>
            <p>At [Your Website Name], our mission is [Briefly explain your mission or purpose]. We believe in [State your core values or beliefs]. With your participation, we're looking forward to creating a vibrant and supportive community where [Describe what users can expect from being part of your platform].</p>
            <p>As a member of our community, you'll have access to a range of features, including:</p>
            <ol>
                <li>[Feature 1]</li>
                <li>[Feature 2]</li>
                <li>[Feature 3]</li>
            </ol>
            <p>We encourage you to explore the platform, engage with other members, and make the most out of your experience. If you have any questions, feedback, or suggestions, please don't hesitate to reach out to us at [Your Contact Information].</p>
            <p>Additionally, stay tuned for updates, events, and exciting announcements. We're constantly working on enhancing the user experience and bringing new opportunities to our community members.</p>
            <p>Once again, welcome to [Your Website Name]! We're thrilled to have you as part of our community and look forward to connecting with you further.</p>
            <p>Best regards,</p>
            <p>[Your Name]<br>[Your Position/Title]<br>[Your Website Name]<br>[Your Contact Information]</p>
        </body>
        </html>
    `
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
