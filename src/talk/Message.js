
import React from 'react'
import { of } from 'rxjs'

export const Message = (vars, text) => of(
	<p>{text.replace(/__([a-zA-Z0-9]+)__/gui, (_, name) => vars[name])}</p>
)
