import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'add', component: MessageDetailComponent },
  { path: 'edit/:id', component: MessageDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
