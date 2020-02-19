import * as THREE from "three";

// global environment map

export const environmentMap = new THREE.TextureLoader().load("assets/env.jpg");
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.encoding = THREE.sRGBEncoding;
environmentMap.flipY = false;
