import { System } from "ecsy";
import { Rotating, Object3D } from "../Components/components.js";

export class RotatingSystem extends System {
  execute(delta, time) {
    this.queries.entities.results.forEach(entity => {
      var rotating = entity.getComponent(Rotating);
      var object = entity.getComponent(Object3D).value;
      object.rotation.x += rotating.speed.x * delta;
      object.rotation.y += rotating.speed.y * delta;
      object.rotation.z += rotating.speed.z * delta;
    });
  }
}

RotatingSystem.queries = {
  entities: {
    components: [Object3D, Rotating]
  }
};
