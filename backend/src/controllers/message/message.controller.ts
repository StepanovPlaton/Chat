import Message, { CreateMessageDTO } from '@/entities/message';
import MessageService from '@/shared/services/message';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async getTopOfHistory(): Promise<Message[]> {
    return await this.messageService.getTopOfHistory();
  }

  @Post()
  async send(@Body() message: CreateMessageDTO): Promise<Message> {
    return await this.messageService.addMessage(message);
  }
}
