'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import styles from './PremiumBoxesSection.module.css';

// WebGL Program interface with uniforms
interface WebGLProgramWithUniforms {
  resolution: WebGLUniformLocation | null;
  time: WebGLUniformLocation | null;
  move: WebGLUniformLocation | null;
  touch: WebGLUniformLocation | null;
  pointerCount: WebGLUniformLocation | null;
  pointers: WebGLUniformLocation | null;
}

// Default shader source for animated background
const defaultShaderSource = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec2 move;
uniform vec2 touch;
uniform int pointerCount;
uniform vec2 pointers[10];
out vec4 fragColor;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(TWO_PI * (c * t + d));
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    vec2 mouse = touch / resolution.y - 0.5;
    
    float t = time * 0.5;
    
    // Create flowing patterns
    vec2 p = uv * 2.0;
    p += vec2(t * 0.1, t * 0.05);
    
    float n = fbm(p);
    n += fbm(p * 2.0 + t * 0.2) * 0.5;
    n += fbm(p * 4.0 + t * 0.4) * 0.25;
    
    // Mouse interaction
    float mouseDist = length(uv - mouse);
    float mouseEffect = 1.0 / (1.0 + mouseDist * 2.0);
    n += mouseEffect * 0.3;
    
    // Color palette
    vec3 col = palette(n + t * 0.1);
    
    // Add some sparkle
    float sparkle = sin(n * 20.0 + t * 3.0) * 0.5 + 0.5;
    col += sparkle * 0.1;
    
    fragColor = vec4(col, 1.0);
}`;

// Reusable Shader Background Hook
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const pointersRef = useRef<PointerHandler | null>(null);

  // WebGL Renderer class
  class WebGLRenderer {
    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;
    private program: WebGLProgram | null = null;
    private uniforms: WebGLProgramWithUniforms | null = null;
    private vs: WebGLShader | null = null;
    private fs: WebGLShader | null = null;
    private buffer: WebGLBuffer | null = null;
    private scale: number;
    private shaderSource: string;
    private mouseMove: [number, number] = [0, 0];
    private mouseCoords: [number, number] = [0, 0];
    private pointerCoords: number[] = [0, 0];
    private nbrOfPointers = 0;

    private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

    private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

    constructor(canvas: HTMLCanvasElement, scale: number) {
      this.canvas = canvas;
      this.scale = scale;
      this.gl = canvas.getContext('webgl2')!;
      this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
      this.shaderSource = defaultShaderSource;
    }

    updateShader(source: string) {
      this.reset();
      this.shaderSource = source;
      this.setup();
      this.init();
    }

    updateMove(deltas: [number, number]) {
      this.mouseMove = deltas;
    }

    updateMouse(coords: [number, number]) {
      this.mouseCoords = coords;
    }

    updatePointerCoords(coords: number[]) {
      this.pointerCoords = coords;
    }

    updatePointerCount(nbr: number) {
      this.nbrOfPointers = nbr;
    }

    updateScale(scale: number) {
      this.scale = scale;
      this.gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
    }

    compile(shader: WebGLShader, source: string) {
      const gl = this.gl;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        console.error('Shader compilation error:', error);
      }
    }

    test(source: string) {
      let result = null;
      const gl = this.gl;
      const shader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        result = gl.getShaderInfoLog(shader);
      }
      gl.deleteShader(shader);
      return result;
    }

    reset() {
      const gl = this.gl;
      if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
        if (this.vs) {
          gl.detachShader(this.program, this.vs);
          gl.deleteShader(this.fs);
        }
        if (this.fs) {
          gl.detachShader(this.program, this.fs);
          gl.deleteShader(this.fs);
        }
        gl.deleteProgram(this.program);
      }
    }

    setup() {
      const gl = this.gl;
      this.vs = gl.createShader(gl.VERTEX_SHADER)!;
      this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      this.compile(this.vs, this.vertexSrc);
      this.compile(this.fs, this.shaderSource);
      this.program = gl.createProgram()!;
      gl.attachShader(this.program, this.vs);
      gl.attachShader(this.program, this.fs);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(this.program));
      }
    }

    init() {
      const gl = this.gl;
      const program = this.program!;
      
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      this.uniforms = {
        resolution: gl.getUniformLocation(program, 'resolution'),
        time: gl.getUniformLocation(program, 'time'),
        move: gl.getUniformLocation(program, 'move'),
        touch: gl.getUniformLocation(program, 'touch'),
        pointerCount: gl.getUniformLocation(program, 'pointerCount'),
        pointers: gl.getUniformLocation(program, 'pointers'),
      };
    }

    render(now = 0) {
      const gl = this.gl;
      const program = this.program;
      
      if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS) || !this.uniforms) return;

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      
      if (this.uniforms.resolution) {
        gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
      }
      if (this.uniforms.time) {
        gl.uniform1f(this.uniforms.time, now * 1e-3);
      }
      if (this.uniforms.move) {
        gl.uniform2f(this.uniforms.move, this.mouseMove[0], this.mouseMove[1]);
      }
      if (this.uniforms.touch) {
        gl.uniform2f(this.uniforms.touch, this.mouseCoords[0], this.mouseCoords[1]);
      }
      if (this.uniforms.pointerCount) {
        gl.uniform1i(this.uniforms.pointerCount, this.nbrOfPointers);
      }
      if (this.uniforms.pointers) {
        gl.uniform2fv(this.uniforms.pointers, this.pointerCoords);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  }

  // Pointer Handler class
  class PointerHandler {
    private scale: number;
    private active = false;
    private pointers = new Map<number, number[]>();
    private lastCoords = [0, 0];
    private moves = [0, 0];

    constructor(element: HTMLCanvasElement, scale: number) {
      this.scale = scale;
      
      const map = (element: HTMLCanvasElement, scale: number, x: number, y: number) => 
        [x * scale, element.height - y * scale];

      element.addEventListener('pointerdown', (e) => {
        this.active = true;
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
      });

      element.addEventListener('pointerup', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointerleave', (e) => {
        if (this.count === 1) {
          this.lastCoords = this.first;
        }
        this.pointers.delete(e.pointerId);
        this.active = this.pointers.size > 0;
      });

      element.addEventListener('pointermove', (e) => {
        if (!this.active) return;
        this.lastCoords = [e.clientX, e.clientY];
        this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
      });
    }

    getScale() {
      return this.scale;
    }

    updateScale(scale: number) {
      this.scale = scale;
    }

    get count() {
      return this.pointers.size;
    }

    get move(): [number, number] {
      return [this.moves[0], this.moves[1]];
    }

    get coords(): number[] {
      return this.pointers.size > 0 
        ? Array.from(this.pointers.values()).flat() 
        : [0, 0];
    }

    get first(): [number, number] {
      const value = this.pointers.values().next().value;
      return value ? [value[0], value[1]] : [this.lastCoords[0], this.lastCoords[1]];
    }
  }

  const resize = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    if (rendererRef.current) {
      rendererRef.current.updateScale(dpr);
    }
  }, []);

  const loop = useCallback((now: number) => {
    if (!rendererRef.current || !pointersRef.current) return;
    
    rendererRef.current.updateMouse(pointersRef.current.first);
    rendererRef.current.updatePointerCount(pointersRef.current.count);
    rendererRef.current.updatePointerCoords(pointersRef.current.coords);
    rendererRef.current.updateMove(pointersRef.current.move);
    rendererRef.current.render(now);
    animationFrameRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    
    rendererRef.current = new WebGLRenderer(canvas, dpr);
    pointersRef.current = new PointerHandler(canvas, dpr);
    
    rendererRef.current.setup();
    rendererRef.current.init();
    
    resize();
    
    if (rendererRef.current.test(defaultShaderSource) === null) {
      rendererRef.current.updateShader(defaultShaderSource);
    }
    
    loop(0);
    
    window.addEventListener('resize', resize);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.reset();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return canvasRef;
};

const PremiumBoxesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useShaderBackground();

  useEffect(() => {
    const handleScroll = () => {
      // Handle first section (boxes 1 & 2)
      if (sectionRef.current) {
        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        let progress = 0;
        if (sectionTop <= windowHeight * 1.2 && sectionTop >= -rect.height) {
          progress = Math.min(1, Math.max(0, (windowHeight * 1.2 - sectionTop) / (windowHeight * 0.8)));
        }

        const boxes = section.querySelectorAll(`.${styles.premiumBox}`);
        boxes.forEach((box, index) => {
          const element = box as HTMLElement;
          
          if (index === 0) {
            const leftPosition = -100 + (progress * 100);
            element.style.transform = `translateX(${leftPosition}%)`;
          } else {
            const rightPosition = 100 - (progress * 100);
            element.style.transform = `translateX(${rightPosition}%)`;
          }
          
          element.style.opacity = progress.toString();
        });
      }

      // Handle second section (boxes 3 & 4)
      if (secondSectionRef.current) {
        const section = secondSectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        const sectionTop = rect.top;
        let progress = 0;
        if (sectionTop <= windowHeight * 1.2 && sectionTop >= -rect.height) {
          progress = Math.min(1, Math.max(0, (windowHeight * 1.2 - sectionTop) / (windowHeight * 0.8)));
        }

        const boxes = section.querySelectorAll(`.${styles.premiumBox}`);
        boxes.forEach((box, index) => {
          const element = box as HTMLElement;
          
          if (index === 0) {
            // Left box (03): comes from left side
            const leftPosition = -100 + (progress * 100);
            element.style.transform = `translateX(${leftPosition}%)`;
          } else {
            // Right box (04): comes from bottom
            const bottomPosition = 100 - (progress * 100);
            element.style.transform = `translateY(${bottomPosition}%)`;
          }
          
          element.style.opacity = progress.toString();
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className={styles.premiumBoxesSection}>
        <div className={styles.container}>
          <div className={styles.boxesWrapper}>
            
            {/* Left Box - Experience */}
            <div className={styles.premiumBox + ' ' + styles.redBox}>
              <canvas
                ref={canvasRef}
                className={styles.backgroundCanvas}
              />
              <div className={styles.boxNumber}>01</div>
              <div className={`${styles.contentOverlay} ${styles.contentVisible}`}>
                <h3 className={styles.boxHeading}>Experience</h3>
                <ul className={styles.boxList}>
                  <li>Founder, Scable India Pvt Ltd (Dec 2023 – Apr 2025)</li>
                  <li>Full-Stack Dev, Creative i (Jun 2025 – Jul 2025)</li>
                </ul>
                <div className={styles.boxMeta}>Projects: Turftime, Billinall, ECMA Textile Platform</div>
              </div>
            </div>
            
            {/* Right Box - Projects Snapshot */}
            <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>02</div>
              <div className={`${styles.contentOverlay} ${styles.contentLight}`}>
                <h3 className={styles.boxHeading}>Featured AI & Automation</h3>
                <ul className={styles.boxList}>
                  <li>Fashion Matching Agent (Mar–Apr 2025)</li>
                  <li>DisasterLink (Sep–Oct 2024)</li>
                  <li>Dark Pattern Buster (Feb–May 2024)</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      <section ref={secondSectionRef} className={styles.premiumBoxesSection}>
        <div className={styles.container}>
          <div className={styles.boxesWrapper}>
            
            {/* Left Box - Education */}
            <div className={styles.premiumBox + ' ' + styles.blackBox}>
              <div className={styles.boxNumber}>03</div>
              <div className={`${styles.contentOverlay} ${styles.contentLight}`}>
                <h3 className={styles.boxHeading}>Education</h3>
                <div className={styles.boxMeta}>B.E. Computer Science, VCET (Nov 2022 – May 2026)</div>
                <ul className={styles.boxList}>
                  <li>Grand Master (President) – Dept. Club; built club website</li>
                  <li>Student Coordinator – Entrepreneur Development Cell</li>
                  <li>VCET Hackelite2k25 website (solo, 15 hours)</li>
                </ul>
              </div>
            </div>
            
            {/* Right Box - Skills */}
            <div className={styles.premiumBox + ' ' + styles.redBox}>
              <div className={styles.boxNumber}>04</div>
              <div className={`${styles.contentOverlay} ${styles.contentDark}`}>
                <h3 className={styles.boxHeading}>Skills</h3>
                <div className={styles.boxMeta}>Flutter • DRF • Python • Dart • Docker • MySQL</div>
                <div className={`${styles.boxMeta} ${styles.mt6}`}>AI: Ollama • RAG • Agents • Prompt Engineering</div>
                <div className={`${styles.boxMeta} ${styles.mt6}`}>Tools: Git/GitHub • Figma • Canva • Illustrator</div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default PremiumBoxesSection;
