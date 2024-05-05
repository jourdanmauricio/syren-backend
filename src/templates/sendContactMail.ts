import { transporter } from '../config/mailer';
import { Contact } from '../entities/Contact.entity';

async function sendContactMail(message: Contact) {
  const styles = `
       <style>
         body {
           display: flex;
           justify-content: center;
           align-items: center;
           padding: 20px;
         }
         h2, h3 {
           text-align: center;
           color: #EF76FF;
         }
       </style>`;

  let html = `<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Mensaje de contacto</title>`;

  html += styles;
  html += `
     </head>
      <body>
        <h2>M3-Laser Appointments -  ¡Gracias por tu comentario en Syren!</h2>

       <p>Hola ${message.name}, </p> 
       <p>En nombre de todo el equipo de Syren, queremos agradecerte por tomarte el tiempo para dejar un comentario en nuestra página web. Tu opinión es muy importante para nosotros y nos ayuda a mejorar continuamente la experiencia de nuestros usuarios.</p>

       <p>Tus palabras nos motivan a seguir trabajando duro para ofrecerte el mejor servicio posible. En breve nos pondremos en contacto.</p>

       <p>Atentamente,</p>
       <p>El equipo de M3 - Laser Appointments</p>

       <p>PD: No dude en seguirnos en nuestras redes sociales para estar al día de las últimas noticias y novedades:</p>

       <p>[Enlace a Facebook]</p>
       <p>[Enlace a Instagram]</p>
       <p>[Enlace a Twitter]</p>
       <p>[Teléfono de contacto]</p>
       <p>[Dirección de correo electrónico]</p>
      </body>
     </html>
     `;

  const info = await transporter.sendMail({
    from: '"M3 - Laser Appointments" <jourdanmauricio@gmail.com>', // sender address
    to: message.email, // list of receivers
    subject: '¡Gracias por tu comentario en Syren!', // Subject line
    html,
  });

  console.log('Message sent: %s', info.messageId);
  return info.messageId;
}

export default sendContactMail;
