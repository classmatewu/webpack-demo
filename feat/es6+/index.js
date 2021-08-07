export default () => {
  const obj = {a: 1, b: 2}
  const {a, b} = obj
  console.log(`es6+ test: ${a}${b}`)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("---setTimeout---");
      resolve('---Promise---')
    }, 1000)
  })
}