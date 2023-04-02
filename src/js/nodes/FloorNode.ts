import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class FloorNode extends Node {
  v: Node;

  constructor(v: Node) {
    super();
    this.v = v;
  }

  generateGLSL() {
    return `floor(${this.v.generateGLSL()})`;
  }
  
  checkOutputType(): DataType {
    const t = this.v.checkOutputType();

    switch (t) {
      case DataType.Bool:
        throw new InvalidTypeError(`Cannot compute floor of ${t}`);
      default:
        return t;
    }
  }
}