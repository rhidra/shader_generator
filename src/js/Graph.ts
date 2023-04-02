import { AddNode } from "./nodes/AddNode";
import { ConstantNode } from "./nodes/ConstantNode";
import { CosNode } from "./nodes/CosNode";
import { InputNode } from "./nodes/InputNode";
import { Node } from "./nodes/Node";

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

  inTime = new InputNode('time');
  inX = new InputNode('uv.x');
  inY = new InputNode('uv.y');

  outR: Node;
  outG: Node;
  outB: Node;

  constructor() {
    this.outR = new AddNode(this.inX, this.inY);
    this.outG = new AddNode(this.inX, this.inY);
    this.outB = new CosNode(this.inTime, new ConstantNode(0.1), new ConstantNode(1));
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