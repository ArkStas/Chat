import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Message, MessageText, MessageType, User} from "src/app/shared/model";
import {DataService} from "../../services/data.service";
import {filter, from, last, switchMap, timer,} from "rxjs";

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  @Input() user: User;
  messageText: MessageText;

  @HostListener('click', ['$event'])
  onClick(e) {
    this.dataService.contact$.next(this.user);
    this.dataService.updateMessagesFromStore();
  }

  constructor(private dataService: DataService) {
    window.addEventListener('storage', () => {
      this.updateMessageTextFromStore();
    })
  }

  ngOnInit(): void {
    this.updateMessageTextFromStore();
  }

  updateMessageTextFromStore() {
    const curUser: User = this.dataService.user$.getValue();
    const curContact: User = this.user;
    const messageList: Message[] = this.dataService.getMessagesFromStore(curUser, curContact);

    if (messageList.length > 0) {
      const source = from(messageList);
      const messageList$ = source.pipe(
        switchMap(() => source),
        filter(message => message.type === MessageType.in),
        last()
      );
      messageList$.subscribe(val => this.messageText = val.messageText);
    }
  }

}
