export class TransformSystem extends System {
  init() {
    return {
      entities: [Transform]
    }
  }

  execute(delta, time) {
    var entities = this.queries.entities;

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      var component = entity.getComponent(Transform);

    }
  }
}