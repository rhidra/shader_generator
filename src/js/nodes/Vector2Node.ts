import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class Vector2Node extends Node {
  x: Node;
  y: Node;

  constructor(x: Node, y: Node) {
    super();
    this.x = x;
    this.y = y;
  }

  generateGLSL() {
    return `vec2(${this.x.generateGLSL()}, ${this.y.generateGLSL()})`;
  }

  checkOutputType(): DataType {
    const t1 = this.x.checkOutputType();
    const t2 = this.y.checkOutputType();

    if (t1 === DataType.Double) {
      if (t2 === DataType.Double) {
        return DataType.Vec2;
      }
      throw new InvalidTypeError(`Invalid type for vec2 second parameter: ${t2}`);
    }
    throw new InvalidTypeError(`Invalid type for vec2 second parameter: ${t1}`);
  }
}