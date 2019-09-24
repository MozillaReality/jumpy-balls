/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { Element, Object3D } from "../Components/components.mjs";

export class OutputSystem extends System {
  execute() {
    return; // TODO
    if (this.events.generateJSON.length > 0) {
      var entities = this.queries.entities;
      var json = [];
      for (let i = 0; i < entities.length; i++) {
        var item = {};
        var entity = entities[i];
        var element = entity.getComponent(Element);
        item.type = element.type;

        var object = entity.getComponent(Object3D).object; // @todo Transform
        item.position = JSON.parse(JSON.stringify(object.position));
        item.rotation = JSON.parse(JSON.stringify(object.rotation));

        json.push(item);
      }
      console.log(JSON.stringify(json, null, 2));
    }
  }
}

OutputSystem.queries = {
  entities: {
    components: [Element]
  }
};

OutputSystem.events = {
  generateJSON: "generateJSON"
};
