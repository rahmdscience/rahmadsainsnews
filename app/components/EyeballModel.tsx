"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type ModelStatus = "loading" | "ready" | "error";

export default function EyeballModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<ModelStatus>("loading");
  const [isWideViewport, setIsWideViewport] = useState(false);

  useEffect(() => {
    const viewportQuery = window.matchMedia("(min-width: 1360px)");
    const updateViewport = () => setIsWideViewport(viewportQuery.matches);

    updateViewport();
    viewportQuery.addEventListener("change", updateViewport);

    return () => viewportQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isWideViewport) return;

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.error("Unable to initialize the 3D model viewer.", error);
      setStatus("error");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 4.5);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight("#ffffff", "#30303a", 2.2));

    const keyLight = new THREE.DirectionalLight("#ffffff", 3);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#b5d7ff", 1.4);
    fillLight.position.set(4, -2, 3);
    scene.add(fillLight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    let model: THREE.Group | null = null;
    let animationFrame = 0;
    let disposed = false;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const animate = (time: number) => {
      if (disposed) return;

      if (model) {
        model.rotation.y = Math.sin(time * 0.00035) * 0.16;
        model.rotation.x = Math.cos(time * 0.00025) * 0.04;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    new GLTFLoader().load(
      "/3d/eyeball-3d/eyeball.glb",
      (gltf) => {
        if (disposed) {
          gltf.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
              object.geometry.dispose();
              const materials = Array.isArray(object.material)
                ? object.material
                : [object.material];
              materials.forEach((material) => {
                Object.values(material).forEach((value) => {
                  if (value instanceof THREE.Texture) value.dispose();
                });
                material.dispose();
              });
            }
          });
          return;
        }

        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        const size = bounds.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z);

        if (!maxDimension) {
          console.error("The exported 3D model contains no visible geometry.");
          setStatus("error");
          return;
        }

        const center = bounds.getCenter(new THREE.Vector3());
        model = new THREE.Group();
        model.add(gltf.scene);
        model.position.sub(center);
        model.scale.setScalar(2.5 / maxDimension);
        scene.add(model);
        setStatus("ready");

        if (reducedMotion.matches) {
          renderer.render(scene, camera);
        } else {
          animationFrame = window.requestAnimationFrame(animate);
        }
      },
      undefined,
      (error) => {
        if (disposed) return;
        console.error("Unable to load the 3D eyeball model.", error);
        setStatus("error");
      }
    );

    resize();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      model?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [isWideViewport]);

  return (
    <>
      <div className="eyeball-stage" ref={containerRef} aria-hidden="true" />
      {status === "error" && (
        <p className="eyeball-error" role="status">
          The 3D model could not be displayed.
        </p>
      )}
    </>
  );
}
