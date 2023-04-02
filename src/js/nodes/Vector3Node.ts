import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { Node } from "./Node";

export class Vector3Node extends Node {
  x: Node;
  y: Node;
  z: Node;

  constructor(x: Node, y: Node, z: Node) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }

  generateGLSL() {
    return `vec2(${this.x.generateGLSL()}, ${this.y.generateGLSL()}, ${this.z.generateGLSL()})`;
  }

  checkOutputType(): DataType {
    const t1 = this.x.checkOutputType();
    const t2 = this.y.checkOutputType();
    const t3 = this.z.checkOutputType();

    if (t1 === DataType.Double) {
      if (t2 === DataType.Double) {
        if (t3 === DataType.Double) {
          return DataType.Vec3;
        }
        throw new InvalidTypeError(`Invalid type for vec2 third parameter: ${t3}`);
      }
      throw new InvalidTypeError(`Invalid type for vec2 second parameter: ${t2}`);
    }
    throw new InvalidTypeError(`Invalid type for vec2 second parameter: ${t1}`);
  }
}