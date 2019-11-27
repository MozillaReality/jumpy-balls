/* global THREE */
import * as THREE from "three";
import { System } from "ecsy";
import { ThreeContext, Environment } from "../Components/components.js";

export class EnvironmentSystem extends System {
  init() {
    var threeContext = this.queries.threeContext.results[0].getComponent(
      ThreeContext
    );
    var scene = threeContext.scene;

    // stage ground diameter (and sky radius)
    var STAGE_SIZE = 200;

    // create ground
    // update ground, playarea and grid textures.
    var groundResolution = 2048;
    var texMeters = 20; // ground texture of 20 x 20 meters
    var texRepeat = STAGE_SIZE / texMeters;

    var resolution = 64; // number of divisions of the ground mesh

    var groundGeometry = new THREE.PlaneGeometry(
      STAGE_SIZE + 2,
      STAGE_SIZE + 2,
      resolution - 1,
      resolution - 1
    );

    var groundCanvas = document.createElement("canvas");
    groundCanvas.width = groundResolution;
    groundCanvas.height = groundResolution;
    var groundTexture = new THREE.Texture(groundCanvas);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(texRepeat, texRepeat);

    this.environmentData = {
      groundColor: "#454545",
      groundColor2: "#5d5d5d"
    };

    var groundctx = groundCanvas.getContext("2d");

    var size = groundResolution;
    groundctx.fillStyle = this.environmentData.groundColor;
    groundctx.fillRect(0, 0, size, size);
    groundctx.fillStyle = this.environmentData.groundColor2;
    var num = Math.floor(texMeters / 2);
    var step = size / (texMeters / 2); // 2 meters == <step> pixels
    for (var i = 0; i < num + 1; i += 2) {
      for (var j = 0; j < num + 1; j++) {
        groundctx.fillRect(
          Math.floor((i + (j % 2)) * step),
          Math.floor(j * step),
          Math.floor(step),
          Math.floor(step)
        );
      }
    }

    groundTexture.needsUpdate = true;

    var groundMaterial = new THREE.MeshLambertMaterial({
      map: groundTexture
    });

    var mesh = new THREE.Mesh(groundGeometry, groundMaterial);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;

    scene.add(mesh);

    const color = 0x333333;
    const near = 20;
    const far = 100;
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(color);
  }
}

EnvironmentSystem.queries = {
  threeContext: {
    components: [ThreeContext]
  }
};
