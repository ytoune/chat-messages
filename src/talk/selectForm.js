
import React, { Component, createRef } from 'react'
import { of } from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'

import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import { Right } from '../views'

import { withStyles } from '@material-ui/core/styles'

const FormWrap = withStyles(t => ({
	root: {
		margin: t.spacing.unit,
		minWidth: 120,
		maxWidth: 300,
	}
}), {withTheme: true})(FormControl)

export const selectForm = (vars, name, _enums, ...opts) => {
	let res
	const dict = _enums.reduce((d, n) => {
		const [val, key] = Array.isArray(n) ? n : [n, n]
		return {...d, [key]: val}
	}, {})
	const getlabel = k => dict[k]
	const enums = _enums.map(n => {
		const [val, key] = Array.isArray(n) ? n : [n, n]
		return key
	})
	const multiple = opts.includes('multiple')
	const allowEmpty = opts.includes('allowEmpty')
	const placeholder = (
		opts.filter(_ => /^placeholder=/.test(_)).pop()
		|| '').slice(12) || '選択してください'
	class Form extends Component {
		constructor(...p) {
			super(...p)
			this.ref = createRef()
			this.state = {
				id: `${Date.now()}:${Math.random()}`,
				done: false,
				open: false,
				selected: [],
			}
			this.select = async ({target: {value: v}}) => {
				vars[name] = multiple ? v : v.join()
				let ok
				await this.setState(s => {
					ok = !multiple && v.length
					return {...s, selected: v, done: !!ok}
				})
				if (ok) res()
			}
			this.onClose = async v => {
				this._flag = true
				let ok
				await this.setState(s => {
					ok = allowEmpty || (multiple && this.state.selected.length)
					return {...s, open: false, done: !!ok}
				})
				this._flag = false
				if (ok) res()
			}
			this.onOpen = v => {
				if (this._flag) return
				this.setState({open: true})
			}
		}
		render() {
			const {
				state: {open, done, selected},
				select,
				onOpen,
				onClose,
			} = this
			if (done) return (
				<Right>
					{selected.map(name => (
						<Button color="primary" readOnly key={name}>
							{getlabel(name)}
						</Button>
					))}
				</Right>
			)
			return (
				<Right>
					<FormWrap>
						<Select
							multiple
							displayEmpty
							placeholder={placeholder}
							value={selected}
							onChange={select}
							input={<Input onClick={onOpen} onFocus={onOpen}/>}
							MenuProps={{...MenuProps, open, onClose}}
							renderValue={
								selected => selected.length ?
									selected.map(getlabel).join(' ') :
									<em>{placeholder}</em>
							}
						>
							<MenuItem disabled value="">
								<em>{placeholder}</em>
							</MenuItem>
							{enums.map(name => (
								<MenuItem key={name} value={name} selected={selected.includes(name)}>
									{getlabel(name)}
								</MenuItem>
							))}
						</Select>
					</FormWrap>
				</Right>
			)
		}
	}
	return of(1, 0).pipe(
		concatMap(
			num => num ?
				of(<Form/>) :
				new Promise(r => res = r)
		),
		filter(_ => _),
	)
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	disableAutoFocusItem: !true,
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}
