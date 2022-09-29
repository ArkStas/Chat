import {HostListener, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, delay, map, Observable} from "rxjs";
import {DataType, Message, MessageText, MessageType, User} from "src/app/shared/model";
import {RandomUserService} from "./random-user.service";
import {ChucknorrisService} from "./chucknorris.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  readonly user$: BehaviorSubject<User> = new BehaviorSubject<User>({
    name: 'Stas',
    picture: 'https://randomuser.me/api/portraits/lego/2.jpg'
  });

  readonly contact$: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  readonly receivedFromStorageContacts$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  readonly receivedFromStorageMessages$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);

  readonly searchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  readonly filteredContactsByInput$: Observable<User[]>;

  tempData: any;

  constructor(private randomUserService: RandomUserService,
              private chucknorrisService: ChucknorrisService) {

    this.contactsInitialization();

    this.filteredContactsByInput$ = combineLatest([this.searchInput$, this.receivedFromStorageContacts$]).pipe(
      map(([input, contacts]) => {
        if (input === '') {
          return contacts
        } else {
          return contacts.filter((contact: User) => contact.name.toLowerCase().includes(input.toLowerCase()))
        }
      })
    );

    window.addEventListener('storage', (event) => {
      this.updateMessagesFromStore();
    });

  }

  updateMessagesFromStore(){
    this.tempData = this.getMessagesFromStore(this.user$.getValue(), this.contact$.getValue());
    if (this.tempData !== null){
      this.receivedFromStorageMessages$.next(this.tempData);
    } else {
      this.receivedFromStorageMessages$.next([]);
    }
  }

  getMessagesFromStore(user: User, contact: User): any{
    const key: string = user.name.concat('_', contact.name);
    const MessagesFromStore = JSON.parse(this.getData(key, DataType.messages));
    if (MessagesFromStore !== null){
      return MessagesFromStore;
    } else {
      return [];
    }
  }

  saveMessagesToStore(messageInput: MessageText) {
    const message: Message = {
      mailer: this.user$.getValue(),
      receiver: this.contact$.getValue(),
      messageText: messageInput,
      type: MessageType.out
    }

    const key: string = this.user$.getValue().name.concat('_', this.contact$.getValue().name);
    const messageList: Message[] = this.receivedFromStorageMessages$.getValue();
    messageList.push(message);

    this.saveData(key, DataType.messages, messageList);
  }

  saveAnswerToStore(user: User, contact: User) {
    this.chucknorrisService.getAnswer().pipe(
      delay(1500)
    ).subscribe(
      (answer) => {
        const message: Message = {
          mailer: contact,
          receiver:  user,
          messageText: answer,
          type: MessageType.in
        }

        const key: string = user.name.concat('_', contact.name);
        const messageList: Message[] = this.getMessagesFromStore(user, contact);
        messageList.push(message);
        this.saveData(key, DataType.messages, messageList);
        // this.updateMessagesFromStore();
        window.dispatchEvent( new Event('storage'));
      }
    );
  }

  private contactsInitialization() {
    this.tempData = JSON.parse(this.getData(this.user$.getValue().name, DataType.contacts));
    if (this.tempData === null) {
      this.randomUserService.getRandomUser().subscribe(
        (data) => {
          this.saveData(this.user$.getValue().name, DataType.contacts, data)
          this.receivedFromStorageContacts$.next(data);
        });
    } else {
      this.receivedFromStorageContacts$.next(this.tempData);
    }
  }

  private saveData(key: string, dataType: DataType, value: any) {
    const stringifyData = JSON.stringify(value);
    localStorage.setItem(key.concat(': ', dataType), stringifyData);
  }

  private getData(key: string, dataType: DataType): string {
    return localStorage.getItem(key.concat(': ', dataType));
  }

  private removeData(key: string, dataType: DataType) {
    localStorage.removeItem(key.concat(': ', dataType));
  }

}
