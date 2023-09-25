import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AllValidationErrors } from 'src/app/interfaces/validation';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  hide = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userId: new FormControl(0),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('full name'),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    let loginObj = {
      userId: 0,
      emailId: this.loginForm.controls['emailId'].value,
      fullName: 'string',
      password: this.loginForm.controls['password'].value,
    };
    this.http
      .post(domainlURL + 'Login', loginObj)
      .subscribe((res: any) => {
        if (res.data) {
          localStorage.setItem('JiraLoginDetail', JSON.stringify(res.data));
          this.router.navigateByUrl('/board');
          this.toast.success(res.message, "Success");
        } else {
          this.toast.error(res.message, "Oops!")
        }
      });
  }
}
