import { InvalidTypeError } from "../errors";
import { DataType } from "../types";
import { AddNode } from "./AddNode";
import { ConstantNode } from "./ConstantNode";
import { MultiplyNode } from "./MultiplyNode";
import { Node } from "./Node";

export class CosNode extends Node {
  input: Node;
  f: Node;
  phase: Node;

  out: Node; // Result of (x*f+phase)

  constructor(input: Node, f?: Node, phase?: Node) {
    super();
    this.input = input;
    this.f = f ?? new ConstantNode(1);
    this.phase = phase ?? new ConstantNode(0);

    this.out = new AddNode(new MultiplyNode(this.input, this.f), this.phase);
  }

  generateGLSL() {
    return `cos(${this.out.generateGLSL()})`;
  }
  
  checkOutputType(): DataType {
    const t = this.out.checkOutputType();

    switch (t) {
      case DataType.Bool:
        throw new InvalidTypeError(`Cannot compute cos of ${t}`);
      default:
        return t;
    }
  }
}