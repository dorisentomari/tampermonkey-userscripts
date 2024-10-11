import * as _ from 'lodash';
import * as $ from 'jquery';

declare global {
  interface Window {
    tankUtils: any;

    lodash: typeof _;
    _: typeof _;

    $: typeof $;
    jQuery: typeof $;
  }
}

export {};
