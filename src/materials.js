import * as THREE from "three";

// global environment map

export const environmentMap = new THREE.TextureLoader().load(
  "../assets/textures/env.jpg"
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.encoding = THREE.sRGBEncoding;
environmentMap.flipY = false;

// ui

export const UIMaterial = new THREE.MeshBasicMaterial(
  {
    map : new THREE.TextureLoader().load("../assets/textures/ui.png"),
    transparent: true
  }
);
UIMaterial.map.encoding = THREE.sRGBEncoding;
UIMaterial.map.flipY = false;
