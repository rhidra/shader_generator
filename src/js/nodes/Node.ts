import { DataType } from "../types";

export abstract class Node {
  // Generate GLSL code from inputs nodes
  abstract generateGLSL(): string;

  // For given input types, return the expected output types
  // Input and ouput types must be within possible GLSL types
  // If something is wrong in the graph, must throw InvalidTypeError
  abstract checkOutputType(): DataType;

}