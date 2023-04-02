import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { getDataTypeDimension } from "../utils";
import { Node } from "./Node";

export class MultiplyNode extends Node {
  x: Node;
  y: Node;

  constructor(x: Node, y: Node) {
    super();
    this.x = x;
    this.y = y;
  }

  generateGLSL() {
    return `${this.x.generateGLSL()} * ${this.y.generateGLSL()}`;
  }

  checkOutputType(): DataType {
    const t1 = this.x.checkOutputType();
    const t2 = this.y.checkOutputType();

    // Component wise multiplication
    if (t1 === t2) {
      return t1;
    }

    const d1 = getDataTypeDimension(t1);
    const d2 = getDataTypeDimension(t2);

    // Scalar product
    if (d1 === 1 && d2 > 1) {
      return t2;
    } else if (d2 === 1 && d1 > 1) {
      return t1;
    }

    throw new InvalidTypeError(`Cannot mulitply ${t1} and ${t2}`);
  }
}