define(function(require, factory) {
  'use strict';
  const _ = require('lodash')
  console.log("_: ", _)
  function mult(a, b) {
    return a * b
  }
  return mult
});