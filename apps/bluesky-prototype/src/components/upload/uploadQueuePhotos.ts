import type { ImageSourcePropType, ImageStyle } from 'react-native';

const treeImage1 = require('../../../assets/home/raw_image_1.png');
const treeImage2 = require('../../../assets/home/queue-field-tree.png');
const treeImage3 = require('../../../assets/home/queue-round-shrub.png');
const treeImage4 = require('../../../assets/home/raw_image_9.png');
const treeImage5 = require('../../../assets/home/raw_image_10.png');

export const UPLOAD_IMAGES: ImageSourcePropType[] = [
  treeImage1,
  treeImage2,
  treeImage3,
  treeImage4,
  treeImage5
];

// Preserve existing crops only for unchanged photos; new samples use cover.
export const PHOTO_CROPS: (ImageStyle | undefined)[] = [
  { width: '102.78%', height: '137.66%', left: '-2.78%', top: '-11.44%' },
  undefined,
  undefined,
  undefined,
  { width: '150.4%', height: '99.98%', left: '-20.06%', top: '0%' }
];

export const QUEUED_IMAGES = [
  ...UPLOAD_IMAGES,
  require('../../../assets/home/raw_image_2.png'),
  require('../../../assets/home/queue-park-tree.png'),
  require('../../../assets/home/queue-path-tree.png'),
  require('../../../assets/home/queue-young-tree.png'),
  require('../../../assets/home/queue-forest-tree.png'),
  require('../../../assets/home/queue-street-tree.png'),
  require('../../../assets/home/queue-garden-tree.png')
];

// Decode small previews in the strip/grid; tree details retain the originals.
export const QUEUE_THUMBNAILS = new Map<ImageSourcePropType, ImageSourcePropType>([
  [treeImage1, require('../../../assets/home/queue-thumb-1.jpg')],
  [treeImage2, require('../../../assets/home/queue-thumb-2.jpg')],
  [treeImage4, require('../../../assets/home/queue-thumb-4.jpg')],
  [treeImage5, require('../../../assets/home/queue-thumb-5.jpg')],
  [QUEUED_IMAGES[5], require('../../../assets/home/queue-thumb-6.jpg')]
]);

