import {Component, HostListener, OnInit} from '@angular/core';
import {InputType, User} from "src/app/shared/model";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  search: InputType = InputType.search;
  message: InputType = InputType.message;

  constructor(readonly dataService: DataService) {
  }

  ngOnInit(): void {

  }

}
