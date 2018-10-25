
import React from 'react'
import { render } from 'react-dom'

import { App } from './App'
import { pushPart } from './subjects/part'

const main = () => {

	fetch('./story.json')
		.then(r => r.json())
		.then(book => pushPart(book))

	render(<App/>, document.getElementById('screen'))

}

Promise.resolve().then(main).catch(console.log.bind(console))
