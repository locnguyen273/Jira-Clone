import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: any = {
    userId: 0,
    emailId: '',
    fullName: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http
      .post(domainlURL + 'Login', this.loginObj)
      .subscribe((res: any) => {
        console.log(res);
        if (res.data) {
          localStorage.setItem('JiraLoginDetail', JSON.stringify(res.data));
          this.router.navigateByUrl('/board');
        } else {
          alert(res.message);
        }
      });
  }
}
