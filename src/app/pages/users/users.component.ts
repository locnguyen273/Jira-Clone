import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: any[] = [];
  userObj: any = {
    "userId": 0,
    "emailId": "string",
    "fullName": "string",
    "password": "string"
  }
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get(domainlURL + "GetAllUsers")
      .subscribe((res: any) => {
        this.userList = res.data;
      }
    );
  }

  onSave() {
    this.http.post(domainlURL + "CreateUser", this.userObj)
      .subscribe((res: any) => {
        if(res.result) {
          alert(res.message);
          this.getAllUsers();
        } else {
          alert(res.message);
        }
      }
    );
  }
}
