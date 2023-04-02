import { DataType } from "../types";
import { Node } from "./Node";

export class IntegerNode extends Node {
  value: number;

  constructor(value: number) {
    super();
    this.value = Math.floor(value);
  }

  generateGLSL(): string {
    return this.value.toFixed(0);  
  }

  checkOutputType(): DataType {
    return DataType.Int;
  }
}