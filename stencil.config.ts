import {Config} from '@stencil/core';
import {generateComponentDocs} from './docs/generator';

export const config: Config = {
  namespace: 'vff-controller',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-custom',
      generator: generateComponentDocs
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
