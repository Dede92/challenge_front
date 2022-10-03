import { Component, OnInit } from '@angular/core';
import { Message } from '../message/message';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  searchText: string;

  onDelete(message: Message): void {
    this.delete(message);
  }

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.getMessages();

    this.searchText = `[
      {
          "key": "createdAt",
          "operator": "BETWEEN",
          "field_type": "DATE",
          "value": "2020-01-01 00:00:00",
          "value_to": "2022-10-04 00:00:00"
      }
    ]
    `;
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe((messages) => {
      this.messages = messages;
    });
  }

  onSearch(): void {
    this.messageService
      .searchMessages({
        filters: JSON.parse(this.searchText),
      })
      .subscribe((messages) => {
        this.messages = messages;
      });
  }
  delete(message: Message): void {
    this.messageService
      .deleteMessage(message.id)
      .subscribe(() => this.getMessages());
  }
}
