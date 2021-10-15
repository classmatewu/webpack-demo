import Vue from 'vue'
import './feat/css/test.css'
import './feat/css/test.scss'
import {
  add
} from './feat/modular/esm'
import HelloVue from './src/HelloVue.vue'
const {
  sub
} = require('./feat/modular/common')
const mult = require('./feat/modular/amd')
const promiseFn = require('./feat/es6+/index')

console.log("add(20, 30) = ", add(20, 30))
console.log("sub(20, 30) = ", sub(20, 30))
console.log("mult(20, 30) = ", mult(20, 30))
console.log("lodash: ", _)
// await promiseFn()
console.log("---promiseFn---", promiseFn);
console.log("---vue---", HelloVue);

new Vue({
  render: h => h(HelloVue)
}).$mount('#app')

Promise.resolve(Promise.reject())
  .then()
  .then()
  .then(() => {
    console.log(1)
  }, () => {
    console.log(2)
  })
