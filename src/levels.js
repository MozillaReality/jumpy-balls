const METAL = 0;
const RUBBER = 1;
const WOOD = 2;
const STATIC = 3;

export const levels = [
  // 1
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
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
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
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
  // 3
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
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
      }
    ]
  },
  // 4
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
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
      }
    ]
  },
  // 5
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
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
      }
    ]
  },
  // 6
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
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
  // 7
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
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
  // 8
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
    }],
    elements: [
      {
        type: WOOD,
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
  // 9
  {
    targets: [{
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
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
        position: { x: 1.4, y: 1, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 }
    }],
    generators: [{
        position: { x: 1.4, y: 1, z: 0 },
        linearVelocity: { x: 1, y: 1, z: 0 }
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
