export const levels = [
  {
    targets: [],
    generators: [],
    elements: []
  },
  {
    targets: [
      {
        position: { x: 1.5, y: 0.8, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
      }
    ],
    generators: [
      {
        position: { x: 1, y: 2.5, z: 0 },
        linearVelocity: { x: -2, y: 3.5, z: 0 }
      }
      //{ position: { x: -1, y: 1, z: 0 } }
    ],
    elements: [
      {
        type: 2,
        position: { x: -0.75, y: 1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 6 }
      },
      {
        type: 0,
        position: { x: -0.2, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: -0.3 }
      },
      {
        type: 1,
        position: { x: 0.5, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 1,
        position: { x: 1, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 3,
        position: { x: 0.6, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      }
    ]
  },
  {
    targets: [
      {
        position: { x: 2, y: 1.8, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
      }
    ],
    generators: [
      {
        position: { x: -1, y: 1.5, z: 0 },
        linearVelocity: { x: 2, y: 3.5, z: 0 }
      }
      //{ position: { x: -1, y: 1, z: 0 } }
    ],
    elements: [
      {
        type: 1,
        position: { x: 1.5, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 1,
        position: { x: 1, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      },
      {
        type: 3,
        position: { x: 0.6, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0.1 }
      }
    ]
  }
];
