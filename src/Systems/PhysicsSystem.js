/* global  Ammo */
import * as THREE from "three";
import { System } from "ecsy";
import {
  Transform,
  Shape,
  Ball,
  Colliding,
  CollisionStart,
  CollisionStop,
  Object3D,
  RigidBody
} from "../Components/components.js";

var quaternion = new THREE.Quaternion();
var euler = new THREE.Euler();

export class PhysicsSystem extends System {
  init() {
    this.epsilon = 10e-6;
    this.collisions = new Map();
    this.collisionKeys = [];
    this.frame = 0;

    this._physicsWorld = this._createWorld();
    this._transform = new Ammo.btTransform();
    this._quaternion = new Ammo.btQuaternion(0, 0, 0, 1);

    this.bodyToEntity = new Map();
  }

  execute(delta) {
    this.frame++;

    this.queries.entities.added.forEach(entity => {
      var object = entity.getComponent(Object3D).value;
      const body = this._setupRigidBody(this._createRigidBody(entity), entity);

      body.setCcdMotionThreshold(0.01);
      body.setCcdSweptSphereRadius(0.01);

      body.object3D = object;
      object.userData.body = body;
      this._physicsWorld.addRigidBody(body);
    });

    this._physicsWorld.stepSimulation(delta, 4, 1 / 60);
    /*
    for (let k = 0; k < this.collisionKeys.length; k++) {
      this.collisions.get(this.collisionKeys[k]).length = 0;
    }
    */

    this.queries.collisionsStart.results.forEach(entity => {
      entity.removeComponent(CollisionStart);
    });

//    this.collisions.clear();

    const numManifolds = this.dispatcher.getNumManifolds();
    for (let i = 0; i < numManifolds; i++) {
      const persistentManifold = this.dispatcher.getManifoldByIndexInternal(i);
      const numContacts = persistentManifold.getNumContacts();
      const body0ptr = Ammo.getPointer(persistentManifold.getBody0());
      const body1ptr = Ammo.getPointer(persistentManifold.getBody1());

      for (let j = 0; j < numContacts; j++) {
        const manifoldPoint = persistentManifold.getContactPoint(j);
        const distance = manifoldPoint.getDistance();
        if (distance <= this.epsilon) {
          let entity0 = this.bodyToEntity.get(body0ptr);
          let entity1 = this.bodyToEntity.get(body1ptr);
          if (!entity0.hasComponent(Colliding)) {
            entity0.addComponent(Colliding, { collidingFrame: this.frame });
            entity0.addComponent(CollisionStart);
          }

          let colliding = entity0.getMutableComponent(Colliding);
          if (colliding.collidingWith.indexOf(entity1) === -1) {
            colliding.collidingWith.push(entity1);
          }
          break;
        }
      }
    }

    const entities = this.queries.entities.results;
    for (let i = 0, il = entities.length; i < il; i++) {
      const entity = entities[i];
      const rigidBody = entity.getComponent(RigidBody);

      if (rigidBody.weight === 0.0) continue;

      const object = entity.getComponent(Object3D).value;
      const body = object.userData.body;
      if (body.isActive() && body.getMotionState()) {
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
    }

    this.queries.entities.removed.forEach(entity => {
      this._removeRigidBody(entity);
    });

    this.queries.collisionsStop.results.forEach(entity => {
      //console.log("Colliding!", entity.id, entity.getComponent(Colliding));
      entity.removeComponent(CollisionStop);
    });

    this.queries.collisions.results.forEach(entity => {
      let colliding = entity.getComponent(Colliding);
      if (colliding.collidingFrame !== this.frame) {
        // console.log("Collision out!");
        entity.removeComponent(Colliding);
        entity.addComponent(CollisionStop);
      } else {
        // console.log("Colliding!", entity.id, entity.getComponent(Colliding));
      }
    });
  }

  _removeRigidBody(entity) {
    var component = entity.getRemovedComponent(Object3D);
    if (component) {
      let object = component.value;
      var body = object.userData.body;
      this._physicsWorld.removeRigidBody(body);
      this.bodyToEntity.delete(Ammo.getPointer(body));
      Ammo.destroy(body);
      delete object.userData.body;
    } else {
      console.warn(">>>>>>>>>>>>>>> Not found");
    }
  }

  _createWorld() {
    const config = new Ammo.btDefaultCollisionConfiguration();
    this.dispatcher = new Ammo.btCollisionDispatcher(config);
    const cache = new Ammo.btDbvtBroadphase();
    const solver = new Ammo.btSequentialImpulseConstraintSolver();
    const world = new Ammo.btDiscreteDynamicsWorld(
      this.dispatcher,
      cache,
      solver,
      config
    );
    //world.setGravity(new Ammo.btVector3(0, -9.8, 0));
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
    var body = new Ammo.btRigidBody(info);
    this.bodyToEntity.set(Ammo.getPointer(body), entity);

    return body;
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
  },

  collisions: {
    components: [Colliding],
    listen: {
      added: true
    }
  },
  collisionsStart: {
    components: [CollisionStart],
    listen: {
      added: true
    }
  },
  collisionsStop: {
    components: [CollisionStop],
    listen: {
      added: true
    }
  }
};
