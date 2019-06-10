/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
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
            },
            removed: {
              event: "EntityRemoved"
            }
          }
        }
      }
    };
  }

  execute() {
    // Removed
    this.events.entities.removed.forEach(entity => {
      var object = entity.getComponent(Object3D).object;
      object.parent.remove(object);
    });

    // Added
    this.events.entities.added.forEach(entity => {
      var component = entity.getComponent(Geometry);

      var geometry;
      switch (component.primitive) {
        case "torus":
          {
            geometry = new THREE.TorusBufferGeometry(
              component.radius,
              component.tube,
              component.radialSegments,
              component.tubularSegments
            );
          }
          break;
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

      var color = component.primitive === 'torus' ? 0x999900 : Math.random() * 0xffffff;

      var material = new THREE.MeshStandardMaterial({
        color: color,
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
