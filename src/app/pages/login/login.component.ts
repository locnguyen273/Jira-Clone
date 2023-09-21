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
import { AllValidationErrors } from 'src/app/interfaces/validation';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup | any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userId: new FormControl(0),
      emailId: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('full name'),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin() {
    console.log(this.reactiveForm);
    console.log(this.reactiveForm.controls['emailId'].errors.required)
    // console.log(this.errors);
    // this.http
    //   .post(domainlURL + 'Login', this.loginObj)
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     if (res.data) {
    //       localStorage.setItem('JiraLoginDetail', JSON.stringify(res.data));
    //       this.router.navigateByUrl('/board');
    //     } else {
    //       alert(res.message);
    //     }
    //   });
  }
}
