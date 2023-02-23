import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color' : '#6B5B95',
      })),
      state('correct', style({
        'color': 'white',
        'border-radius': '200px',
        transform: 'scale(1.1)'
      })),
      state('wrong', style({
        'background-color': '#E15D44',
        'color': 'white',
        transform: 'scale(1.1)'
      })),
      transition('normal => correct', animate(500)),
      transition('normal => wrong', animate(500))
    ])
  ]
})
export class OptionComponent implements OnInit, AfterViewInit {
  @Input() data: { content: string; ans: string; } | undefined
  @Output() updateIndex = new EventEmitter<void>()
  state: string = 'normal'

  @ViewChild('optionSel') square: ElementRef | undefined
  anim: Animation | undefined
  anim2: Animation | undefined
  anim3: Animation | undefined

  constructor(private dataService: DataService, private router: Router, private animationCtrl: AnimationController) { }

  checkAnswer(option: any){
    this.dataService.disable = true
    if(option == this.data?.ans) {
      this.dataService.score += 1
      console.log("correct "+this.dataService.idx+" "+this.dataService.score)
      this.state = 'correct'
      this.anim?.play()
    }
    else{
      this.state = 'wrong'
      this.anim2?.play()
    }
    this.playSound()
    var timeLeft = this.dataService.timeLeft
    console.log("Out", this.dataService.timeLeft)
    setTimeout(()=> {
      if(timeLeft>0){
        this.updateIndex.emit()
        console.log(timeLeft)
      }
      this.state = 'normal'
      this.anim?.stop()
      this.anim2?.stop()
     }, 2000)
  }

delay(){
  setTimeout(() => {
    console.log('delay')
  }, 5000);
}

playSound(){
    let audio = new Audio();
    if(this.state === 'correct')
      audio.src = "../../../assets/correct-6033.mp3"
    else
      audio.src = "../../../assets/wronganswer-37702.mp3"
    audio.load();
    audio.play();
  }
ngOnInit(): void {
  this.anim = undefined
  this.anim2 = undefined
}

ngAfterViewInit(): void {
  this.anim = this.animationCtrl.create('myanim')
    this.anim
    .addElement(this.square?.nativeElement)
    .duration(1000)
    .easing('ease-out')
    // .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2')
    .keyframes([
      { offset: 0, background: '#6B5B95' },
      { offset: 1, background: '#88B04B' }
    ]);

    this.anim2 = this.animationCtrl.create('myanim')
    this.anim2
    .addElement(this.square?.nativeElement)
    .duration(1000)
    .easing('ease-out')
    // .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2')
    .keyframes([
      { offset: 0, background: '#6B5B95' },
      { offset: 1, background: '#DD4124' }
    ]);

}


}
