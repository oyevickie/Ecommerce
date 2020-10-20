import { DataService } from './../../shared/data.service';
import { RestApiService } from './../../shared/rest-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  btnDisabled = false;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService
  ) { }


  passType: string = 'password';

  changePasswordType(){
  if(this.passType == 'password'){
  this.passType= 'text'
  }else{
  this.passType == 'password'
  this.passType = 'password'
  }
  }



  ngOnInit(): void {
  }

  validate() {
    if(this.email) {
      if(this.password){
        return true; 
      } else {
        this.data.error('Password is not entered')
      }
    } else {
      this.data.error('Email is not entered')
    }
  }
  async Login(){
    this.btnDisabled = true;
    try {
      if(this.validate()) {
        const data = await this.rest.post(
          'http://localhost:3030/api/accounts/login',
          {
            email: this.email,
            password: this.password
          },
        );
        if(data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch(error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false
  }

}
