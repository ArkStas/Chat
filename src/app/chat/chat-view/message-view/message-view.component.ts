import {Component, Input, OnInit} from '@angular/core';
import {Message} from "src/app/shared/model";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss']
})
export class MessageViewComponent implements OnInit {

  @Input() message: Message;

  constructor(readonly dataService: DataService) {
  }

  ngOnInit(): void {
  }

}
