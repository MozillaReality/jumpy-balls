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
          restitution: 1,
          draggable: true,
          scale: 1
        },
        {
          model: "rubber",
          restitution: 2,
          draggable: true,
          scale: 1
        },
        {
          model: "wood",
          restitution: 0.8,
          draggable: true,
          scale: 1
        },
        {
          model: "static",
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
            let mesh = model.children[0];
            let geometry = mesh.geometry;
            if (config.scale) {
              geometry.scale(config.scale, config.scale, config.scale);
              geometry.computeBoundingBox();
            }

            // Compute the boundingbox size to create the physics shape for it
            let min = geometry.boundingBox.min;
            let max = geometry.boundingBox.max;

            let w = Math.abs(max.x - min.x);
            let h = Math.abs(max.y - min.y);
            let d = Math.abs(max.z - min.z);

            mesh.material.envMap = Materials.environmentMap;

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
