import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  loaded: boolean;
  message: Message = {
    id: 1,
    content: 'Text content',
    createdAt: 'Text createdAt',
    updatedAt: 'Text updatedAt',
    deadline: 'Text deadline',
    link: 'Text link',
    icon: 'Text icon',
    tags: 'Text tags',
  };
  messages: any;

  selectedMessage?: Message;
  onSelect(message: Message): void {
    this.selectedMessage = message;
  }

  constructor(private messageService: MessageService) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService
      .getMessages('http://localhost:8080/messages')
      .subscribe((messages) => {
        this.messages = messages;
        this.loaded = true;
      });
  }
}
