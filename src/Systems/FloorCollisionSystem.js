import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  GameState,
  Ball,
  Active,
  FloorCollided,
  Object3D
} from "../Components/components.mjs";

/**
 * Check collisions between [Active Ball] and the ground
 */
export class FloorCollisionSystem extends System {
  execute() {
    var gameState = this.queries.gameState.results[0].getComponent(GameState);

    if (gameState.levelFinished) {
      return;
    }

    this.queries.ballsCollided.results.forEach(ball => {
      ball.removeComponent(FloorCollided);
    });

    this.queries.balls.results.forEach(ball => {
      var ballObject = ball.getComponent(Object3D).value;
      var radius = ball.getComponent(Ball).radius;

      // Hit the floor
      if (ballObject.position.y < radius) {
        ball.removeComponent(Active);

        // Wait a bit before spawning a new bullet from the generator
        ball.addComponent(FloorCollided);
      }
    });
  }
}

FloorCollisionSystem.queries = {
  balls: {
    components: [Ball, Active, Object3D]
  },
  ballsCollided: {
    components: [Ball, FloorCollided]
  },
  gameState: {
    components: [GameState]
  }
};
