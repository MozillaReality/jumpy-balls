/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { Visible, Object3D } from "../Components/components.mjs";

export class VisibilitySystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [Visible, Object3D],
          events: {
            added: {
              event: "EntityAdded"
            },
            changed: {
              event: "ComponentChanged",
              components: [Visible]
            }
          }
        }
      }
    };
  }

  processVisibility(entities) {
    entities.forEach(entity => {
      entity.getMutableComponent(Object3D).object.visible = entity.getComponent(
        Visible
      ).value;
    });
  }

  execute() {
    this.processVisibility(this.events.entities.added);
    this.processVisibility(this.events.entities.changed);
  }
}
