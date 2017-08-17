import { Component, OnInit } from '@angular/core';

export class User {
  name: string;
  username: string
}

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  user: User;
  submitted: boolean = false;

  get diagnostic () {
    return JSON.stringify(this.user);
  }

  processForm() {
    console.log(this.user);
    this.submitted = true;
  }

  constructor() {  }

  ngOnInit() {
    this.user = {
      name: '',
      username: ''
    };
  }

}
