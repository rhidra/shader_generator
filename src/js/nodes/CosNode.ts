import { Node } from "./Node";

export class CosNode extends Node {
  input: Node;
  f: Node;
  phase: Node;

  constructor(input: Node, f: Node, phase: Node) {
    super();
    this.input = input;
    this.f = f;
    this.phase = phase;
  }

  generateGLSL() {
    return `cos(${this.input.generateGLSL()} * ${this.f.generateGLSL()} + ${this.phase.generateGLSL()})`;
  }
}