export const GRID_SIZE = 12;

export const FACTORY_DATA = [
  {
    id: 'f1',
    name: 'Apex Textiles',
    industry: 'Manufacturing',
    output: 'Cotton',
    input: 'Wool',
    x: 2,
    y: 2,
    color: '#ec4899',
    icon: 'shirt',
    efficiency: 87,
    storage: 45
  },
  {
    id: 'f1b',
    name: 'Beta Weave',
    industry: 'Manufacturing',
    output: 'Cotton',
    input: 'Wool',
    x: 3,
    y: 3,
    color: '#be185d',
    icon: 'shirt',
    efficiency: 92,
    storage: 60
  },
  {
    id: 'f2',
    name: 'Horizon Furniture',
    industry: 'Manufacturing',
    output: 'Sawdust',
    input: 'Cotton',
    x: 2,
    y: 9,
    color: '#f59e0b',
    icon: 'sofa',
    efficiency: 78,
    storage: 80
  },
  {
    id: 'f3',
    name: 'BioGen Power',
    industry: 'Energy',
    output: 'Ash',
    input: 'Sawdust',
    x: 9,
    y: 9,
    color: '#10b981',
    icon: 'zap',
    efficiency: 95,
    storage: 15
  },
  {
    id: 'f4',
    name: 'Titan Smelting',
    industry: 'Manufacturing',
    output: 'Steel',
    input: 'Ash',
    x: 9,
    y: 2,
    color: '#6366f1',
    icon: 'anvil',
    efficiency: 82,
    storage: 55
  },
  {
    id: 'f5',
    name: 'Crystal Optics',
    industry: 'Tech',
    output: 'Glass',
    input: 'Steel',
    x: 5,
    y: 5,
    color: '#06b6d4',
    icon: 'glasses',
    efficiency: 91,
    storage: 30
  },
  {
    id: 'f6',
    name: 'Omega Circuits',
    industry: 'Tech',
    output: 'Silicon',
    input: 'Glass',
    x: 8,
    y: 6,
    color: '#8b5cf6',
    icon: 'cpu',
    efficiency: 96,
    storage: 20
  },
  {
    id: 'f7',
    name: 'ReCycle Hub',
    industry: 'Recycling',
    output: 'Plastic',
    input: 'Silicon',
    x: 6,
    y: 1,
    color: '#84cc16',
    icon: 'recycle',
    efficiency: 88,
    storage: 75
  }
];

export const INITIAL_LOGS = [
  { id: '1', timestamp: '09:00:00', message: 'CityOS Kernel v6.0.4 initialized.', category: 'SYSTEM' },
  { id: '2', timestamp: '09:00:01', message: 'Market liquidity pools established.', category: 'SYSTEM' }
];
