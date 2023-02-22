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

  @ViewChild('square') square: ElementRef | undefined
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
      this.state='normal'
      this.dataService.resetTime()
      this.dataService.disable = false
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
    .addElement(this.square?.nativeElement)
    .duration(1500)
    .easing('ease-out')
    // .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2')
    .keyframes([
      { offset: 0, background: '#6B5B95' },
      { offset: 1, background: 'green' }
    ]);

  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }


}
