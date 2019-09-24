import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  TextGeometry,
  BallGenerator,
  Dissolve,
  Active,
  ThreeContext,
  Level,
  GameState
} from "../Components/components.mjs";

export class GameStateSystem extends System {
  execute() {
    var gameState = this.queries.gameState.results[0].getComponent(GameState);
    var threeContext = this.queries.threeContext.results[0].getComponent(
      ThreeContext
    );

    // If a ball collided with the floor, reactivate the generator to throw another ball
    this.events.floorCollided.forEach(ball => {
      // @todo this.component.numBallsFailed++
      gameState.numBallsFailed++;

      // @todo remove it and link the text element
      window.text.getMutableComponent(TextGeometry).text =
        "balls: " + gameState.numBallsFailed;

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

    this.events.levelCleared.forEach(() => {
      window.text.getMutableComponent(TextGeometry).text = `Level Cleared!`;

      setTimeout(() => {
        var levelComponent = this.world.entity.getMutableComponent(Level);
        levelComponent.level++;
        window.text.getMutableComponent(TextGeometry).text = `Level: ${
          levelComponent.level
        }`;
        threeContext.scene.background.set(0x333333);
        gameState.levelFinished = false;
      }, 2000);

      threeContext.scene.background.set(0x00ff00);
      gameState.levelFinished = true;
    });
  }
}

GameStateSystem.queries = {
  entities: { components: [BallGenerator] },
  gameState: { components: [GameState] },
  threeContext: { components: [ThreeContext] }
};

GameStateSystem.events = {
  floorCollided: "floorCollided",
  levelCleared: "levelCleared"
};
