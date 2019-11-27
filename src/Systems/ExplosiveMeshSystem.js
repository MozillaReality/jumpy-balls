import { System } from "ecsy";
import {
  ExplosiveMesh,
  Object3D
} from "../Components/components.js";


export class ExplosiveMeshSystem extends System {
  execute(delta, time) {
    var entities = this.queries.entities;

    //Queries
    for (let i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var expMesh = entity.getMutableComponent(ExplosiveMesh);
      var object3D = entity.getComponent(Object3D).value;
      var positions = object3D.geometry.attributes.position.array;
      var normals = object3D.geometry.attributes.normal.array;
      object3D.geometry.computeVertexNormals();

      var value = expMesh.value;
      for (var j = 0;j<positions.length; j++) {
        positions[j] += positions[j] * Math.abs(normals[j]) * value;
      }

      object3D.geometry.attributes.position.needsUpdate = true;

      expMesh.value += delta / 10;
    }
  }
}

ExplosiveMeshSystem.queries = {
  entities: {
    components: [Object3D, ExplosiveMesh]
  }
};
