import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporter para Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_PASS, // Usa la contraseña de aplicación
    },
});

// Configuración de Handlebars como motor de plantillas
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve('./src/views'), // Ruta correcta a las vistas
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/views'),
    extName: '.hbs',
};

transporter.use('compile', hbs(handlebarOptions));

export default transporter;
