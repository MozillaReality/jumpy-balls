import {World} from 'http://192.168.1.129:8080/build/ecsy.module.js';
import {Geometry, Transform, Draggable, ThreeContext, VRController, Target, GameState, Active, Object3D, BallGenerator, RigidBody} from './components.mjs';
import {TargetSystem, GeometrySystem, FloorCollisionSystem, PhysicsSystem, BallGeneratorSystem, BallSystem} from './systems.mjs';

Ammo().then(_ => {
  const world = new World();

  var group = new THREE.Group();
  var raycaster, controller1, controller2;
  var tempMatrix = new THREE.Matrix4();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x808080 );
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

  world
    .registerSystem(BallGeneratorSystem)
    .registerSystem(BallSystem)
    //.registerSystem(VRControllerSystem)
    .registerSystem(GeometrySystem)
    .registerSystem(TargetSystem)
    .registerSystem(FloorCollisionSystem)
    .registerSystem(PhysicsSystem);
  world
    .registerSingletonComponent(ThreeContext)
    .registerSingletonComponent(GameState);

  var gen = world.createEntity().addComponent(BallGenerator, {position: {x: 1, y: 4, z: 0}}).addComponent(Active);

  var cameraRig = new THREE.Group();
  cameraRig.add(camera);
  cameraRig.position.set(2,2,5);
  scene.add(cameraRig);

  const renderer = new THREE.WebGLRenderer();

  world.components.threeContext.renderer = renderer;
  world.components.threeContext.scene = scene;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  //renderer.vr.enabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(WEBVR.createButton(renderer));
  window.addEventListener('resize', onWindowResize, false);
  const clock = new THREE.Clock();

  init();
  function init() {

      scene.add( new THREE.HemisphereLight( 0x808080, 0x606060 ) );

      var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 0, 6, 0 );
      light.castShadow = true;
      light.shadow.camera.top = 2;
      light.shadow.camera.bottom = - 2;
      light.shadow.camera.right = 2;
      light.shadow.camera.left = - 2;
      light.shadow.mapSize.set( 4096, 4096 );
      scene.add( light );

      scene.add(group);

      // controllers

      controller1 = renderer.vr.getController( 0 );
      controller1.addEventListener( 'selectstart', onSelectStart );
      controller1.addEventListener( 'selectend', onSelectEnd );
      cameraRig.add( controller1 );

      controller2 = renderer.vr.getController( 1 );
      controller2.addEventListener( 'selectstart', onSelectStart );
      controller2.addEventListener( 'selectend', onSelectEnd );
      cameraRig.add( controller2 );

      var vrc1 = world.createEntity().addComponent(VRController, {id: 0});
      var vrc2 = world.createEntity().addComponent(VRController, {id: 1});

      //

      var geometry = new THREE.BufferGeometry().setFromPoints( [ new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, - 1 ) ] );

      var line = new THREE.Line( geometry );
      line.name = 'line';
      line.scale.z = 5;

      controller1.add( line.clone() );
      controller2.add( line.clone() );

      raycaster = new THREE.Raycaster();

      createGround();
      createBox().addComponent(Transform, {position: {x: -1, y: 2, z:0}, rotation: {x:0,y:0, z: 6}});
      createBox().addComponent(Transform, {position: {x: 1, y: 1, z:0}, rotation: {x:0,y:0, z: 0}});
      createBox().addComponent(Transform, {position: {x: 3.2, y: 0, z:0}, rotation: {x:0,y:0, z: 0}});

      createTarget();

      function createTarget() {
        world.createEntity()
          .addComponent(Target)
          .addComponent(Geometry, {primitive: 'sphere', radius: 0.8})
          .addComponent(Transform, {position: {x: 5, y: 0.8, z: 0}, rotation: {x:0,y:0,z:0}});
      }

      function reposition(object) {
        const initialTransform = new Ammo.btTransform();
        initialTransform.setIdentity();
        initialTransform.setOrigin(new Ammo.btVector3(object.position.x, object.position.y, object.position.z));
        initialTransform.setRotation( new Ammo.btQuaternion( object.quaternion.x, object.quaternion.y, object.quaternion.z, object.quaternion.w ) );

        object.userData.body.setWorldTransform(initialTransform);
      }

      function createBox() {
        var s = 0.5;
        const entity = world.createEntity();
        entity
          .addComponent(Geometry, {
            primitive: 'box',
            width: 3 * s,
            height: s,
            depth: s
          })
          .addComponent(Draggable)
          .addComponent(RigidBody, {
            weight: 0.0,
            restitution: 1,
            friction: 1.0,
            linearDamping: 0.0,
            angularDamping: 0.0
          });
        return entity;
      }
  }

  function onSelectStart( event ) {

    var controller = event.target;

    var intersections = getIntersections( controller );

    if ( intersections.length > 0 ) {

      var intersection = intersections[ 0 ];

      tempMatrix.getInverse( controller.matrixWorld );

      var object = intersection.object;
      object.matrix.premultiply( tempMatrix );
      object.matrix.decompose( object.position, object.quaternion, object.scale );
      object.material.emissive.b = 1;
      controller.add( object );

      reposition(object);

      controller.userData.selected = object;

    }

  }

  function onSelectEnd( event ) {

    var controller = event.target;

    if ( controller.userData.selected !== undefined ) {

      var object = controller.userData.selected;
      object.matrix.premultiply( controller.matrixWorld );
      object.matrix.decompose( object.position, object.quaternion, object.scale );
      object.material.emissive.b = 0;
      group.add( object );
      reposition(object);

      controller.userData.selected = undefined;

    }


  }

  function getIntersections( controller ) {

    tempMatrix.identity().extractRotation( controller.matrixWorld );

    raycaster.ray.origin.setFromMatrixPosition( controller.matrixWorld );
    raycaster.ray.direction.set( 0, 0, - 1 ).applyMatrix4( tempMatrix );

    return raycaster.intersectObjects( group.children );

  }

  function createGround() {
    world.createEntity()
      .addComponent(Geometry, {
            primitive: 'box',
            width: 500,
            height: 0.1,
            depth: 500
      })
      .addComponent(RigidBody, {
        weight: 0.0,
        restitution: 1.0,
        friction: 1.0,
        linearDamping: 0.0,
        angularDamping: 0.0
      });
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    world.execute(clock.getDelta(), clock.elapsedTime);
    renderer.render(scene, camera);
  }
});
