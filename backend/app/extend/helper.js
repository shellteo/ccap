'use strict';

module.exports = {
  nowUnixTime() {
    return Math.round(new Date().getTime() / 1000);
  },
};
