import { domainlURL } from 'src/app/utils/config';
import { DialogModule } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  inputData: any;
  projectList: any[] = [];
  userList: any[] = [];
  issueTypes: string[] = ['Ticket', 'Defect', 'RnD Work'];
  status: string[] = ['Todo', 'In Progress', 'Done'];
  profileUser: UserModel | null = null;
  ticketObj: FormGroup | any;
  // ticketObj: any = {
  //   ticketId: 0,
  //   createdDate: '2023-08-18T05:58:41.065Z',
  //   summary: '',
  //   status: '',
  //   description: '',
  //   parentId: 0,
  //   storyPoint: 0,
  //   ticketGuid: '',
  //   assignedTo: 0,
  //   createdBy: 0,
  //   projectId: 0,
  // };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    const loginData = localStorage.getItem('JiraLoginDetail');
    // if (loginData != null) {
    //   const parserData = JSON.parse(loginData);
    //   this.ticketObj.createdBy = parserData.userId;
    //   this.profileUser = parserData;
    // }
  }
  ngOnInit(): void {
    this.inputData = this.data;
    this.getAllProjects();
    this.getAllUsers();
    this.ticketObj = this.fb.group({
      ticketId: new FormControl(0),
      createdDate:  new FormControl('2023-08-18T05:58:41.065Z'),
      summary:  new FormControl('', [Validators.required]),
      status:  new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      parentId: new FormControl(0),
      storyPoint: new FormControl(0),
      ticketGuid: new FormControl(''),
      assignedTo: new FormControl(0),
      createdBy: new FormControl(0),
      projectId: new FormControl(0, [Validators.required]),
    });
  }

  getAllProjects() {
    this.http.get(domainlURL + 'GetAllProjects').subscribe((res: any) => {
      this.projectList = res.data;
    });
  }
  getAllUsers() {
    this.http.get(domainlURL + 'GetAllUsers').subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  ClosePopup() {
    this.ref.close('Closed using function');
  }

  onTicketCreate() {
    console.log(this.ticketObj.value);
    // this.http.post(domainlURL + "CreateTicket", this.ticketObj)
    //   .subscribe((res: any) => {
    //     if(res.data) {
    //       alert(res.message);
    //     } else {
    //       alert(res.message);
    //     }
    //   }
    // );
  }
}
