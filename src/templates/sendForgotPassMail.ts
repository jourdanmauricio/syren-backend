import { config } from '../config/envs';
import { transporter } from '../config/mailer';
import { User } from '../entities/User';

async function sendForgotPassMail(user: User, token: string) {
  const link = `${config.frontDomain}/recovery-password?token=${token}`;
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

  let html = `<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Tabla de Datos</title>`;

  html += styles;
  html += `
     </head>
      <body>
        <h2>M3-Laser Appointments - Recuperar contraseña</h2>

       <p>Has solicitado recuperar el password. Si no fuiste tú ignora este email.</p>
       <table width="100%" cellspacing="0" cellpadding="0">
         <tr>
           <td>
             <table cellspacing="0" cellpadding="0">
               <tr>
                 <td style="border-radius: 2px;" bgcolor="#ED2939">
                   <a href=${link} target="_blank" style="padding: 8px 12px; border: 1px solid #ED2939;border-radius: 2px;font-family: Helvetica, Arial, sans-serif;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;display: inline-block;">
                     Recuperar contraseña
                   </a>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
       <p>Si el botón no fuciona puedes copiar y pegar el siguiente ingresa a este link
       en tu navegador para recuperar tu contraseña:</p>
       <br> ${link} <br><br>

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
    to: user.email, // list of receivers
    subject: 'Recuperar contraseña', // Subject line
    html,
  });

  console.log('Message sent: %s', info.messageId);
  return info.messageId;
}

export default sendForgotPassMail;
