import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private urlMessages: string = 'http://localhost:8080/api/v1/messages';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getMessageById(id: number): Observable<Message> {
    const url = `${this.urlMessages}/${id}`;
    return this.http.get<Message>(url, this.httpOptions);
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.urlMessages, httpOptions);
  }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.urlMessages, message, this.httpOptions);
  }

  updateMessage(id: number, message: Message): Observable<Message> {
    const url = `${this.urlMessages}/${id}`;
    return this.http.put<Message>(url, message, this.httpOptions);
  }

  deleteMessage(id: number): Observable<Message> {
    const url = `${this.urlMessages}/${id}`;
    return this.http.delete<Message>(url, this.httpOptions);
  }

  searchMessages(searchObject: object): Observable<Message[]> {
    const url = `${this.urlMessages}/search`;
    return this.http.post<Message[]>(url, searchObject, this.httpOptions);
  }
}
