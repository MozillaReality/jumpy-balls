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


EntityAdded
EntityRemoved
EntityChanged
ComponentChanged
ComponentAdded
ComponentRemoved

* Singleton systems? That have just 1 component instance (Environment eg)
* Create singleton components for systems if used: world.registerSystem(SystemA, {value: A}) => world.components.systemA.value = A
* Register systems as dependencies (eg: environment needs Sky, but maybe the user has not registered it yet)
* Show error/warning when the JSON queries/events doesn't validate

```javascript
// We need to ensure that every system will get the entity with the component's data when
// calling execute (events.query.componentChanged)
function removeComponent(entity, component) {
  // 1. Update queues correctly, by removing the entity from them if needed
  // 2. Queue the REMOVE_COMPONENT event on each system's queries queues
  // 3. Push it to the REMOVE_NEXT_FRAME queue? so in the next frame this will get
  //    properly removed -> returned to the pool and freeze all the resources
}

function removeEntity(entity) {
  entity.components.forEach(component => removeComponent(entity, component));

  // 1. Push it to the REMOVE_ENTITY_NEXT_FRAME
}

////

E1 = [C1, C2]
E2 = [C1, C2, C3]
E3 = [C2, C3]

SystemA.query(C3) = [E1, E2, E3]
SystemB.query(C1, C2, C3) = [E2]
SystemC.query(C2, C3) = [E2, E3]

//----

SystemB => E2.removeComponent(C2)
E1 = [C1, C2]
E2 = [C1, *C2*, C3] // *removed C2*
E3 = [C2, C3]

SystemA.removeComponentQuery.add(E2, C2);
SystemB.removeComponentQuery.add(E2, C2);
  => removeEntity.add(E2);
SystemC.removeComponentQuery.add(E2, C2);
  => removeEntity.add(E2);



StateComponents
  System::Init










SystemA [cA, cB]
SystemB [cB, cC]
  - entity1.removeComponent(cA)
    loop all system -> callback(cA)
    really delete cA

    - > SystemA.cA.removeQueue.push(cA)
  - removeEntity(entity1)
    -> SystemA.removedEntities.push(entity1)

SystemA
  for entities
    remove(entity[i]);


SystemA [cA, cB]
SystemB [cB, cC]
  - entity1.removeComponent(cA)
    - > SystemA.cA.removeQueue.push(cA)
    - > SystemC.cA.removeQueue.push(cA)
    numberOfSystemToReadThis = 2

SystemC [cA, cC]
  - loop removeQueue -> free resources
  numberOfSystemToReadThis--
------

SystemA [cA, cB]
  - loop removeQueue -> free resources
  numberOfSystemToReadThis--

  ------- remove for real cA


SystemA
SystemB
SystemC
--
SystemD *
SystemE
SystemF



queryNotCreated: [componentA, not(StateComponentA)]
queryNormal: [componentA, StateComponentA]
queryToRemove: [not(componentA), StateComponentA]

execute() {
  queryNotCreated.foreach(e => e.addStateComponent(StateComponentA)....);
  queryNormal.foreach(e => );
  queryToRemove.foreach(e => free resources, e.removeComponent(StateComponentA));
}

class ComponentRemoval {
  constructor() {
    this.Components = [];
  }
}

SystemA



SystemB
execute() {
  entities.forEach(entity => {
    ...
    entity.removeComponent(C);
    =>
    entity.addComponent(ComponentRemoval, {Components: [C]});
  });
}

...



SystemC
query: [ComponentRemoval]

execute() {
  entities.forEach(entity => {
    var component = entity.getComponent(ComponentRemoval);
    entity.removeComponent(component.Components);
  });
}
