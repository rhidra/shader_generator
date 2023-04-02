import { Node } from "./Node";

export class InputNode extends Node {
  value: string;

  constructor(value: string) {
    super();
    this.value = value;
  }
  
  generateGLSL(): string {
    return this.value;  
  }
}