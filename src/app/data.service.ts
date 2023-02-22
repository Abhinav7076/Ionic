import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  idx: number = 0
  score: number = 0
  timeLimit: number = 5
  timeLeft: number = this.timeLimit
  disable: Boolean = false

  reset(){
      this.idx = 0
      this.score = 0
      this.timeLeft = this.timeLimit
      this.disable = false
  }

  resetTime(){
      this.timeLeft = this.timeLimit+2
  }
}
