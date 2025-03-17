import Message, { CreateMessageDTO } from '@/entities/message';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  getTopOfHistory = (): Promise<Message[]> =>
    this.messageRepository
      .createQueryBuilder('message')
      .orderBy('message.id', 'DESC')
      .limit(20)
      .getMany();

  addMessage = (message: CreateMessageDTO): Promise<Message> =>
    this.messageRepository.save(message);
}
