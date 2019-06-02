import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  BallGenerator,
  Dissolve,
  Object3D,
  Active
} from "../Components/components.mjs";

export class GameStateSystem extends System {
  init() {
    return {
      queries: {
        entities: { components: [BallGenerator] }
      },
      events: {
        floorCollided: "floorCollided",
        levelCleared: "levelCleared"
      }
    };
  }

  execute() {
    // If a ball collided with the floor, reactivate the generator to throw another ball
    this.events.floorCollided.forEach(ball => {
      // @todo here we should just activate the collided ball's generator
      // Wait 2s before reactivating the ball generator
      setTimeout(() => {
        this.queries.entities.forEach(generator => {
          generator.addComponent(Active);
        });
      }, 2000);

      setTimeout(() => {
        ball.addComponent(Dissolve);
      }, 4000);
    });

    this.events.levelCleared.forEach(() => {
      console.log("Level Cleared!");
      this.world.components.threeContext.scene.background.set(0x00ff00);
      this.world.components.gameState.levelFinished = true;
    });
  }
}
