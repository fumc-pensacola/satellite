"use strict";

function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

module.exports = function(from, to) {
  return Array.from(range(from, to));
};
