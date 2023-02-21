import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color' : 'white',
      })),
      state('correct', style({
        'color': 'green',
        transform: 'scale(1.1)'
      })),
      state('wrong', style({
        'background-color': '#E15D44',
        'color': 'red',
        transform: 'scale(1.1)'
      })),
      transition('normal => correct', animate(500)),
      transition('normal => wrong', animate(500))
    ])
  ]
})
export class OptionComponent implements OnInit {
  @Input() data: { content: string; ans: string; } | undefined
  @Output() updateIndex = new EventEmitter<void>()
  state: string = 'normal'
  status: string = 'not'

  constructor(private dataService: DataService, private router: Router) { }

  checkAnswer(option: any){
    this.dataService.disable = true
    console.log("service "+this.dataService.idx+" "+this.dataService.disable)
    if(option === this.data?.ans) {
      this.state = 'correct'
      // this.status = 'correct'
      this.dataService.score += 1
      console.log('coorect')
    }
    else{
      this.state = 'wrong'
      // this.status = 'wrong'
    }
    this.playSound()

    console.log("service "+this.dataService.idx+" "+this.dataService.disable)

    setTimeout(()=> {
      this.updateIndex.emit()
      this.state = 'normal'
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
}
}
