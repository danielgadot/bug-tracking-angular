import { Component, OnInit, Input } from '@angular/core';
import User from '../models/user';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardService} from '../services/board/board.service';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() user: User;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string>) {
    if (event.previousContainer === event.container) {
      if (event.previousIndex === event.currentIndex) {
        return;
      }
      moveItemInArray(this.user.lists[event.container.data as any], event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(this.user.lists[event.previousContainer.data as any],
        this.user.lists[event.container.data as any],
        event.previousIndex,
        event.currentIndex);
    }
    this.boardService.updateLists();
  }

  addList() {
    this.boardService.addList();
  }
}
