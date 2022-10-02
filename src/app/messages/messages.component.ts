import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message/message.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];

  onDelete(message: Message): void {
    this.delete(message);
  }

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  delete(message: Message): void {
    this.messageService
      .deleteMessage(message.id)
      .subscribe(() => this.getMessages());
  }
}
