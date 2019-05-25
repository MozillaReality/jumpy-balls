import { System } from 'http://192.168.1.129:8080/build/ecsy.module.js';
import {
  Ball,
  Active,
  Target,
  Object3D,
} from '../components.mjs';

// Aux position
var worldPos = new THREE.Vector3();

/**
 * Check if the [Active Ball] collides with the [Target] entities
 */
export class TargetSystem extends System {
  init() {
    return {
      queries: {
        targets: { components: [Target] },
        balls:  { components: [Ball, Active] }
      }
    };
  }

  execute() {
    var balls = this.queries.balls;
    var targets = this.queries.targets;

    for (var i = 0; i < targets.length; i++) {
      var target = targets[i];
      var targetObject = target.getComponent(Object3D).object;
      targetObject.getWorldPosition(worldPos);
      if (!targetObject.geometry.boundingSphere) {
        targetObject.geometry.computeBoundingSphere();
      }

      let radiusBall = targetObject.geometry.boundingSphere.radius;

      for (var i = 0; i < balls.length; i++) {
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

          //@todo Emit event so this can be handled in the game state system
          console.log('Level Cleared!');
          this.world.components.threeContext.scene.background.set( 0x00ff00 );
          this.world.components.gameState.levelFinished = true;
        }
      }
    }
  }
}

