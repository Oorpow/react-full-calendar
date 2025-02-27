import { Dayjs } from 'dayjs';
import Month from './components/Month';
import CalendarHeader from './components/CalendarHeader';
import './index.scss';

export interface CalendarProps {
	value: Dayjs;
}

function Calendar(props: CalendarProps) {
	return (
		<div className="calendar">
			<CalendarHeader />
			<Month {...props} />
		</div>
	);
}

export default Calendar;
