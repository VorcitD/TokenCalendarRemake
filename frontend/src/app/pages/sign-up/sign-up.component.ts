import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user:User

  constructor(signUpHandler:SignUpService) { }



  signUpHandler(){

  }

  ngOnInit(): void {
  }




}
