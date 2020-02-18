import { System } from "ecsy";
import * as THREE from "three";
import TWEEN from "../vendor/tween.module.min.js";

import { Position, Text } from "ecsy-three";
import {
  UI,
  Parent,
  Geometry,
  Button,
  RaycastReceiver,
  Object3D
} from "../Components/components.js";

export class UISystem extends System {
  execute(delta, time) {
    TWEEN.update();

    const entities = this.queries.entities;

    for (let i = 0; i < entities.results.length; i++) {
      const entity = entities.results[i];
      const component = entity.getComponent(UI);
    }

    for (let i = 0; i < entities.added.length; i++) {
      const entity = entities.added[i];
      const component = entity.getComponent(UI);
      const button = entity.getComponent(Button);

      let child = this.world.createEntity();
      let child2 = this.world.createEntity();

      let group = new THREE.Object3D();
      entity.addComponent(Object3D, { value: group });
      entity.addComponent(RaycastReceiver, {
        onHover: () => {},
        onEnter: () => {
          let obj = child.getComponent(Object3D).value;
          obj.material.color.setRGB(1, 1, 0);
          var tween = new TWEEN.Tween(obj.scale)
            .to(
              {
                x: 1.1,
                y: 1.1,
                z: 1.1
              },
              500
            )
            .onUpdate(() => {})
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        },
        onLeave: () => {
          let obj = child.getComponent(Object3D).value;
          obj.material.color.setRGB(1, 1, 1);
          var tween = new TWEEN.Tween(obj.scale)
            .to(
              {
                x: 1,
                y: 1,
                z: 1
              },
              300
            )
            .onUpdate(() => {})
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        },
        onSelectStart: () => {
          let obj = child.getComponent(Object3D).value;
          obj.material.color.setRGB(1, 1, 0.8);
          setTimeout(() => {
            obj.material.color.setRGB(1, 1, 0);
          }, 300);

          var tween = new TWEEN.Tween(obj.scale)
            .to(
              {
                x: 1.2,
                y: 1.2,
                z: 1.2
              },
              100
            )
            .repeat(1)
            //.delay(500)
            .yoyo(true)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
          console.log("Clicking!");
          button.onClick && button.onClick();
        }
      });

      let width = 2;
      let height = 2;
      let depth = 0.1;

      child
        .addComponent(Geometry, {
          primitive: "box",
          width: width,
          height: height,
          depth: depth
        })
        //.addComponent(Position, { value: new THREE.Vector3(width / 2, 0, 0) })
        .addComponent(Parent, { value: entity });

      child2
        .addComponent(Text, {
          color: "#ffffff",
          fontSize: 0.6,
          anchor: "center",
          textAlign: "center",
          baseline: "center",
          maxWidth: 10,
          lineHeight: 0,
          text: "Start"
        })
        .addComponent(Position, { value: new THREE.Vector3(0, 0.05, 0.1) })
        .addComponent(Parent, { value: entity });
    }
  }
}

UISystem.queries = {
  entities: {
    components: [UI, Button],
    listen: {
      added: true,
      removed: true,
      changed: true // [UI]
    }
  }
};
