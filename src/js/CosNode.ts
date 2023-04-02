import { formatFloat } from "./utils";

export class CosNode {
  input: any;
  f: number;
  phase: number;

  constructor(input_: any, f: number, phase: number) {
    console.log(input_);
    this.input = input_;
    this.f = f;
    this.phase = phase;
  }

  generateGLSL() {
    return `cos(${this.input.generateGLSL()} * ${formatFloat(this.f)} + ${formatFloat(this.phase)})`;
  }
}