import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MasterService } from 'src/app/services/master.service';
import { domainlURL } from 'src/app/utils/config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  ticketsArray: any[] = [];
  selectedProjectData: any ;
  status: string[]= ['To Do','In Progress','Done'];

  constructor(private http: HttpClient, private master: MasterService) {
    this.master.onProjectChange.subscribe((res: any) => {
      this.getProjectTickets(res.projectId);
      this.selectedProjectData = res;
    });
    this.master.onTicketCreate.subscribe((res: any) => {
      this.getProjectTickets(this.selectedProjectData.projectId)
    });
  }

  getProjectTickets(id: number) {
    this.http.get(domainlURL + `GetTicketsByProjectId?projectid=${id}`)
      .subscribe((res: any) => {
        this.ticketsArray = res.data;
      }
    );
  }

  filterTicket(status: string) {
    return this.ticketsArray.filter(m => m.status == status);
  }
}
