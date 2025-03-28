import transporter from "../config/emailConfig.js";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (req, res) => {
    const { to, subject, nombre } = req.body; // Asegúrate de recibir 'nombre' en el body

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: 'emailTemplate', // Nombre de la plantilla sin extensión (views/emails/email.hbs)
            context: { to, subject, nombre } // Pasar variables a la plantilla
        });

        return res.json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export async function sendEmailWelcome(to){
    let subject = "Welcome";
    let username = to;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            template: 'welcome', // Nombre de la plantilla sin extensión (views/emails/Welcome.hbs)
            context: { username } // Pasar variables a la plantilla
        });

    } catch (error) {
        console.log(error);
    }
};
