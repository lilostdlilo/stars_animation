export interface Planet {
  id: string;
  name: string;
  nameEn: string;
  color: string;
  size: number; // 相对大小（像素）
  orbitRadius: number; // 轨道半径（像素）
  orbitalPeriod: number; // 公转周期（地球年）
  distanceFromSun: number; // 与太阳的距离（百万公里）
  diameter: number; // 直径（公里）
  description: string;
  emoji: string;
  speed: number; // 动画速度因子
}

export const planets: Planet[] = [
  {
    id: 'mercury',
    name: '水星',
    nameEn: 'Mercury',
    color: '#b5b5b5',
    size: 8,
    orbitRadius: 70,
    orbitalPeriod: 0.24,
    distanceFromSun: 57.9,
    diameter: 4879,
    description: '太阳系中最小的行星，也是距离太阳最近的行星。表面温度变化极大，白天可达430°C，夜间降至-180°C。',
    emoji: '☿',
    speed: 4.15,
  },
  {
    id: 'venus',
    name: '金星',
    nameEn: 'Venus',
    color: '#e8cda0',
    size: 14,
    orbitRadius: 105,
    orbitalPeriod: 0.62,
    distanceFromSun: 108.2,
    diameter: 12104,
    description: '太阳系中最热的行星，浓密的二氧化碳大气层产生强烈的温室效应。它是夜空中最亮的行星。',
    emoji: '♀',
    speed: 1.6,
  },
  {
    id: 'earth',
    name: '地球',
    nameEn: 'Earth',
    color: '#4da6ff',
    size: 15,
    orbitRadius: 145,
    orbitalPeriod: 1.0,
    distanceFromSun: 149.6,
    diameter: 12742,
    description: '我们的家园，太阳系中唯一已知存在生命的行星。拥有液态水和适宜的大气层。',
    emoji: '🌍',
    speed: 1.0,
  },
  {
    id: 'mars',
    name: '火星',
    nameEn: 'Mars',
    color: '#e07050',
    size: 11,
    orbitRadius: 185,
    orbitalPeriod: 1.88,
    distanceFromSun: 227.9,
    diameter: 6779,
    description: '被称为"红色星球"，表面富含氧化铁。拥有太阳系最高的山峰——奥林帕斯山。',
    emoji: '♂',
    speed: 0.53,
  },
  {
    id: 'jupiter',
    name: '木星',
    nameEn: 'Jupiter',
    color: '#d4a574',
    size: 32,
    orbitRadius: 250,
    orbitalPeriod: 11.86,
    distanceFromSun: 778.5,
    diameter: 139820,
    description: '太阳系中最大的行星，质量是其他所有行星总和的2.5倍。著名的大红斑是一个持续数百年的巨型风暴。',
    emoji: '♃',
    speed: 0.084,
  },
  {
    id: 'saturn',
    name: '土星',
    nameEn: 'Saturn',
    color: '#f0d890',
    size: 27,
    orbitRadius: 320,
    orbitalPeriod: 29.46,
    distanceFromSun: 1433.5,
    diameter: 116460,
    description: '以其壮观的环系统闻名，主要由冰粒和岩石碎片组成。密度低于水，是太阳系密度最低的行星。',
    emoji: '♄',
    speed: 0.034,
  },
  {
    id: 'uranus',
    name: '天王星',
    nameEn: 'Uranus',
    color: '#7de8e8',
    size: 20,
    orbitRadius: 385,
    orbitalPeriod: 84.01,
    distanceFromSun: 2872.5,
    diameter: 50724,
    description: '一颗冰巨星，自转轴几乎平行于公转平面，像是"躺着"绕太阳运行。大气中含有甲烷使其呈蓝绿色。',
    emoji: '♅',
    speed: 0.012,
  },
  {
    id: 'neptune',
    name: '海王星',
    nameEn: 'Neptune',
    color: '#4466ff',
    size: 19,
    orbitRadius: 440,
    orbitalPeriod: 164.8,
    distanceFromSun: 4495.1,
    diameter: 49244,
    description: '太阳系中距离太阳最远的行星，拥有太阳系中最强的风速，可达每小时2100公里。',
    emoji: '♆',
    speed: 0.006,
  },
];
