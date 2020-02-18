import { System } from "ecsy";
import { levels } from "../levels.js";
import { Text } from "ecsy-three";
import {
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
import { PhysicsSystem } from "../Systems/systems.mjs";

export class GameStateSystem extends System {
  playGame() {
    this.world.getSystem(PhysicsSystem).play();
    this.queries.gameState.results[0].getMutableComponent(
      GameState
    ).playing = true;
  }

  stopGame() {
    this.world.getSystem(PhysicsSystem).stop();
    this.queries.gameState.results[0].getMutableComponent(
      GameState
    ).playing = false;
  }

  execute() {
    /*
    this.queries.gameState.changed.forEach(entity => {
      var gameState = entity.getComponent(GameState);
      if (gameState.playing) {
        this.world.getSystem(PhysicsSystem).play();
      } else {
        this.world.getSystem(PhysicsSystem).stop();
      }
    });
*/
    var gameState = this.queries.gameState.results[0].getComponent(GameState);
    let elapsedTimeCurrent = performance.now() - gameState.levelStartTime;
    let elapsedTimeTotal = performance.now() - gameState.gameStartTime;

    let worldSingleton = this.world.entityManager.getEntityByName("singleton");

    this.world.entityManager
      .getEntityByName("timer")
      .getMutableComponent(Text).text = `current level: ${new Date(
      elapsedTimeCurrent
    )
      .toISOString()
      .substr(14, 5)}\ntotal: ${new Date(elapsedTimeTotal)
      .toISOString()
      .substr(14, 5)}`;

    // If a ball collided with the floor, reactivate the generator to throw another ball
    this.queries.ballFloorCollided.added.forEach(ball => {
      // @todo this.component.numBallsFailed++
      gameState.numBallsFailed++;

      this.world.entityManager
        .getEntityByName("numberBallsText")
        .getMutableComponent(Text).text = `balls: ${gameState.numBallsFailed}`;

      // @todo here we should just activate the collided ball's generator
      // Wait 2s before reactivating the ball generator
      let currentLevel = worldSingleton.getComponent(Level).value;

      setTimeout(() => {
        if (worldSingleton.getComponent(Level).value !== currentLevel) {
          return;
        }
        this.queries.entities.results.forEach(generator => {
          generator.addComponent(Active);
        });
      }, 1000);

      setTimeout(() => {
        if (
          !ball ||
          worldSingleton.getComponent(Level).value !== currentLevel
        ) {
          return;
        }

        ball.addComponent(Dissolve);
      }, 2000);
    });

    this.queries.targetCleared.added.forEach(() => {
      this.world.entityManager
        .getEntityByName("numberBallsText")
        .getMutableComponent(Text).text = `Level cleared!`;

      setTimeout(() => {
        var levelComponent = worldSingleton.getMutableComponent(Level);
        if (levelComponent.value === levels.length - 1) {
          levelComponent.value = 0;
        } else {
          levelComponent.value++;

          this.world.entityManager
            .getEntityByName("numberBallsText")
            .getMutableComponent(Text).text = `Level: ${levelComponent.value}`;

          gameState.levelStartTime = performance.now();

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
  gameState: {
    components: [GameState],
    listen: {
      changed: true
    }
  },
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
