import Message from '@/entities/message';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8002)
export class MessageGateway implements OnGatewayConnection {
  private clients: Socket[] = [];

  handleConnection(client: Socket) {
    this.clients.push(client);
  }

  sendMessage = (message: Message) => {
    console.log(message, this.clients.length);
    this.clients.forEach((client) => client.send(JSON.stringify(message)));
  };
}
