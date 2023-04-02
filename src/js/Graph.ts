import { AddNode } from "./nodes/AddNode";
import { Vector2Node } from "./nodes/Vector2Node";
import { ConstantNode } from "./nodes/ConstantNode";
import { CosNode } from "./nodes/CosNode";
import { InputNode } from "./nodes/InputNode";
import { Node } from "./nodes/Node";
import { DataType } from "./types";
import { MultiplyNode } from "./nodes/MultiplyNode";
import { InvalidTypeError } from "./errors";
import { VectorDecomposeNode } from "./nodes/VectorDecomposeNode";
import { IntegerNode } from "./nodes/IntegerNode";
import { FloorNode } from "./nodes/FloorNode";
import { FractNode } from "./nodes/FractNode";
import { RandomNode } from "./nodes/RandomNode";
import { Vector3Node } from "./nodes/Vector3Node";

export class Graph {
  uniforms = {
    time: {
      variableName: 'time',
      type: 'float',
    },
    resolution: {
      variableName: 'resolution',
      type: 'vec2',
    },
  };

  inTime = new InputNode('time', DataType.Double);
  inX = new InputNode('uv.x', DataType.Double);
  inY = new InputNode('uv.y', DataType.Double);

  outR: Node;
  outG: Node;
  outB: Node;

  constructor() {
    const uv = new AddNode(new Vector2Node(this.inX, this.inY), this.inTime);
    const uvScaled = new MultiplyNode(new ConstantNode(20), uv);
    const ipos = new FloorNode(uvScaled);
    const fpos = new FractNode(uvScaled);
    const color = new RandomNode(ipos);

    this.outR = color;
    this.outG = color;
    this.outB = new VectorDecomposeNode(fpos, new IntegerNode(1));

    this.compile();
  }

  compile() {
    const t0 = new Date().getTime();

    const tr = this.outR.checkOutputType();
    const tg = this.outG.checkOutputType();
    const tb = this.outB.checkOutputType();

    if (tr !== DataType.Double) {
      throw new InvalidTypeError(`Invalid type for red output: ${tr}`);
    } else if (tg !== DataType.Double) {
      throw new InvalidTypeError(`Invalid type for green output: ${tg}`);
    } else if (tb !== DataType.Double) {
      throw new InvalidTypeError(`Invalid type for blue output: ${tb}`);
    }

    console.log(`Compile time: ${(new Date().getTime() - t0) / 1000} sec`);
  }

  generateGLSL() {
    const t0 = new Date().getTime();
    const shader = (`
      #ifdef GL_ES
      precision mediump float;
      #endif
      ${this.generateUniforms()}
      
      void main()
      {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        gl_FragColor = vec4(${this.outR.generateGLSL()}, ${this.outG.generateGLSL()}, ${this.outB.generateGLSL()}, 1.);
      }
    `);

    console.log(`Generation time: ${(new Date().getTime() - t0) / 1000} sec`);
    console.log(shader);
    return shader;
  }

    generateUniforms() {
      return `
        uniform ${this.uniforms.time.type} ${this.uniforms.time.variableName};
        uniform ${this.uniforms.resolution.type} ${this.uniforms.resolution.variableName};
      `;
    }
}