import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { websocketConfig } from '@app/common';

@WebSocketGateway(websocketConfig)
export class AppGateway implements OnGatewayConnection {
  async handleConnection(socket: Socket) {}
  private disconnect() {}
}
