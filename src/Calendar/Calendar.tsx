import { CSSProperties, ReactNode, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useControllableValue } from 'ahooks';
import Month from './components/Month';
import CalendarHeader from './components/CalendarHeader';
import './index.scss';

export interface CalendarProps {
	// 受控模式
	value?: Dayjs;
	// 非受控模式
	defaultValue?: Dayjs
	style?: CSSProperties
	className?: string | string[]
	/** 自定义日期显示，完全覆盖日期单元格 */
	dateRender?: (currentDate: Dayjs) => ReactNode
	/** 自定义日期单元格，只会将内容添加到单元格里 */
	dateInnerContent?: (currentDate: Dayjs) => ReactNode
	onChange?: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
	const { value, onChange } = props

	// ahooks 支持defaultValue
	const [curDate, setCurDate] = useControllableValue(props, {
		defaultValue: dayjs()
	})

	// const [curDate, setCurDate] = useState<Dayjs>(value)
	const [curMonth, setCurMonth] = useState<Dayjs>(curDate)

	function changeDate(date: Dayjs) {
		setCurDate(date)
		onChange?.(date)
	}

	const selectHandler = (date: Dayjs) => {
		changeDate(date)
	}

	const prevMonthHandler = () => {
		setCurMonth(curMonth.subtract(1, 'month'))
	}

	const nextMonthHandler = () => {
		setCurMonth(curMonth.add(1, 'month'))
	}

	return (
		<div className="calendar">
			<CalendarHeader curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} />
			<Month {...props} value={curDate} curMonth={curMonth} selectHandler={selectHandler} />
		</div>
	);
}

export default Calendar;
