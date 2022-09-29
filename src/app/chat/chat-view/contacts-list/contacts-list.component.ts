import {Component, Input, OnInit} from '@angular/core';
import {User} from "src/app/shared/model";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

  @Input() contacts: User[];

  constructor() { }

  ngOnInit(): void {

  }

}
