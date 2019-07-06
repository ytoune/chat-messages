import React from 'react'

import UtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider'
import LuxonUtils from '@date-io/luxon'

import TimePicker from 'material-ui-pickers/TimePicker'
import DatePicker from 'material-ui-pickers/DatePicker'
import DateTimePicker from 'material-ui-pickers/DateTimePicker'

class Utils extends LuxonUtils {
	getYearText(date) {
		if ('ja' !== this.locale) return super.getYearText(date)
		return this.format(date, 'y年')
	}
	getDatePickerHeaderText(date) {
		if ('ja' !== this.locale) return super.getDatePickerHeaderText(date)
		return this.format(date, 'M月d日 (ccc)')
	}
	getCalendarHeaderText(date) {
		if ('ja' !== this.locale) return super.getCalendarHeaderText(date)
		return this.format(date, 'y年M月')
	}
	getDateTimePickerHeaderText(date) {
		if ('ja' !== this.locale) return super.getDateTimePickerHeaderText(date)
		return this.format(date, 'M / d')
	}
	getDayText(date) {
		if ('ja' !== this.locale) return super.getDayText(date)
		return this.format(date, 'd')
	}
	getHourText(date, ampm) {
		if ('ja' !== this.locale) return super.getHourText(date, ampm)
		if (ampm) {
			return date.toFormat('hh')
		}
		return date.toFormat('HH')
	}
	getMinuteText(date) {
		if ('ja' !== this.locale) return super.getMinuteText(date)
		return date.toFormat('mm')
	}
	getSecondText(date) {
		if ('ja' !== this.locale) return super.getSecondText(date)
		return date.toFormat('ss')
	}
}

const wrap = (Picker, over) => {
	const MyPicker = props => (
		<UtilsProvider utils={Utils} locale="ja">
			<Picker {...over} {...props} />
		</UtilsProvider>
	)
	return MyPicker
}

export const TimeInput = wrap(TimePicker, { ampm: false })
export const DateInput = wrap(DatePicker)
export const DateTimeInput = wrap(DateTimePicker, { ampm: false })
