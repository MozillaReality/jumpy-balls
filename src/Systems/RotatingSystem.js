import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Rotating,
  Ball,
  Active,
  Target,
  Object3D
} from "../Components/components.mjs";

export class RotatingSystem extends System {
  execute(delta, time) {
    var entities = this.queries.entities;

    //Queries
    for (let i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var rotating = entity.getComponent(Rotating);
      var object = entity.getComponent(Object3D).value;
      object.rotation.x += rotating.speed.x * delta;
      object.rotation.y += rotating.speed.y * delta;
      object.rotation.z += rotating.speed.z * delta;
    }
  }
}

RotatingSystem.queries = {
  entities: {
    components: [Object3D, Rotating]
  }
}