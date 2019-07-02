/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { TextGeometry, Object3D } from "../Components/components.mjs";

export class TextGeometrySystem extends System {
  init() {
    this.initialized = false;
    var loader = new THREE.FontLoader();
    this.font = null;
    loader.load("/assets/fonts/helvetiker_regular.typeface.json", font => {
      this.font = font;
      this.initialized = true;
    });

    return {
      queries: {
        entities: {
          components: [TextGeometry],
          events: {
            added: { event: "EntityAdded" },
            changed: { event: "ComponentChanged", components: [TextGeometry] }
          }
        }
      }
    };
  }

  execute() {
    if (!this.font) return;

    var changed = this.events.entities.changed;
    changed.forEach(entity => {
      var textComponent = entity.getComponent(TextGeometry);
      var geometry = new THREE.TextGeometry(textComponent.text, {
        font: this.font,
        size: 1,
        height: 0.1,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 3
      });
      var object = entity.getMutableComponent(Object3D).object;
      object.geometry = geometry;
    });

    var added = this.events.entities.added;
    added.forEach(entity => {
      var textComponent = entity.getComponent(TextGeometry);
      var geometry = new THREE.TextGeometry(textComponent.text, {
        font: this.font,
        size: 1,
        height: 0.1,
        curveSegments: 3,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.03,
        bevelOffset: 0,
        bevelSegments: 3
      });

      var color = Math.random() * 0xffffff;
      color = 0xffffff;
      var material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.7,
        metalness: 0.0
      });

      var mesh = new THREE.Mesh(geometry, material);

      this.world.components.threeContext.scene.add(mesh);
      entity.addComponent(Object3D, { object: mesh });
    });
  }
}
