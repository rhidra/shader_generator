import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { getDataTypeDimension } from "../utils";
import { Node } from "./Node";

export class StepNode extends Node {
  edge0: Node;
  edge1: Node;
  x: Node;

  constructor(edge0: Node, edge1: Node, x: Node) {
    super();
    this.edge0 = edge0;
    this.edge1 = edge1;
    this.x = x;
  }

  generateGLSL() {
    return `step(${this.edge0.generateGLSL()}, ${this.edge1.generateGLSL()}, ${this.x.generateGLSL()})`;
  }

  checkOutputType(): DataType {
    const t1 = this.edge0.checkOutputType();
    const t2 = this.edge1.checkOutputType();
    const t3 = this.x.checkOutputType();
    
    if (t1 === t2 && t2 === t3 && t1 !== DataType.Bool) {
      return t1;
    }
    
    if (t1 === DataType.Double && t2 === DataType.Double && getDataTypeDimension(t3) > 1) {
      return t3;
    }

    throw new InvalidTypeError(`Invalid type for smoothstep node: ${t1}, ${t2}, ${t3}`);
  }
}