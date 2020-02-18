import * as THREE from "three";
import { System } from "ecsy";
import {
  Rotating,
  Ball,
  Cleared,
  Active,
  Target,
  Object3D
} from "../Components/components.js";

// Aux position
var worldPos = new THREE.Vector3();

/**
 * Check if the [Active Ball] collides with the [Target] entities
 */
export class TargetSystem extends System {
  execute() {
    var balls = this.queries.balls.results;
    var targets = this.queries.targets.results;

    for (let i = 0; i < targets.length; i++) {
      var target = targets[i];
      var object3D = target.getComponent(Object3D).value;
      let targetObject = object3D.children[0];
      targetObject.getWorldPosition(worldPos);
      if (!targetObject.geometry.boundingSphere) {
        targetObject.geometry.computeBoundingSphere();
      }

      let radiusBall = targetObject.geometry.boundingSphere.radius;

      for (let i = 0; i < balls.length; i++) {
        var ball = balls[i];
        var ballObject = ball.getComponent(Object3D).value;
        if (!ballObject.geometry.boundingSphere) {
          ballObject.geometry.computeBoundingSphere();
        }
        let radiusBox = ballObject.geometry.boundingSphere.radius;
        let radiusSum = radiusBox + radiusBall;

        if (
          ballObject.position.distanceToSquared(worldPos) <=
          radiusSum * radiusSum
        ) {
          ball.removeComponent(Active);
          target.addComponent(Rotating, { speed: new THREE.Vector3(5, 13, 0) });
          target.addComponent(Cleared);
        }
      }
    }
  }
}

TargetSystem.queries = {
  targets: { components: [Target, Object3D] },
  balls: { components: [Ball, Active, Object3D] }
};
