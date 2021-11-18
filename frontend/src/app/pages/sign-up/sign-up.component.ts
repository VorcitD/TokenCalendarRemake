import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SignUpService } from 'src/app/services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = '';
  validatePassword: boolean = true;

  constructor(private signUpHandler: SignUpService) {}

  handleSignUp() {
    if ((this.user.password == this.confirmPassword)) {
      this.validatePassword = true;
      this.signUpHandler.handleSignUp(this.user).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          throw new Error(error);
        }
      );
    } else {
      this.validatePassword = false;
      console.log(false)
    }
  }

  ngOnInit(): void {}
}
