import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class MixNode extends Node {
  a: Node;
  b: Node;
  x: Node;

  constructor(a: Node, b: Node, x: Node) {
    super();
    this.a = a;
    this.b = b;
    this.x = x;
  }

  generateGLSL() {
    return `mix(${this.a.generateGLSL()}, ${this.b.generateGLSL()}, ${this.x.generateGLSL()})`;
  }

  checkOutputType(): DataType {
    const t1 = this.a.checkOutputType();
    const t2 = this.b.checkOutputType();
    
    if (t1 !== t2) {
      throw new InvalidTypeError(`Cannot mix between different data type: ${t1}, ${t2}`);
    }
    
    const t3 = this.x.checkOutputType();
    if (t3 !== DataType.Double) {
      throw new InvalidTypeError(`Invalid type, expected double: ${t3}`);
    }

    return t1;
  }
}