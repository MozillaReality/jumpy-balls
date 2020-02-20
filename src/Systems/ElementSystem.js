import { System } from "ecsy";
import {
  Element,
  GLTFLoader,
  Shape,
  Draggable,
  RigidBody
} from "../Components/components.js";
import * as Materials from "../materials.js";

export class ElementSystem extends System {
  execute() {
    var entitiesAdded = this.queries.entities.added;
    for (let i = 0; i < entitiesAdded.length; i++) {
      let entity = entitiesAdded[i];
      var component = entity.getComponent(Element);

      const elementTypes = [
        {
          model: "metal",
          width: 0.3,
          height: 0.03,
          depth: 0.15,
          restitution: 1,
          draggable: true,
          scale: 1
        },
        {
          model: "rubber",
          width: 0.4,
          height: 0.03,
          depth: 0.4,
          restitution: 2,
          draggable: true,
          scale: 1
        },
        {
          model: "wood",
          width: 0.3,
          height: 0.1,
          depth: 0.2,
          restitution: 0.8,
          draggable: true,
          scale: 1
        },
        {
          model: "static",
          width: 0.3,
          height: 0.3,
          depth: 0.3,
          restitution: 0.1,
          draggable: false,
          scale: 0.3
        }
      ];

      const config = elementTypes[component.type];

      entity
        .addComponent(GLTFLoader, {
          url: config.model + ".glb",
          onLoaded: model => {
            // Compute the boundingbox size to create the physics shape for it
            let min = model.children[0].geometry.boundingBox.min;
            let max = model.children[0].geometry.boundingBox.max;

            let w = Math.abs(max.x - min.x);
            let h = Math.abs(max.y - min.y);
            let d = Math.abs(max.z - min.z);

            if (config.scale) {
              model.children[0].scale.multiplyScalar(config.scale);
              w *= config.scale;
              h *= config.scale;
              d *= config.scale;
            }

            model.children[0].material.envMap = Materials.environmentMap;

            entity.addComponent(Shape, {
              primitive: "box",
              width: w,
              height: h,
              depth: d
            });
          }
        })
        .addComponent(RigidBody, {
          weight: 0.0,
          restitution: config.restitution,
          friction: 0.5,
          linearDamping: 0.0,
          angularDamping: 0.0
        });

      if (config.draggable) {
        entity.addComponent(Draggable);
      }
    }
  }
}

ElementSystem.queries = {
  entities: {
    components: [Element],
    listen: {
      added: true
    }
  }
};
