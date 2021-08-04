import './css/test.css'
import './css/test.scss'
import {add} from './modular/esm'
const {sub} = require('./modular/common')
const mult = require('./modular/amd')

console.log("add(20, 30) = ", add(20, 30))
console.log("sub(20, 30) = ", sub(20, 30))
console.log("mult(20, 30) = ", mult(20, 30))
console.log("lodash: ", _)