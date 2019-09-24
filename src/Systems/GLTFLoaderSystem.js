/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import { ThreeContext, Object3D, Transform, GLTFModel } from "../Components/components.mjs";

var loader = new THREE.GLTFLoader().setPath("/assets/");

export class GLTFLoaderSystem extends System {
  execute() {
    var entities = this.queries.entities.added;

    var threeContext = this.queries.threeContext.results[0].getComponent(
      ThreeContext
    );

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
        threeContext.scene.add(gltf.scene);
        entity.addComponent(Object3D, { object: gltf.scene });
      });
    }
  }
}

GLTFLoaderSystem.queries = {
  entities: {
    components: [GLTFModel],
    listen: {
      added: true
    }
  },
  threeContext: {
    components: [ThreeContext]
  }
};
