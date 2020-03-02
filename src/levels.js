const METAL = 0;
const RUBBER = 1;
const WOOD = 2;
const STATIC = 3;

export const levels = [
  // 1
  {
    targets: [{
        position: { x: 0.7, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -0.7, y: 1, z: 0 },
        linearVelocity: { x: 2, y: 2, z: 0 }
    }],
    elements: [
      {
        type: RUBBER,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 2
  {
    targets: [{
        position: { x: 0.7, y: 0.7, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -0.6, y: 1.2, z: 0 },
        linearVelocity: { x: 0.6, y: 2.8, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: -0.3, y: 0.5, z: 0 },
        rotation: { x: -0.1, y: 0, z: -0.2 }
      },
      {
        type: WOOD,
        position: { x: 0.1, y: 0.75, z: -0.2 },
        rotation: { x: -0.3, y: 0.1, z: 1.1 }
      }
    ]
  },
  // 3
  {
    targets: [{
        position: { x: 0.5, y: 1.4, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -0.5, y: 1, z: 0 },
        linearVelocity: { x: 1, y: -2, z: 0 }
    }],
    elements: [
      {
        type: METAL,
        position: { x: -0.1, y: 1, z: 0 },
        rotation: { x: 0.2, y: 0.3, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: 0.4, y: 0.95, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: -0.2, y: 1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.4, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 4
  {
    targets: [{
        position: { x: 0.6, y: 1.4, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -0.7, y: 1, z: 0 },
        linearVelocity: { x: 2, y: -1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0.3, y: 0.7, z: 0 },
        rotation: { x: -0.2, y: 0.5, z: -2 }
      },
      {
        type: RUBBER,
        position: { x: -0.5, y: 0.8, z: 0 },
        rotation: { x: 1.4, y: 1.4, z: -1.5 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.5, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 5
  {
    targets: [{
        position: { x: 0.1, y: 1.6, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 0, y: 0.4, z: 0 },
        linearVelocity: { x: -3, y: 0.5, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0.1, y: 0.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: 1, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: -0.22, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.22, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.44, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 6
  {
    targets: [{
        position: { x: 0.6, y: 1.6, z: 0 },
        rotation: { x: Math.PI / 2, y: 0.3, z: 0 }
    }],
    generators: [{
        position: { x: -1.4, y: 1, z: 0 },
        linearVelocity: { x: 2, y: 2, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0.4, y: 0.5, z: 0 },
        rotation: { x: 0.08, y: 0, z: 0.2 }
      },
      {
        type: RUBBER,
        position: { x: 0.6, y: 0.7, z: 0 },
        rotation: { x: 0.3, y: 0, z: -0.1 }
      },
      {
        type: RUBBER,
        position: { x: -0.5, y: 0.96, z: 0 },
        rotation: { x: 0.5, y: 0, z: 0.7 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 7
  {
    targets: [{
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 0.8, y: 1.7, z: 0 },
        linearVelocity: { x: -0.4, y: 3, z: 0 }
    }],
    elements: [
      {
        type: METAL,
        position: { x: -0.7, y: 1.5, z: 0 },
        rotation: { x: 0.2, y: 0, z: -0.3 }
      },
      {
        type: WOOD,
        position: { x: 0.6, y: 0.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0.6 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.4, z: 0 },
        rotation: { x: 0.1, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.4, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: -0.4, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: -0.2, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: -0.2, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.2, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0.2, y: 0.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 8
  {
    targets: [{
        position: { x: -0.5, y: 1.9, z: 0 },
        rotation: { x: Math.PI / 2, y: 0, z: 0 }
    }],
    generators: [{
        position: { x: -0.25, y: 0.75, z: 0 },
        linearVelocity: { x: 3, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0.8, y: 1.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: -0.4, y: 0.67, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.8, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.2, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.4, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.8, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.6, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.4, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.2, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.0, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.8, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.4, z: 0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.8, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.6, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.4, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.2, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1.0, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.8, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.6, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 0.4, z: -0.2 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 9
  {
    targets: [{
        position: { x: 1.2, y: 1.7, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -1.2, y: 0.8, z: 0 },
        linearVelocity: { x: 2, y: 2, z: 1.5 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: METAL,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  },
  // 10
  {
    targets: [{
        position: { x: 1.2, y: 0.8, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: -1.2, y: 1.7, z: 0 },
        linearVelocity: { x: 0.4, y: 1, z: -1.5 }
    }],
    elements: [
      {
        type: WOOD,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: WOOD,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: METAL,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: RUBBER,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      },
      {
        type: STATIC,
        position: { x: 0, y: 1, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
      }
    ]
  }

];
