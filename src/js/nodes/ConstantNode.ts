import { Node } from "./Node";

export class ConstantNode extends Node {
  value: number;

  constructor(value: number) {
    super();
    this.value = value;
  }

  generateGLSL(): string {
    return this.value.toString().includes('.') ? this.value.toString() : this.value.toFixed(1);  
  }
}