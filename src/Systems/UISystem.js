import { System } from "ecsy";
import * as THREE from "three";
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
    const entities = this.queries.entities;

    for (let i = 0; i < entities.results.length; i++) {
      const entity = entities.results[i];
      const component = entity.getComponent(UI);
    }

    for (let i = 0; i < entities.added.length; i++) {
      const entity = entities.added[i];
      const component = entity.getComponent(UI);
      let child = this.world.createEntity();
      let child2 = this.world.createEntity();

      let group = new THREE.Object3D();
      entity.addComponent(Object3D, { value: group });
      entity.addComponent(RaycastReceiver, {
        onHover: () => {
          let obj = child.getComponent(Object3D).value;
          console.log("Hoverrr");
        },
        onEnter: () => {
          let obj = child.getComponent(Object3D).value;
          obj.material.color.setRGB(1, 1, 0);
          console.log(">>>>>>>>>>>> entering");
        },
        onLeave: () => {
          let obj = child.getComponent(Object3D).value;
          obj.material.color.setRGB(1, 1, 1);
          console.log(">>>>>>>>>>>> leaving");
        },
        onClick: () => {
          console.log(">>>>>>>>>>>> clicking");
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
    components: [UI],
    listen: {
      added: true,
      removed: true,
      changed: true // [UI]
    }
  }
};
