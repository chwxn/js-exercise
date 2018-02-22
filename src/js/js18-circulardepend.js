//参见 src/ts/circulardepend

import {foo} from './tmp/b.js';
console.log(foo);
setTimeout(()=>console.log(foo),500);
