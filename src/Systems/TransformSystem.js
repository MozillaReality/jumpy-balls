import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { Transform, Object3D } from "../Components/components.mjs";

export class TransformSystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [Object3D, Transform],
          events: {
            added: {
              event: "EntityAdded"
            },
            changed: {
              event: "ComponentChanged",
              components: [Transform]
            }
          }
        }
      }
    };
  }

  execute() {
    var entitiesEvents = this.events.entities;
    for (let i = 0; i < entitiesEvents.added.length; i++) {
      let entity = entitiesEvents.added[i];
      let transform = entity.getComponent(Transform);
      let object = entity.getComponent(Object3D).object;

      object.position.copy(transform.position);
      object.rotation.set(
        transform.rotation.x,
        transform.rotation.y,
        transform.rotation.z
      );
    }

    for (let i = 0; i < entitiesEvents.changed.length; i++) {
      let entity = entitiesEvents.changed[i];
      let transform = entity.getComponent(Transform);
      let object = entity.getComponent(Object3D).object;

      object.position.copy(transform.position);
      object.rotation.set(
        transform.rotation.x,
        transform.rotation.y,
        transform.rotation.z
      );
    }
  }
}
