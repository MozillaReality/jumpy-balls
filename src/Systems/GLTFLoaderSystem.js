/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { Object3D, Transform, GLTFModel } from "../Components/components.mjs";

var loader = new THREE.GLTFLoader().setPath("/assets/");

export class GLTFLoaderSystem extends System {
  init() {
    return {
      queries: {
        entities: {
          components: [GLTFModel],
          events: {
            added: {
              event: "EntityAdded"
            }
          }
        }
      }
    };
  }

  execute() {
    var entities = this.events.entities.added;

    //Queries
    for (let i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var component = entity.getComponent(GLTFModel);

      loader.load(component.url, gltf => {
        /*
        gltf.scene.traverse(function(child) {
          if (child.isMesh) {
            child.material.envMap = envMap;
          }
        });
*/
        this.world.components.threeContext.scene.add(gltf.scene);
        entity.addComponent(Object3D, { object: gltf.scene });
      });
    }
  }
}
