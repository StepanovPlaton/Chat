import MessageController from '@/controllers/message';
import Message from '@/entities/message';
import MessageGateway from '@/shared/gateways/message';
import MessageService from '@/shared/services/message';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
})
export class MessageModule {}
