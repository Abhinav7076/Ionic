import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Quiz } from './quiz.model';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy, AfterViewInit {

  qData: Quiz[] = [
    new Quiz('Europa is the moon of which planet ?','Jupiter','Saturn','Mars','Uranus','Jupiter'),
    new Quiz('Zagreb is the capital of which country ?','Slovenia','Croatia','Greece','Hungary','Croatia'),
    new Quiz('Phobos is the moon of which planet ?','Jupiter','Saturn','Mars','Uranus','Mars'),
  ]
  state: string = 'normal'
  interval: string | number | NodeJS.Timeout | undefined

  @ViewChild('card') card: ElementRef | undefined
  anim: Animation | undefined
  isPlaying: boolean = false

  constructor(protected dataService: DataService, private router: Router, private animationCtrl: AnimationController) {}

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
      this.anim?.play()
      this.state='normal'
      this.dataService.resetTime()
      this.dataService.disable = false

      setTimeout(() => {
        this.anim?.stop()
      }, 1000);
  }


  buttonPlay(){
    // if(this.isPlaying)
    //   this.anim?.pause()
    // else
      this.anim?.play()

    this.isPlaying = !this.isPlaying
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    // this.startTimer()
    this.dataService.reset()
  }

  ngAfterViewInit(): void {
    this.anim = this.animationCtrl.create('myanim')
    this.anim
    .addElement(this.card?.nativeElement)
    .duration(1000)
    .keyframes([
      { offset: 0, transform: 'scale(1)', opacity: '1' },
      { offset: 0.5, transform: 'scale(0.1)', opacity: '0.1' },
      { offset: 1, transform: 'scale(1)', opacity: '1' }
    ]);

  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }


}
