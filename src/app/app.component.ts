import { Component } from '@angular/core';
import { ListServiceService } from './services/list-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lists: any[];

  constructor(private listServiceService: ListServiceService) {
    this.lists = this.listServiceService.getLists();
  }
  addList() {
    console.log('add list parent');
    const newListName = prompt(' enter new list name');
    this.lists = this.listServiceService.postNewService(newListName);
  }

}
