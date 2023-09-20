import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  projectList: any[] = [];
  userList: any[] = [];
  issueTypes: string[] = ['Ticket', 'Defect', 'RnD Work'];
  status: string[] = ['Todo', 'In Progress', 'Done'];

  ticketObj: any = {
    ticketId: 0,
    createdDate: '2023-08-18T05:58:41.065Z',
    summary: '',
    status: '',
    description: '',
    parentId: 0,
    storyPoint: 0,
    ticketGuid: '',
    assignedTo: 0,
    createdBy: 0,
    projectId: 0,
  };

  constructor(private http: HttpClient, private master: MasterService) {
    const loginData = localStorage.getItem("JiraLoginDetail");
    if(loginData != null) {
      const parserData = JSON.parse(loginData);
      this.ticketObj.createdBy = parserData.userId;
    }
  }

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllUsers();
  }

  setProject(obj:any) {
    this.master.onProjectChange.next(obj);
  }

  getAllProjects() {
    this.http.get(domainlURL + 'GetAllProjects').subscribe((res: any) => {
      this.projectList = res.data;
      this.master.onProjectChange.next( this.projectList[0]);
    });
  }

  getAllUsers() {
    this.http.get(domainlURL + 'GetAllUsers').subscribe((res: any) => {
      this.userList = res.data;
    });
  }

  onTicketCreate() {
    this.http.post(domainlURL + "CreateTicket", this.ticketObj)
      .subscribe((res: any) => {
        if(res.data) {
          alert(res.message);
        } else {
          alert(res.message);
        }
      }
    );
  }
}
