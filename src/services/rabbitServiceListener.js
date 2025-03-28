import amqp from 'amqplib';
import dotenv from 'dotenv';
import { sendEmailWelcome } from '../controller/emailController.js';

dotenv.config();

const {
  RABBITMQ_USER,
  RABBITMQ_PASS,
  RABBITMQ_HOST,
  RABBITMQ_VHOST
} = process.env;

const RABBITMQ_URL = `amqps://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}/${RABBITMQ_VHOST}`;

export async function userEvents() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();

    const exchange = 'user_event';
    const queue = 'user_created_queue';
    const routingKey = 'user.created';

    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    console.log(`✅ Esperando mensajes en ${queue}`);
    let response = {};

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        response = JSON.parse(msg.content.toString());
        console.log(response);

        //Enviar correo
        sendEmailWelcome(response.username);

        channel.ack(msg);
      }
    }, { noAck: false });

    connection.on('close', () => {
      console.error('❌ Conexión cerrada, intentando reconectar en 5 segundos');
      setTimeout(userEvents, 5000);
    });

  } catch (error) {
    console.error('❌ Error al conectar con RabbitMQ:', error.message);
    console.error('Intentando reconectar en 5 segundos');
    setTimeout(userEvents, 5000);
  }
}
