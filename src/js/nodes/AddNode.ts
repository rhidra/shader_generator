import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
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

  checkOutputType(): DataType {
    const t1 = this.x.checkOutputType();
    const t2 = this.y.checkOutputType();

    if (t1 === t2) {
      return t1;
    } else {
      throw new InvalidTypeError(`Cannot add ${t1} and ${t2}`);
    }
  }
}