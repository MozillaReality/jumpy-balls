/* global THREE */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Rotating,
  Ball,
  Active,
  Target,
  Object3D
} from "../Components/components.mjs";

// Aux position
var worldPos = new THREE.Vector3();

/**
 * Check if the [Active Ball] collides with the [Target] entities
 */
export class TargetSystem extends System {
  init() {
    return {
      queries: {
        targets: { components: [Target, Object3D] },
        balls: { components: [Ball, Active, Object3D] }
      }
    };
  }

  execute() {
    var balls = this.queries.balls;
    var targets = this.queries.targets;

    for (let i = 0; i < targets.length; i++) {
      var target = targets[i];
      var targetObject = target.getComponent(Object3D).object;
      targetObject.getWorldPosition(worldPos);
      if (!targetObject.geometry.boundingSphere) {
        targetObject.geometry.computeBoundingSphere();
      }

      let radiusBall = targetObject.geometry.boundingSphere.radius;

      for (let i = 0; i < balls.length; i++) {
        var ball = balls[i];
        var ballObject = ball.getComponent(Object3D).object;
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
          this.world.emitEvent("levelCleared");
          target.addComponent(Rotating, { speed: { x: 5, y: 13, z: 0 } });
        }
      }
    }
  }
}
