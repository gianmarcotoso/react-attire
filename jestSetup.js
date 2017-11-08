// setup file
const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

global.requestAnimationFrame = cb => {
	setTimeout(cb, 0)
}
