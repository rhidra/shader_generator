import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class VectorDecomposeNode extends Node {
  v: Node;
  i: Node;

  constructor(vector: Node, index: Node) {
    super();
    this.v = vector;
    this.i = index;
  }

  generateGLSL() {
    return `(${this.v.generateGLSL()})[${this.i.generateGLSL()}]`;
  }

  checkOutputType(): DataType {
    const tv = this.v.checkOutputType();
    if (tv !== DataType.Vec2 && tv !== DataType.Vec3 && tv !== DataType.Vec4) {
      throw new InvalidTypeError(`Invalid type for vector indexing, expected vector: ${tv}`);
    }
    
    const ti = this.i.checkOutputType();
    if (ti !== DataType.Int) {
      throw new InvalidTypeError(`Invalid type for vector indexing, expected integer: ${ti}`);
    }

    return DataType.Double;
  }
}