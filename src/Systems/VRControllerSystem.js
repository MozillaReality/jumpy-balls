import { System } from 'http://192.168.1.129:8080/build/ecsy.module.js';
import {
  VRController
} from '../components.mjs';

export class VRControllerSystem extends System {
  init() {
    return {
      entities: [VRController]
    }
  }

  onEntitiesAdded() {
    var entities = this.queries.entities.added;

    entities.forEach(entity => {
      var component = entity.getComponent(VRController);

      //component.controller = renderer.vr.getController( component.id );
      //component.controller.addEventListener( 'selectstart', onSelectStart );
      //component.controller.addEventListener( 'selectend', onSelectEnd );
      //cameraRig.add( controller );

    });
  }
}

