import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import { Transform } from "../Components/components.mjs";

export class TransformSystem extends System {
  init() {
    return {
      entities: [Transform]
    };
  }

  execute() {
    /*
    var entities = this.queries.entities;

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var component = entity.getComponent(Transform);
    }
    */
  }
}
