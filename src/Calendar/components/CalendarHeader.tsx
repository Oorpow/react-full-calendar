import { Dayjs } from "dayjs";

interface CalendarHeaderProps {
	curMonth: Dayjs
	prevMonthHandler: () => void
	nextMonthHandler: () => void
}

function CalendarHeader(props: CalendarHeaderProps) {
	const { curMonth, prevMonthHandler, nextMonthHandler } = props

	return (
		<div className="calendar-header">
			<div className="calendar-header-left">
				<div className="calendar-header-icon" onClick={prevMonthHandler}>&lt;</div>
				<div className="calendar-header-value">{curMonth.format('YYYY-MM')}</div>
				<div className="calendar-header-icon" onClick={nextMonthHandler}>&gt;</div>
				<button className="calendar-header-btn">今天</button>
			</div>
		</div>
	);
}

export default CalendarHeader;
