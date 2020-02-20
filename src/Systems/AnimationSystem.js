import { System } from "ecsy";
import * as THREE from "three";
import { Play, Active, GLTFModel, Animation } from "../Components/components.js";

class AnimationMixerComponent {
  constructor() {}
  reset() {}
}

class AnimationActionsComponent {
  constructor() {
    this.animations = [];
  }
  reset() {}
}

export class AnimationSystem extends System {
  execute(delta) {
    this.queries.entities.results.forEach(entity => {
      let gltf = entity.getComponent(GLTFModel).value;
      let mixer = new THREE.AnimationMixer(gltf.scene);
      entity.addComponent(AnimationMixerComponent, {
        value: mixer
      });

      let animations = [];
      gltf.animations.forEach(animationClip => {
        const action = mixer.clipAction(animationClip, gltf.scene);
        action.loop = THREE.LoopOnce;
        animations.push(action);
      });

      entity.addComponent(AnimationActionsComponent, {
        animations: animations
      });
    });

    this.queries.mixers.results.forEach(entity => {
      entity.getComponent(AnimationMixerComponent).value.update(delta);
    });

    this.queries.queuedClips.results.forEach(entity => {
      let animations = entity.getComponent(AnimationActionsComponent).animations;
      animations.forEach(actionClip => {
        actionClip.setDuration(2);
        actionClip.reset();
        actionClip.play();
      });
      entity.removeComponent(Play);
    });
  }
}

AnimationSystem.queries = {
  entities: {
    components: [Animation, GLTFModel],
    listen: {
      added: true,
      removed: true,
      changed: true // [Animation]
    }
  },
  mixers: {
    components: [AnimationMixerComponent]
  },
  queuedClips: {
    components: [AnimationActionsComponent, Play]
  }
};
