import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class RandomNode extends Node {
  v: Node;

  constructor(v: Node) {
    super();
    this.v = v;
  }

  generateGLSL() {
    return `fract(sin(dot(${this.v.generateGLSL()}, vec2(12.9898,78.233))) * 43758.5453123)`;
  }

  checkOutputType(): DataType {
    const t = this.v.checkOutputType();

    if (t !== DataType.Vec2) {
      throw new InvalidTypeError(`Invalid random input, expected vector2: ${t}`);
    }

    return DataType.Double;
  }
}