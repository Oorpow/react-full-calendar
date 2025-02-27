import dayjs from "dayjs";

function CalendarHeader() {
	return (
		<div className="calendar-header">
			<div className="calendar-header-left">
				<div className="calendar-header-icon">&lt;</div>
				<div className="calendar-header-value">{dayjs().format('YYYY-MM-DD')}</div>
				<div className="calendar-header-icon">&gt;</div>
				<button className="calendar-header-btn">今天</button>
			</div>
		</div>
	);
}

export default CalendarHeader;
