import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  private data: any;
  
  constructor(private authService: AuthService,private router:Router
    ) {}

  handleLogin() {
    this.authService
      .handleLogin(this.user)
      .subscribe(
        ({data})=>{
          const token=data!.createSession.token;
          const id=data!.createSession.user.id;
          console.log(token)
          localStorage.setItem('token',token);
          localStorage.setItem('id',id);
          this.router.navigate(['/Events'])
        }
      );
  }
  ngOnInit(): void {}
}
