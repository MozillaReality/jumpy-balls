import { System } from "ecsy";
import { levels } from "../levels.js";
import {
  TextGeometry,
  BallGenerator,
  Dissolve,
  Target,
  Cleared,
  Active,
  Level,
  Ball,
  FloorCollided,
  GameState
} from "../Components/components.js";

export class GameStateSystem extends System {
  execute() {
    var gameState = this.queries.gameState.results[0].getComponent(GameState);

    // If a ball collided with the floor, reactivate the generator to throw another ball
    this.queries.ballFloorCollided.added.forEach(ball => {
      // @todo this.component.numBallsFailed++
      gameState.numBallsFailed++;

      // @todo remove it and link the text element
      //window.text.getMutableComponent(TextGeometry).text ="balls: " + gameState.numBallsFailed;

      // @todo here we should just activate the collided ball's generator
      // Wait 2s before reactivating the ball generator
      setTimeout(() => {
        this.queries.entities.results.forEach(generator => {
          generator.addComponent(Active);
        });
      }, 1000);

      setTimeout(() => {
        ball.addComponent(Dissolve);
      }, 2000);
    });

    this.queries.targetCleared.added.forEach(() => {
      //window.text.getMutableComponent(TextGeometry).text = `Level Cleared!`;

      setTimeout(() => {
        var levelComponent = this.world.entity.getMutableComponent(Level);
        if (levelComponent.value === levels.length - 1) {
          levelComponent.value = 0;
        } else {
          levelComponent.value++;
          //window.text.getMutableComponent(TextGeometry).text = `Level: ${levelComponent.value}`;
          // threeContext.scene.background.set(0x333333);
          gameState.levelFinished = false;
        }
      }, 2000);

      // threeContext.scene.background.set(0x00ff00);
      gameState.levelFinished = true;
    });
  }
}

GameStateSystem.queries = {
  entities: { components: [BallGenerator] },
  gameState: { components: [GameState] },
  ballFloorCollided: {
    components: [Ball, FloorCollided],
    listen: {
      added: true
    }
  },
  targetCleared: {
    components: [Target, Cleared],
    listen: {
      added: true
    }
  }
};
