import { System } from "http://192.168.1.129:8080/build/ecsy.module.js";
import { BallGenerator, Active } from "../Components/components.mjs";

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
    this.events.floorCollided.forEach(() => {
      // @todo here we should just activate the collided ball's generator
      this.queries.entities.forEach(generator => {
        generator.addComponent(Active);
      });
    });

    this.events.levelCleared.forEach(() => {
      console.log("Level Cleared!");
      this.world.components.threeContext.scene.background.set(0x00ff00);
      this.world.components.gameState.levelFinished = true;
    });
  }
}
