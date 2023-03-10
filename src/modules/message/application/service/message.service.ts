import { MessageRepository } from "../../infrastructure/message.repository";
import sgMail  from '@sendgrid/mail'
import { MailService } from "@sendgrid/mail/src/mail";
export class MessageService {
  mailingProvider: MailService
  constructor(MessageRepository: MessageRepository) {
    sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))
    this.mailingProvider = sgMail
  }
  async sendMail(subject:string, to:string, template:string){
    const msg = {
      to: to, // Change to your recipient
      from: 'pizzadonremolo@gmail.com', // Change to your verified sender
      subject: subject,
      text: 'hola',
      html: `<strong><h1>Verificá tu cuenta haciendo click </h1><a href="${template}">Acá</a><p>${template}</p></strong>`,
    }
   
    this.mailingProvider
      .send(msg)
      .then(() => {
      console.log('Email sent')
    })
      .catch((error) => {
      console.error(error)
    })
  
   
 return true
}

}


