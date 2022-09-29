import {Component, Input, OnInit} from '@angular/core';
import {Message} from "src/app/shared/model";

@Component({
  selector: 'app-messagelist',
  templateUrl: './messagelist.component.html',
  styleUrls: ['./messagelist.component.scss']
})
export class MessagelistComponent implements OnInit {

  @Input() messages: Message[];

  constructor() { }

  ngOnInit(): void {
  }

}
