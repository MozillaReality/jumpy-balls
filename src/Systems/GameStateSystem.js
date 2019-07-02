import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  TextGeometry,
  BallGenerator,
  Dissolve,
  Active,
  Level
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
      // @todo this.component.numBallsFailed++
      this.world.components.gameState.numBallsFailed++;

      // @todo remove it and link the text element
      window.text.getMutableComponent(TextGeometry).text =
        "balls: " + this.world.components.gameState.numBallsFailed;

      // @todo here we should just activate the collided ball's generator
      // Wait 2s before reactivating the ball generator
      setTimeout(() => {
        this.queries.entities.forEach(generator => {
          generator.addComponent(Active);
        });
      }, 1000);

      setTimeout(() => {
        ball.addComponent(Dissolve);
      }, 2000);
    });

    this.events.levelCleared.forEach(() => {
      window.text.getMutableComponent(TextGeometry).text = `Level Cleared!`;

      setTimeout(() => {
        var levelComponent = this.world.entity.getMutableComponent(Level);
        levelComponent.level++;
        window.text.getMutableComponent(TextGeometry).text = `Level: ${levelComponent.level}`;
        this.world.components.threeContext.scene.background.set(0x333333);
        this.world.components.gameState.levelFinished = false;
      }, 2000);

      this.world.components.threeContext.scene.background.set(0x00ff00);
      this.world.components.gameState.levelFinished = true;
    });
  }
}
