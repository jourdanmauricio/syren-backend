"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailer_1 = require("../config/mailer");
function sendContactMail(message) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const info = yield mailer_1.transporter.sendMail({
            from: '"M3 - Laser Appointments" <jourdanmauricio@gmail.com>',
            to: message.email,
            subject: '¡Gracias por tu comentario en Syren!',
            html,
        });
        console.log('Message sent: %s', info.messageId);
        return info.messageId;
    });
}
exports.default = sendContactMail;
