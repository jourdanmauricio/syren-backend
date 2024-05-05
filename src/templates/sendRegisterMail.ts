import { transporter } from '../config/mailer';
import { User } from '../entities/User.entity';

async function sendRegisterMail(user: User) {
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
        <h2>M3-Laser Appointments - Registro exitoso</h2>
        
        <p>Estimado/a ${user.name},</p>
        
        <p>¡Nos complace darle la bienvenida a M3 - Laser Appointments! Su registro en nuestro sitio web se ha realizado correctamente.</p>

        <p>En M3, nos dedicamos a brindar tratamientos láser de la más alta calidad para una amplia gama de necesidades. Nuestro equipo de profesionales altamente calificados está comprometido a ofrecerle una experiencia personalizada y segura.</p>
        
        <h3>Beneficios de registrarse en M3:</h3>
        <ul>
          <li>Acceso a información completa: Explore nuestro sitio web para conocer en detalle los diferentes tratamientos láser que ofrecemos, sus beneficios y precios.</li>
          <li>Reserva de citas online: Reserve su cita de forma fácil y cómoda a través de nuestro sistema online, disponible las 24 horas del día, los 7 días de la semana.</li>
          <li>Ofertas exclusivas: Reciba información sobre nuestras ofertas especiales y promociones personalizadas.</li>
          <li>Atención personalizada: No dude en contactarnos si tiene alguna pregunta o inquietud. Nuestro equipo estará encantado de atenderle.</li>
        </ul>

        <h3>Próximos pasos</h3>

        <ul>
          <li>Programe su consulta: Reserve una consulta gratuita con uno de nuestros especialistas para discutir sus necesidades y objetivos específicos.
          <li>Explore nuestro sitio web: Descubra toda la información que necesita sobre los tratamientos láser y M3. <a href="http://localhost:8080/front">M3 - Laser Appointmens</a></li>
        </ul>

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
    from: '"M3 - Laser Appointments  👻" <jourdanmauricio@gmail.com>', // sender address
    to: user.email, // list of receivers
    subject: 'Registro exitoso', // Subject line
    html,
  });

  console.log('Message sent: %s', info.messageId);
}

export default sendRegisterMail;
