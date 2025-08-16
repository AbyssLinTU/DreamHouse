import nodemailer from 'nodemailer'
if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new Error("Не все переменные окружения для почтового сервиса заданы!");
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT), 
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
  });
const mailService = {
    sendActivationMail: async (to:string,link:string) => {
        console.log(process.env.SMTP_USER);
        console.log(process.env.SMTP_PASSWORD);
        transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта",
            text: "",
            html: `
                <div>
                    <h1>Для активации аккаунта перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    }

}
export default mailService