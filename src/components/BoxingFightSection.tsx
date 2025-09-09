'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as THREE from "three";
import styles from './BoxingFightSection.module.css';

type UniformType = {
  time: { type: string; value: number };
  resolution: { type: string; value: THREE.Vector2 };
};

export function ShaderAnimation({ isVisible }: { isVisible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: UniformType
    animationId: number
  } | null>(null)
  const isVisibleRef = useRef(isVisible)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Vertex shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time*0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
          }
        }
        
        gl_FragColor = vec4(color[0],color[1],color[2],1.0);
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms: UniformType = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    container.appendChild(renderer.domElement)

    // Handle window resize
    const onWindowResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    // Initial resize
    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    // Store scene references for cleanup
    sceneRef.current = {
      camera,
      scene,
      renderer,
      uniforms,
      animationId: 0,
    }

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onWindowResize)

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }

        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  useEffect(() => {
    if (!sceneRef.current) return

    const { uniforms, renderer, scene, camera } = sceneRef.current

    if (isVisible) {
      uniforms.time.value = 0 // Reset time when starting animation
      const animate = () => {
        if (!isVisibleRef.current) return
        uniforms.time.value += 0.05
        renderer.render(scene, camera)
        sceneRef.current!.animationId = requestAnimationFrame(animate)
      }
      animate()
    } else {
      cancelAnimationFrame(sceneRef.current.animationId)
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className={`${styles.shaderBackground} w-full h-full`}
    />
  )
}

const BoxingFightSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        // Use requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            const isInView = entry.isIntersecting && entry.intersectionRatio > 0.2; // Reduced threshold
            if (isInView !== isVisible) { // Only update if state actually changed
              setIsVisible(isInView);
            }
          });
        });
      },
      {
        threshold: [0, 0.2, 0.5, 1], // Fewer thresholds for better performance
        rootMargin: '-10% 0px -10% 0px' // Smaller margin for earlier detection
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]); // Include isVisible to prevent unnecessary re-renders // Empty dependency array to prevent re-creation

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.boxingFightSection} ${styles.fullHeight} ${isVisible ? styles.animate : ''}`}
    >
      {/* Background overlay number */}
      <ShaderAnimation isVisible={isVisible} />
      
      {/* Main content container */}
      <div className={styles.contentContainer}>
        {/* Left side - Text content */}
        <div className={styles.textBlock}>
          <h1 className={styles.mainHeading}><span>King of the ring</span><span>fight</span></h1>
          <a href="#" className={styles.viewCaseLink}>View Case</a>
        </div>

        {/* Right side - Image */}
        <div className={styles.imageContainer}>
          <Image 
            src="/boxer-image.jpg" 
            alt="Boxing fighter in action" 
            width={500}
            height={350}
            className={styles.boxerImage}
            priority
          />
        </div>
      </div>

      {/* Bottom left slider indicator */}
      <div className={styles.sliderIndicator}>
        <div className={styles.indicatorLine + ' ' + styles.active}></div>
        <div className={styles.indicatorLine}></div>
        <div className={styles.indicatorLine}></div>
      </div>

      {/* Bottom right social links */}
      <div className={styles.socialLinks}>
        <a href="#" className={styles.socialLink}>facebook</a>
        <a href="#" className={styles.socialLink}>dribbble</a>
        <a href="#" className={styles.socialLink}>instagram</a>
      </div>

      {/* Diagonal shadow overlay */}
      <div className={styles.diagonalShadow}></div>
    </section>
  );
};

export default BoxingFightSection;
