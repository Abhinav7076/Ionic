export class Quiz{
  public ques: string
  public op1: string
  public op2: string
  public op3: string
  public op4: string
  public ans: string

  constructor(ques: string, op1: string, op2: string, op3: string, op4: string, ans: string){
      this.ques = ques
      this.op1 = op1
      this.op2 = op2
      this.op3 = op3
      this.op4 = op4
      this.ans = ans
  }
}
