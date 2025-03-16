const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const { subject, message } = JSON.parse(event.body);

    // Create a transporter with your email service
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or another service like 'Yahoo', 'Outlook'
      auth: {
        user: "your-email@example.com", // Replace with your email
        pass: "your-email-password-or-app-password", // Use an app-specific password for security
      },
    });

    // Email details
    const mailOptions = {
      from: "your-email@example.com",
      to: "recipient@example.com",
      subject: subject,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send email." }),
    };
  }
};
