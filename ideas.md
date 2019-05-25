Events
- Components -> loop systems
- Components -> Event handlers at the end
- Event dispatcher

A *   *<-
B ->
C *<- -
D *<- -
----  ----

A <- ->
B ->->
C <-
D <-
----    ----

```javascript
return {
  queries: {
    spheres: { components: [Sphere, Active, Material] },
    boxes: { components: [Box, Active] }
  },
  events: {
    ballCollided: 'OnBallCollided'
  }
};

//

execute() {
  // Queries
  this.queries.spheres.forEach(entity => {});
  this.queries.boxes.forEach(entity => {});

  // Events
  this.events.ballCollided.forEach(event => {});
}


return {
  queries: {
    spheres: {
      components: [Sphere, Active, Material]
      events: {
        sphereAdded: {
          event: 'EntityAdded'
        },
        sphereRemoved: {
          event: 'EntityRemoved'
        },
        sphereChanged: {
          event: 'ComponentChanged'
        },
        sphereActiveComponentChanged: {
          event: 'ComponentChanged',
          components: [Active]
        },
        sphereActiveMaterialChanged: {
          event: 'ComponentChanged',
          components: [Active, Material]
        },
        entitiesAdded: {
          event: 'EntityAdded'
        }
      }
    },
    boxes: {
      components: [Box, Active]
    }
  },
  events: {
    ballCollided: 'OnBallCollided'
  }
};

return {
  queries: {
    spheres: {
      components: [Sphere, Active, Material]
      events: [EntityAdded, EntityRemoved, EntityChanged, ActiveComponentChanged, ActiveMaterialComponentsChanged ]
    },
    boxes: {
      components: [Box, Active]
    }
  },
  events: {
    ballCollided: 'OnBallCollided'
  }
};

execute() {
  // ...
  // Events
  this.events.spheresAdded.forEach(events => {});
  this.events.spheresRemoved.forEach(events => {});
  this.events.spheresChanged.forEach(events => {});
  this.events.spheresActiveComponentChanged.forEach(events => {});
  this.events.spheresActiveMaterialComponentsChanged.forEach(events => {});




execute() {
  // Queries
  this.queries.spheres.forEach(entity => {});
  this.queries.boxes.forEach(entity => {});

  // Events
  this.events.ballCollided.forEach(event => {});

  // Events from queries
  this.events.sphereChanged.forEach(event => {});
  this.events.sphereActiveComponentChanged.forEach(event => {});
  this.events.entitiesAdded.forEach(event => {});  
}

```


```javascript
export class BallGeneratorSystem extends System {
  init() {
    return {
      queries: {
        spheres: [Sphere],
        boxes: [Box]
      },
      events: {
        ballCollided: {}
      }
    }
  }

  execute() {
    this.events.ballCollided.forEach(event => {

    });
  }
}
```

# Initialize system with static values?
  * It could just be a sintactic sugar to create a singleton component with the system's name ?

```javascript
world.registerSystem(PhysicsSystem, {debug: true});
world.components.physicsSystem.debug = true;

world.registerSingletonComponent(ThreeContext)
world.components.threeContext.scene = null;

```

# Handler for entityAdded when multiple queries?

```javascript
export class BallGeneratorSystem extends ReactiveSystem {
  init() {
    return {
      queries: {
        spheres: {
          components: [Sphere, Active, Material]
          events: {
            sphereChanged: {
              event: 'ComponentChanged'
            },
            sphereActiveComponentChanged: {
              event: 'ComponentChanged',
              components: [Active]
            }
          }
        },
        boxes: {
          components: [Box, Active]
        }
      },


      events: // out of the queries
      {}

      events: {
        sphereChanged: {
          event: 'ComponentChange',
          query: spheres
        },
        sphereActiveComponentChanged: {
          event: 'ComponentChange',
          query: spheres,
          components: [Active]
        },
        sphereAdded: {
          event: 'Added',
          query: 'sphere'
        },
        sphereRemoved: {
          event: 'Removed',
          query: 'boxes'
        }
      }
    }

    return {
      queries: {
        spheres: [Sphere, Active, Material],
        boxes: [Box, Active]
      },
      events: {
        sphereChanged: {
          event: 'ComponentChange',
          query: spheres
        },
        sphereActiveComponentChanged: {
          event: 'ComponentChange',
          query: spheres,
          components: [Active]
        },
        sphereAdded: {
          event: 'Added',
          query: 'sphere'
        },
        sphereRemoved: {
          event: 'Removed',
          query: 'boxes'
        }
      }
    }
  }

  // 1

  onSpheresAdded() {}
  onBoxesAdded() {}

  // 2

  onEntitiesAdded(Query) {
    this.queries[Query].added.forEach(...)

  }

  // 3

  execute() {
    this.queries.spheres.forEach()
    this.queries.boxes.forEach()

    this.queries.sphereAdded.forEach()

    this.eventQueue.spheresAdded.forEach(...)

  }
```


```javascript
class TestReactiveSystem extends System {
  init() {
    return {
      queries: {
        entities:
        {
          components: [Rotating, Transform],
          events: {
            added: {
              event: "EntityAdded"
            },
            removed: {
              event: "EntityRemoved"
            },
            changed: {
              event: "EntityChanged"
            },
            rotatingChanged: {
              event: "ComponentChanged",
              components: [Rotating]
            },
            transformChanged: {
              event: "ComponentChanged",
              components: [Transform]
            }
          }
        }
      },
      events: {
        onCollided: "SphereCollided"
      }
    };
  }

  execute(delta) {
    // = onEntitiesAdded
    if (this.events.entities.added.length > 0) {
      console.log('OnAdded', this.events.entities.added);
    }

    // = onEntitiesRemoved
    if (this.events.entities.removed.length > 0) {
      console.log('OnRemoved', this.events.entities.removed);
    }

    // = onEntityChanged
    if (this.events.entities.changed.length > 0) {
      console.log('OnChanged entity', this.events.entities.changed);
    }

    // Rotating changed
    if (this.events.entities.rotatingChanged.length > 0) {
      console.log('OnChanged Rotating', this.events.entities.rotatingChanged);
    }

    // Transform changed
    if (this.events.entities.transformChanged.length > 0) {
      console.log('OnChanged Transform', this.events.entities.transformChanged);
    }


    // Events on collide
    if (this.events.onCollided.length > 0) {
      console.log('OnCollided Event', this.events.onCollided);
    }
  }
}
```