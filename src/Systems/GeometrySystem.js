/* global THREE */
import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import { Geometry, Object3D, Transform } from "../Components/components.mjs";

/**
 * Create a Mesh based on the [Geometry] component and attach it to the entity using a [Object3D] component
 */
export class GeometrySystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [Geometry], // @todo Transform: As optional, how to define it?
          events: {
            added: {
              event: "EntityAdded"
            }
          }
        }
      }
    };
  }

  execute() {
    this.events.entities.added.forEach(entity => {
      var component = entity.getComponent(Geometry);

      var geometry;
      switch (component.primitive) {
        case "sphere":
          {
            geometry = new THREE.IcosahedronBufferGeometry(component.radius, 1);
          }
          break;
        case "box":
          {
            geometry = new THREE.BoxBufferGeometry(
              component.width,
              component.height,
              component.depth
            );
          }
          break;
      }

      var material = new THREE.MeshStandardMaterial({
        color: Math.random() * 0xffffff,
        roughness: 0.7,
        metalness: 0.0,
        flatShading: true
      });

      var object = new THREE.Mesh(geometry, material);
      object.castShadow = true;
      object.receiveShadow = true;

      if (entity.hasComponent(Transform)) {
        var transform = entity.getComponent(Transform);
        object.position.copy(transform.position);
        if (transform.rotation) {
          object.rotation.set(
            transform.rotation.x,
            transform.rotation.y,
            transform.rotation.z
          );
        }
      }

      this.world.components.threeContext.scene.add(object);
      entity.addComponent(Object3D, { object: object });
    });
  }
}
