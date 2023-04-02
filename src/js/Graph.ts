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
    this.outR = new AddNode(this.inX, this.inY);
    this.outG = new MultiplyNode(this.inX, new VectorDecomposeNode(new Vector2Node(this.inX, this.inY), new IntegerNode(1)));
    this.outB = new CosNode(this.inTime, new ConstantNode(0.1), new ConstantNode(1));

    this.compile();
  }

  compile() {
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
  }

  generateGLSL() {
    const s = (`
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

      console.log(s);
      return s;
    }

    generateUniforms() {
      return `
        uniform ${this.uniforms.time.type} ${this.uniforms.time.variableName};
        uniform ${this.uniforms.resolution.type} ${this.uniforms.resolution.variableName};
      `;
    }
}