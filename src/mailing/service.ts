import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
async function mailingService(
  subject: string,
  template: string,
  receiver: string,
): Promise<void> {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // send mail with defined transport object
    await transporter.sendMail({
      from: `Twitee ${process.env.email}`, // sender address
      to: receiver, // list of receivers
      subject,
      html: template, // html body
    });
  } catch (error) {
    // TODO: Handle error with sentry
    console.error(error)
  }
}

export default mailingService;
