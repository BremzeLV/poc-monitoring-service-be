import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Device } from '../devices/domain/device';

@WebSocketGateway()
export class WebsocketsService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(WebsocketsService.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    this.logger.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  broadcastDeviceUpdate(device: Device) {
    this.server.emit('deviceUpdated', device);
  }
}
