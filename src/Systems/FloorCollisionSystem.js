import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import { Ball, Active, Object3D } from "../Components/components.mjs";

/**
 * Check collisions between [Active Ball] and the ground
 */
export class FloorCollisionSystem extends System {
  init() {
    return {
      queries: {
        balls: { components: [Ball, Active, Object3D] }
      }
    };
  }

  execute() {
    var balls = this.queries.balls;

    if (this.world.components.gameState.levelFinished) {
      return;
    }

    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];
      var ballObject = ball.getComponent(Object3D).object;
      var radius = ball.getComponent(Ball).radius;

      // Hit the floor
      if (ballObject.position.y < radius) {
        ball.removeComponent(Active);

        // @todo emit event so this is handled in the gamestate system
        this.world.components.threeContext.scene.background.set(0xff0000);
        this.world.components.gameState.numBallsFailed++;
        console.log(
          "Failed!, number of balls:",
          this.world.components.gameState.numBallsFailed
        );

        // Wait a bit before spawning a new bullet from the generator
        setTimeout(() => {
          this.world.emitEvent("floorCollided", ball);
        }, 2000);
      }
    }
  }
}
