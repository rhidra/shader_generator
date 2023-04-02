import { Node } from "./Node";

export class AddNode extends Node {
  x: Node;
  y: Node;

  constructor(x: Node, y: Node) {
    super();
    this.x = x;
    this.y = y;
  }

  generateGLSL() {
    return `${this.x.generateGLSL()} + ${this.y.generateGLSL()}`;
  }
}