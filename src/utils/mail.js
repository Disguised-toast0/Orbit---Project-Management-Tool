import Mailgen from "mailgen"
import nodemailer from "nodemailer"

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "salted",
    product: {
      name: "ProjectHub",
      link: "https://www.ProjectHub.com/",
    },
  })

  const emailbodyHTML = mailGenerator.generate(options.mailgenContent)
  const emailText = mailGenerator.generatePlaintext(options.mailgenContent)

  const MailTransporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  })

  const mail = {
    from: "AlexProjectHub@ethereal@email.com",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailbodyHTML,
  }

  try {
    await MailTransporter.sendMail(mail)
  } catch (error) {
    console.error(
      "Error Occured while sending email, Make sure you have provided your email credentials in env file",
    )
    console.log(error)
  }
}

const emailVerificationMailgenContent = (username, VerificationURL) => {
  return {
    body: {
      name: username,
      intro:
        "Heyy There! Thanks for Registering Your account with ProjectHub, We are very delighted to have you Onboard with us. ",
      action: {
        instructions:
          "Before we get started we need to verify your email, Click Below",
        button: {
          color: "#6f42c1",
          text: "Verify Email",
          link: VerificationURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, We would love to help.",
    },
  }
}

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
  return {
    body: {
      name: username,
      intro: "We got a request to reset your password of your account",
      action: {
        instructions:
          "Please click Down Below to reset the password your Email Account",
        button: {
          color: "#22BC66",
          text: "Reset Password",
          link: passwordResetURL,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we would love to help.",
    },
  }
}

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
}
