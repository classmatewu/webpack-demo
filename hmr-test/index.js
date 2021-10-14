/**
 * @description 有一个按钮，每一次点击它，页面就会多一个tag，并且偶数个tag会有特殊的背景色
 */
import './index.css'

const btn = document.createElement('button')
btn.innerHTML = 'new tag'
document.body.appendChild(btn)
btn.addEventListener('click', () => {
  const div = document.createElement('div')
  div.innerHTML = 'I am a tag'
  document.body.appendChild(div)
})

if (module.hot) {
  module.hot.accept('./index.css', () => {
    console.log(111);
  })
}