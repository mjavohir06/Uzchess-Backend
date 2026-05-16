import { Module } from '@nestjs/common';
import { ChatGateway } from '@/features/chat/controllers/chat-gateway';

@Module({ providers: [ChatGateway] })
export class ChatModule {
}