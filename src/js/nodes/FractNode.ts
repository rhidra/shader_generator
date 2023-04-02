import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class FractNode extends Node {
  v: Node;

  constructor(v: Node) {
    super();
    this.v = v;
  }

  generateGLSL() {
    return `fract(${this.v.generateGLSL()})`;
  }
  
  checkOutputType(): DataType {
    const t = this.v.checkOutputType();

    switch (t) {
      case DataType.Bool:
      case DataType.Int:
        throw new InvalidTypeError(`Cannot compute fract of ${t}`);
      default:
        return t;
    }
  }
}