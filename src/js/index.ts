import * as twgl from 'twgl.js';
import { Graph } from './Graph';
const vert = require('../shaders/shader.vert');

export function main() {
  const graph = new Graph();
  const gl = (document.getElementById("c") as HTMLCanvasElement).getContext("webgl");
  const programInfo = twgl.createProgramInfo(gl, [vert.sourceCode, graph.generateGLSL()]);

 
  const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  };

  const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
 
  function render(time: number) {
    twgl.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
 
    const uniforms = {
      [graph.uniforms.time.variableName]: time * 0.001,
      [graph.uniforms.resolution.variableName]: [gl.canvas.width, gl.canvas.height],
    };
 
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
 
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}