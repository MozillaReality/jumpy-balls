import { System } from "ecsy";
import { Ball, Dissolve, Object3D } from "../Components/components.js";

export class DissolveSystem extends System {
  execute(delta) {
    var entities = this.queries.entities.results;

    //Queries
    for (let i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var dissolve = entity.getMutableComponent(Dissolve);
      var object = entity.getComponent(Object3D).value;
      if (!object.material) {
        continue;
      }
      object.material.opacity = dissolve.value;
      object.material.transparent = true;

      dissolve.value -= delta * dissolve.speed;
      if (dissolve.value <= 0) {
        entity.remove();
      }
    }
  }
}

DissolveSystem.queries = {
  entities: {
    components: [Ball, Dissolve, Object3D],
    listen: {
      added: true
    }
  }
};
