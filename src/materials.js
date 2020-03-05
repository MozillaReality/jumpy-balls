import * as THREE from "three";

// global environment map

export const environmentMap = new THREE.TextureLoader().load(
  "assets/textures/env.jpg"
);
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.encoding = THREE.sRGBEncoding;
environmentMap.flipY = false;

// ui

export const UIMaterial = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load("assets/textures/ui.png"),
  transparent: true
});
UIMaterial.map.encoding = THREE.sRGBEncoding;
UIMaterial.map.flipY = false;

export var textures = {};

const textureURLs = [
  'metal.jpg', 'rubber.png', 'wood.png', 'floor.png',
  'target.png', 'cannon.jpg', 'ball.png', 'wood_spec.jpg',
  'cannon_spec.jpg', 'metal_spec.jpg'];
for (let i = 0; i < textureURLs.length; i++) {
  let tex = new THREE.TextureLoader().load(`assets/textures/${textureURLs[i]}`);
  tex.encoding = THREE.sRGBEncoding;
  tex.flipY = false;
  textures[textureURLs[i]] = tex;
}

