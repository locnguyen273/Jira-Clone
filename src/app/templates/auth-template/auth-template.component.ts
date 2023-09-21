import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-template',
  templateUrl: './auth-template.component.html',
  styleUrls: ['./auth-template.component.css']
})
export class AuthTemplateComponent implements OnInit {
  locationPath: boolean = true;
  constructor(private router: Router) {
    if(this.router.url === "/login") {
      this.locationPath = true;
    } else {
      this.locationPath = false;
    }
  }

  ngOnInit(): void {
    if(this.router.url === "/login") {
      this.locationPath = true;
    } else {
      this.locationPath = false;
    }
  }
  ngAfterViewChecked() {
    if(this.router.url === "/login") {
      this.locationPath = true;
    } else {
      this.locationPath = false;
    }
  }
}
