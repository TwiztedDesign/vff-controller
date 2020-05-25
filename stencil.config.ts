import {Config} from '@stencil/core';
import {generateReadme} from './docs/docs-generator';

export const config: Config = {
  namespace: 'vff-controller',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-custom',
      generator: generateReadme
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
