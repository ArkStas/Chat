import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {InputType, MessageText} from "src/app/shared/model";
import {DataService} from "../../services/data.service";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {

  @Input() type: InputType;
  txt: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onInputChange(event: any) {
    this.dataService.searchInput$.next(event.target.value)
  }

  onMessageChange(event:any) {
    this.txt = event.target.value;
  }

  onIconClick(event: any){
    const messageText: MessageText = {text: this.txt, date: new Date()}
    this.dataService.saveMessagesToStore(messageText);
    this.txt = '';
    this.dataService.saveAnswerToStore(this.dataService.user$.getValue(), this.dataService.contact$.getValue());
  }

}
