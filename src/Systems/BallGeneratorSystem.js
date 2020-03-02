import { System } from "ecsy";
import {
  Ball,
  Object3D,
  Active,
  LevelItem,
  GLTFLoader,
  Shape,
  Parent,
  Sound,
  RigidBody,
  Transform,
  BallGenerator
} from "../Components/components.js";

const RADIUS = 0.03;

export class BallGeneratorSystem extends System {
  execute() {
    this.queries.entities.added.forEach(generator => {
      let soundComponent = generator.getComponent(Sound);
      if (soundComponent.sound) {
        soundComponent.sound.play();
      }

      var ballGeneratorComponent = generator.getComponent(BallGenerator);

      // Ball dispatcher object
      var ball = this.world.createEntity();
      ball
        .addComponent(GLTFLoader, {
          url: "assets/models/ball.glb",
          onLoaded: model => {
            ball.getMutableComponent(Object3D).value = model.children[0];
          }
        })
        .addComponent(Transform, {
          position: ballGeneratorComponent.position,
          rotation: { x: 0, y: 0, z: 0 }
        })
        .addComponent(Shape, {
          primitive: "sphere",
          radius: RADIUS
        })
        .addComponent(RigidBody, {
          weight: 10.0,
          restitution: 0.5,
          friction: 0.5,
          linearDamping: 0.0,
          angularDamping: 0.0,
          linearVelocity: ballGeneratorComponent.linearVelocity
        })
        .addComponent(LevelItem)
        .addComponent(Ball, {
          position: ballGeneratorComponent.position,
          radius: RADIUS,
          linearVelocity: ballGeneratorComponent.linearVelocity
        })
        .addComponent(Active)
        .addComponent(Parent, {
          value: this.world.entityManager.getEntityByName("playingGroup")
        });

      generator.removeComponent(Active);
    });
  }
}

BallGeneratorSystem.queries = {
  entities: {
    components: [BallGenerator, Active],
    listen: {
      added: true
    }
  }
};
