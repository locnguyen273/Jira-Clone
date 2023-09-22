import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  NonNullableFormBuilder,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomvalidationService } from "src/app/services/customvalidation.service";
import { domainlURL } from "src/app/utils/config";

@Component({
  selector: "app-reactive-form",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  hide = true;
  protected registerForm!: FormGroup;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly customValidator: CustomvalidationService,
    private toast: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        userId: new FormControl(0),
        emailId: new FormControl("", [Validators.required, Validators.email]),
        fullName: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        confirmPassword: new FormControl("", Validators.required),
      },
      {
        validators: [
          this.customValidator.matchPassword("password", "confirmPassword"),
        ],
      }
    );
  }

  protected onSubmit(): void {
    let newObj = { 
      userId: this.registerForm.controls['userId'].value, 
      emailId: this.registerForm.controls['emailId'].value, 
      fullName: this.registerForm.controls['fullName'].value, 
      password: this.registerForm.controls['password'].value, 
    };
    this.http.post(domainlURL + "CreateUser", newObj).subscribe((res: any) => {
      if(res.result) {
        this.toast.success(res.message, "Success");
        this.router.navigate(['login']);
      } else {
        this.toast.error("Some thing went wrong", "Oops!")
      }
    });
  }
}