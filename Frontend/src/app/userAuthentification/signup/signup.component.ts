import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { UserAuthentificationService } from 'src/app/services/user-authentification.service';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user;
  constructor(public authService: UserAuthentificationService,private router: Router) { }

  ngOnInit(): void {
  }

  signup(email, password, cpassword) {
    if (password == cpassword) {
      this.user = new User(1, email, password)
      this.authService.signup(this.user).subscribe(data => {
        console.log(data);
        Cookies.set("isAuth",true)
        Cookies.set("email",email)
        this.router.navigate(['/']);
      })
    } else {
      alert("err")
    }
  }

}
