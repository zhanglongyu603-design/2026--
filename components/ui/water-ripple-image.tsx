'use client';

import { useEffect, useRef, useState } from 'react';

type WaterRippleImageProps = {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
};

const vertexShaderSource = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = 0.5 * (a_position + 1.0);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_image;
  uniform float u_time;
  uniform float u_ratio;
  uniform float u_image_ratio;
  uniform float u_strength;

  void main() {
    vec2 image_uv = v_uv;

    if (u_ratio > u_image_ratio) {
      image_uv.y = (image_uv.y - 0.5) * u_image_ratio / u_ratio + 0.5;
    } else {
      image_uv.x = (image_uv.x - 0.5) * u_ratio / u_image_ratio + 0.5;
    }

    float t = u_time * 0.00018;
    float wave_x = sin(image_uv.y * 17.0 + t * 1.25 + sin(image_uv.x * 6.0) * 0.7);
    float wave_y = cos(image_uv.x * 13.0 - t * 0.9 + sin(image_uv.y * 7.0) * 0.55);
    float crossing = sin((image_uv.x + image_uv.y) * 20.0 + t * 0.55);

    vec2 displacement = vec2(
      wave_x + crossing * 0.38,
      wave_y + crossing * 0.28
    ) * 0.00145 * u_strength;

    vec4 color = texture2D(u_image, image_uv + displacement);
    float shimmer = (wave_x + wave_y + crossing * 0.4) * 0.0045 * u_strength;
    color.rgb += shimmer;
    gl_FragColor = color;
  }
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create WebGL shader.');

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Unknown WebGL shader error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
  const program = gl.createProgram();
  if (!program) throw new Error('Unable to create WebGL program.');

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? 'Unknown WebGL link error.';
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

export function WaterRippleImage({ src, alt, className = '', strength = 0.58 }: WaterRippleImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: true });
    if (!gl) return;

    let animationFrame = 0;
    let isVisible = true;
    let disposed = false;
    let texture: WebGLTexture | null = null;
    const program = createProgram(gl);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const imageLocation = gl.getUniformLocation(program, 'u_image');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const ratioLocation = gl.getUniformLocation(program, 'u_ratio');
    const imageRatioLocation = gl.getUniformLocation(program, 'u_image_ratio');
    const strengthLocation = gl.getUniformLocation(program, 'u_strength');
    gl.uniform1i(imageLocation, 0);
    gl.uniform1f(strengthLocation, reducedMotion ? 0 : strength);

    const resize = () => {
      const bounds = wrapper.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform1f(ratioLocation, width / height);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    resize();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: '120px' },
    );
    visibilityObserver.observe(wrapper);

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (disposed) return;

      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.uniform1f(imageRatioLocation, image.naturalWidth / image.naturalHeight);
      setIsReady(true);
    };
    image.src = src;

    const render = (time: number) => {
      if (isVisible && texture) {
        gl.uniform1f(timeLocation, reducedMotion ? 0 : time);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      animationFrame = window.requestAnimationFrame(render);
    };
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
    };
  }, [src, strength]);

  return (
    <div ref={wrapperRef} className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
