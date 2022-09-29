import {Component, Input, OnInit} from '@angular/core';
import {User} from "src/app/shared/model";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User = {name: '', picture: ''};

  constructor() {
  }

  ngOnInit(): void {
  }

}
