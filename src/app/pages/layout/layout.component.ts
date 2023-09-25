import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { UserModel } from 'src/app/models/user';
import { MasterService } from 'src/app/services/master.service';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  projectList: any[] = [];
  issueTypes: string[] = ['Ticket', 'Defect', 'RnD Work'];
  status: string[] = ['Todo', 'In Progress', 'Done'];
  profileUser: UserModel | null = null;

  constructor(
    private http: HttpClient, 
    private master: MasterService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
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

  OpenModalPopup() {
    var _popup = this.dialog.open(PopupComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: 'Create Issue',
      }
    });
    _popup.afterClosed().subscribe(item => {
      console.log(item);
    })
  }
}
