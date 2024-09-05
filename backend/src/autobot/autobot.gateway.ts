import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  // cors: {
  //   origin: '*',
  // },
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AutobotGateway {
  @WebSocketServer() server: Server;

  private autobotCount = 0;

  updateAutobotCount(count: number) {
    this.autobotCount = count;
    this.server.emit('autobotCountUpdated', this.autobotCount);
  }
}
