/* global THREE, Ammo */
import { System } from "../../node_modules/ecsy/build/ecsy.module.js";
import {
  Transform,
  Shape,
  Object3D,
  RigidBody
} from "../Components/components.mjs";

var quaternion = new THREE.Quaternion();
var euler = new THREE.Euler();

export class PhysicsSystem extends System {
  init() {
    this._physicsWorld = this._createWorld();
    this._transform = new Ammo.btTransform();
    this._quaternion = new Ammo.btQuaternion(0, 0, 0, 1);
  }

  execute(delta) {
    this.queries.entities.added.forEach(entity => {
      var object = entity.getComponent(Object3D).object;
      const body = this._setupRigidBody(this._createRigidBody(entity), entity);
      body.object3D = object;
      object.userData.body = body;
      this._physicsWorld.addRigidBody(body);
    });

    this._physicsWorld.stepSimulation(delta, 4, 1 / 60);

    const entities = this.queries.entities.results;
    for (let i = 0, il = entities.length; i < il; i++) {
      const entity = entities[i];
      const rigidBody = entity.getComponent(RigidBody);

      if (rigidBody.weight === 0.0) continue;

      const object = entity.getComponent(Object3D).object;
      const body = object.userData.body;
      const transform = this._transform;
      const q = this._quaternion;

      body.getMotionState().getWorldTransform(transform);
      const o = transform.getOrigin();
      transform.getBasis().getRotation(q);

      // Update instance's position and quaternion
      object.position.set(o.x(), o.y(), o.z());
      object.quaternion.set(q.x(), q.y(), q.z(), q.w());

      // @todo Create transform component to sync object & component
      let transformComponent = entity.getMutableComponent(Transform);
      transformComponent.position.copy(object.position);
      transformComponent.rotation.copy(object.rotation);
    }

    this.queries.entities.removed.forEach(entity => {
      this._removeRigidBody(entity);
    });
  }

  _removeRigidBody(entity) {
    var object = entity.getRemovedComponent(Object3D).object;
    var body = object.userData.body;
    this._physicsWorld.removeRigidBody(body);
    Ammo.destroy(body);
    delete object.userData.body;
  }

  _createWorld() {
    const config = new Ammo.btDefaultCollisionConfiguration();
    const dispatcher = new Ammo.btCollisionDispatcher(config);
    const cache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const world = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      cache,
      solver,
      config
    );
    world.setGravity(new Ammo.btVector3(0, -9.8, 0));
    // world.getSolverInfo().set_m_numIterations(10);

    return world;
  }

  _createShape(entity) {
    var shape = entity.getComponent(Shape);
    if (shape.primitive === "box") {
      return new Ammo.btBoxShape(
        new Ammo.btVector3(shape.width / 2, shape.height / 2, shape.depth / 2)
      );
    }
    if (shape.primitive === "sphere") {
      return new Ammo.btSphereShape(shape.radius);
    }
    return new Ammo.btBoxShape(new Ammo.btVector3(1.0, 1.0, 1.0));
  }

  _createRigidBody(entity) {
    const rigidBody = entity.getComponent(RigidBody);
    const transform = entity.getComponent(Transform);

    const shape = this._createShape(entity);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(rigidBody.weight, localInertia);
    const form = new Ammo.btTransform();
    form.setIdentity();
    form.setOrigin(
      new Ammo.btVector3(
        transform.position.x,
        transform.position.y,
        transform.position.z
      )
    );

    euler.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
    quaternion.setFromEuler(euler);

    form.setRotation(
      new Ammo.btQuaternion(
        quaternion.x,
        quaternion.y,
        quaternion.z,
        quaternion.w
      )
    );

    const state = new Ammo.btDefaultMotionState(form);
    const info = new Ammo.btRigidBodyConstructionInfo(
      rigidBody.weight,
      state,
      shape,
      localInertia
    );
    return new Ammo.btRigidBody(info);
  }

  _setupRigidBody(body, entity) {
    const rigidBody = entity.getComponent(RigidBody);
    const linearVelocity = rigidBody.linearVelocity;
    body.setRestitution(rigidBody.restitution);
    body.setFriction(rigidBody.friction);
    body.setDamping(rigidBody.linearDamping, rigidBody.angularDamping);
    body.setSleepingThresholds(0, 0);
    body.setLinearVelocity(
      new Ammo.btVector3(linearVelocity.x, linearVelocity.y, linearVelocity.z)
    );
    return body;
  }
}

PhysicsSystem.queries = {
  entities: {
    components: [RigidBody, Shape, Object3D],
    listen: {
      added: true,
      removed: true
    }
  }
};
