import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { UserAuthentificationService } from 'src/app/services/user-authentification.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user;

  constructor(public authService: UserAuthentificationService,private router: Router) { }

  ngOnInit(): void {
  }
  signin(email, password) {
    this.user = new User(1, email, password)
    console.log(email,password)
    this.authService.signin(this.user).subscribe(data=>{
      if(data.length>0){
        Cookies.set("isAuth",true)
        Cookies.set("email",email)
        this.router.navigate(['/']);
      }else{
        alert("Check your username and password")
      }
    })
  }

}
