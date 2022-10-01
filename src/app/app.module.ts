import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';

import { MessageService } from './message/message.service';
import { MessageDetailComponent } from './message-detail/message-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  declarations: [AppComponent, MessagesComponent, MessageDetailComponent],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
