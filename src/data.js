import { v4 as uuid } from 'uuid';

export const defaultPost = {
  id: uuid(),
  media:
    'https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/01000/opgs/edr/fcam/FLB_486265257EDR_F0481570FHAZ00323M_.JPG',
};

export const options_rover = [
  { value: 'curiosity', name: 'Curiosity' },
  { value: 'opportunity', name: 'Opportunity' },
  { value: 'spirit', name: 'Spirit' },
];

export const options_date = [
  { value: 'earth', name: 'Earth Date' },
  { value: 'sol', name: 'Sol' },
];

export const options_cameras = [
  { value: 'all', name: 'All Cameras' },
  { value: 'fhaz', name: 'FHAZ' },
  { value: 'rhaz', name: 'RHAZ' },
  { value: 'mast', name: 'MAST' },
  { value: 'chemcam', name: 'CHEMCAM' },
  { value: 'mahli', name: 'MAHLI' },
  { value: 'mardi', name: 'MARDI' },
  { value: 'navcam', name: 'NAVCAM' },
  { value: 'pancam', name: 'PANCAM' },
  { value: 'minites', name: 'MINITES' },
];
