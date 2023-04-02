import { AddNode } from "./AddNode";
import { CosNode } from "./CosNode";

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

  inTime = {generateGLSL: () => 'time'};
  inX = {generateGLSL: () => 'uv.x'};
  inY = {generateGLSL: () => 'uv.y'};

  constructor() {}

  generateGLSL() {
    const outR = new AddNode(this.inX, this.inY);
    const outG = new AddNode(this.inX, this.inY);
    const outB = new CosNode(this.inTime, 0.1, 1);

    const s = (`
      #ifdef GL_ES
      precision mediump float;
      #endif
      ${this.generateUniforms()}
      
      void main()
      {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        gl_FragColor = vec4(${outR.generateGLSL()}, ${outG.generateGLSL()}, ${outB.generateGLSL()}, 1.);
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