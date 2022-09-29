import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactsListComponent} from "./chat-view/contacts-list/contacts-list.component";
import {CustomInputComponent} from "./chat-view/custom-input/custom-input.component";
import {ChatViewComponent} from "./chat-view/chat-view.component";
import {ContactViewComponent} from "./chat-view/contact-view/contact-view.component";
import {UserComponent} from "./chat-view/user/user.component";
import {MessagelistComponent} from './chat-view/messagelist/messagelist.component';
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {OnHoverDirective} from './chat-view/contact-view/on-hover.directive';
import {TextFieldModule} from "@angular/cdk/text-field";
import { MessageViewComponent } from './chat-view/message-view/message-view.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ChatViewComponent,
    UserComponent,
    ContactsListComponent,
    ContactViewComponent,
    CustomInputComponent,
    MessagelistComponent,
    OnHoverDirective,
    MessageViewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    TextFieldModule,
    FormsModule
  ],
  exports: [ChatViewComponent]
})
export class ChatModule {
}
