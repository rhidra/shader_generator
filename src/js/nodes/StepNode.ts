import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { getDataTypeDimension } from "../utils";
import { Node } from "./Node";

export class StepNode extends Node {
  edge: Node;
  x: Node;

  constructor(edge: Node, x: Node) {
    super();
    this.edge = edge;
    this.x = x;
  }

  generateGLSL() {
    return `step(${this.edge.generateGLSL()}, ${this.x.generateGLSL()})`;
  }

  checkOutputType(): DataType {
    const t1 = this.edge.checkOutputType();
    const t2 = this.x.checkOutputType();
    
    if (t1 === t2 && t1 !== DataType.Bool) {
      return t1;
    }
    
    if (t1 === DataType.Double && getDataTypeDimension(t2) > 1) {
      return t2;
    }

    throw new InvalidTypeError(`Invalid type for step node: ${t1}, ${t2}`);
  }
}