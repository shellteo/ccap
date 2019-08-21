const moment = require('moment');
function toUnixTimestamp(v) {
  let result = new Date(v);
  return Math.round(result / 1000)
}

console.log(toUnixTimestamp('1970-01-01 08:00:00'));
console.log(moment('1970-01-01 08:00:00').unix());

console.log(Boolean(1));
let s = `<p class="message">The Ovato team informed us that they have remade the sale model and there will be no ICO.↵</p>`
console.log(s.length);
