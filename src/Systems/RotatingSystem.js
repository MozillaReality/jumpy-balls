import { System } from "ecsy";
import { Rotating, Object3DComponent } from "../Components/components.js";

export class RotatingSystem extends System {
  execute(delta) {
    this.queries.entities.results.forEach(entity => {
      var rotating = entity.getComponent(Rotating);
      var object = entity.getObject3D();
      object.rotation.x += rotating.speed.x * delta;
      object.rotation.y += rotating.speed.y * delta;
      object.rotation.z += rotating.speed.z * delta;
    });
  }
}

RotatingSystem.queries = {
  entities: {
    components: [Object3DComponent, Rotating]
  }
};
