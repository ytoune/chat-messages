import './fix'

import React from 'react'
import { render } from 'react-dom'

import { App } from './App'
import { readFile } from './talk'

const main = () => {
	readFile('./story.yaml')
	render(<App />, document.getElementById('screen'))
}

Promise.resolve()
	.then(main)
	.catch(console.log.bind(console))
