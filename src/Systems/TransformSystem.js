import { System } from "ecsy";
import { Transform, Object3D } from "../Components/components.js";

export class TransformSystem extends System {
  execute() {
    var entitiesEvents = this.queries.entities;
    for (let i = 0; i < entitiesEvents.added.length; i++) {
      let entity = entitiesEvents.added[i];
      let transform = entity.getComponent(Transform);
      let object = entity.getComponent(Object3D).value;

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
      let object = entity.getComponent(Object3D).value;

      object.position.copy(transform.position);
      object.rotation.set(
        transform.rotation.x,
        transform.rotation.y,
        transform.rotation.z
      );
    }
  }
}

TransformSystem.queries = {
  entities: {
    components: [Object3D, Transform],
    listen: {
      added: true,
      changed: [Transform]
    }
  }
};
