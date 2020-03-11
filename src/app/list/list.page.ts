import { Component, OnInit } from '@angular/core';
import { Logger } from '../shared/service/logger.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  public items$: Promise<[number, number][]>;

  constructor(private logger: Logger) {
  }

  ngOnInit() {
    this.items$ = this.logger.getLogs();
  }
}
