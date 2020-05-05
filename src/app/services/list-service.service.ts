import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  lists: any[] = [
    {
      title: 'TODO',
      cards: [
        {
          title: 'TODO card example'
        }
      ]
    },
    {
      title: 'Doing',
      cards: [
        {
          title: 'Doing card example'
        }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  postNewService(listName) {
    // return this.http.post(`/addList/`, { listName });
    this.lists.push({
      title: listName,
      cards: [
        {
          title: 'TODO card example'
        }
      ]
    });
    return this.lists;
  }

  getLists() {
    return this.lists;
  }
}
