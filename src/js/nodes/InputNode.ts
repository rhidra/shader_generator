import { DataType } from "../types";
import { Node } from "./Node";

export class InputNode extends Node {
  value: string;
  type: DataType;

  constructor(value: string, type: DataType) {
    super();
    this.value = value;
    this.type = type;
  }
  
  generateGLSL(): string {
    return this.value;  
  }

  checkOutputType(): DataType {
    return this.type;
  }
}