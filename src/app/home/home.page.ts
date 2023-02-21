import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Quiz } from './quiz.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  qData: Quiz[] = [
    new Quiz('Europa is the moon of which planet ?','Jupiter','Saturn','Mars','Uranus','Jupiter'),
    new Quiz('Zagreb is the capital of which country ?','Slovenia','Croatia','Greece','Hungary','Croatia'),
    new Quiz('Phobos is the moon of which planet ?','Jupiter','Saturn','Mars','Uranus','Mars'),
  ]
  state: string = 'normal'
  interval: string | number | NodeJS.Timeout | undefined

  constructor(protected dataService: DataService, private router: Router) {}

  checkAnswer(option: any){
    console.log(option)
    this.state = 'correct'
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.dataService.timeLeft >= 0) {
        this.dataService.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.dataService.idx += 1
        this.dataService.resetTime()
        if(this.dataService.idx===3)
          this.router.navigate(['/score'])
        this.startTimer()
      }
    },1000)
  }

  updateIndex(){
    if(this.dataService.idx >= 2)
        this.router.navigate(['/score'])
      this.dataService.idx += 1
      this.state='normal'
      this.dataService.resetTime()
      this.dataService.disable = false
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.startTimer()
    this.dataService.reset()
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }


}
