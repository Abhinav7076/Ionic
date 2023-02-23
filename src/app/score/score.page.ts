import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../home/data.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  maxScore: number = 0
  score: number = 0
  constructor(protected dataService: DataService, private activatedRouteSnap: ActivatedRoute) { }

  ngOnInit() {
    this.dataService.reset()
    this.maxScore = history.state['maxScore']
    this.score = history.state['score']
    console.log(history.state['data'], this.dataService.score)
  }

}
