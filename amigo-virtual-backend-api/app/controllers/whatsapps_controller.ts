import axios from 'axios';
import type { HttpContext } from '@adonisjs/core/http'


export default class WhatsappsController {
  async receive({ request, response }: HttpContext) {
    try {
      const data = request.body();
      const entry = data['entry'][0];
      const changes = entry['changes'][0];
      const value = changes['value'];
      const messages = value['messages'][0]['text']['body'];
      const number = value['contacts'][0]['wa_id'];

      console.log(`Mensaje: ${messages}`);
      console.log(`Número: ${number}`);

      const bodyAnswer = await this.sendMessage(messages, number);
      return response.send(bodyAnswer);
    } catch (error) {
      console.error(error);
      return response.status(500).send('Error interno del servidor');
    }
  }

  async sendMessage(message: string, number: number) {
    try {
      const body = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: number,
        type: 'text',
        text: {
          body: `Respuesta a tu mensaje, ${message}`,
        },
      };

      const token = process.env.WHATSAPP_API_KEY;
      const url = 'https://graph.facebook.com/v18.0/301011976425692/messages';
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(url, body, config);

      if (response.status === 200) {
        console.log('Mensaje enviado correctamente');
        return 'EVENT_RECEIVED';
      } else {
        console.log('Error al enviar mensaje');
        return 'error';
      }
    } catch (error) {
      console.error('Error al enviar mensaje', error);
      return 'error';
    }
  }
}
