import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  constructor(protected dataService: DataService) { }

  ngOnInit() {
    this.dataService.reset()
  }

}
