import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  GameState,
  Ball,
  Active,
  Object3D
} from "../Components/components.mjs";

/**
 * Check collisions between [Active Ball] and the ground
 */
export class FloorCollisionSystem extends System {
  execute() {
    var balls = this.queries.balls.results;

    var gameState = this.queries.gameState.results[0].getComponent(GameState);

    if (gameState.levelFinished) {
      return;
    }

    for (var i = 0; i < balls.length; i++) {
      var ball = balls[i];
      var ballObject = ball.getComponent(Object3D).object;
      var radius = ball.getComponent(Ball).radius;

      // Hit the floor
      if (ballObject.position.y < radius) {
        ball.removeComponent(Active);

        // Wait a bit before spawning a new bullet from the generator
        this.world.emitEvent("floorCollided", ball);
      }
    }
  }
}

FloorCollisionSystem.queries = {
  balls: {
    components: [Ball, Active, Object3D]
  },
  gameState: {
    components: [GameState]
  }
};
