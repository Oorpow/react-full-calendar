import { Dayjs } from 'dayjs';
import cs from 'classnames';
import { CalendarProps } from '../Calendar';

interface MonthCalendarProps extends CalendarProps {
	curMonth: Dayjs;
	selectHandler?: (date: Dayjs) => void;
}

interface DaysMatrixData {
	date?: Dayjs;
	currentMonth?: boolean;
}

/**
 * 日历填充思路，采用6 * 7的矩阵
 * 展示当月的日期信息
 * 上个月、下个月的日期填充（依赖于当前月份的天数、当月第一天是周几，例如要填充上个月，2月第一天是周六，要显示周六前的所有日期，就用第一天的日期-1、-2、-3）
 */
function getAllDays(date: Dayjs) {
	const startDate = date.startOf('month');
	const day = startDate.day();

	// 日历上需要显示 6 * 7的矩阵（包括上个月、下个月）
	const daysMatrix: Array<DaysMatrixData> = new Array(6 * 7).map(() => ({}));

	// 填充上个月
	for (let i = 0; i < day; i++) {
		daysMatrix[i] = {
			date: startDate.subtract(day - i, 'day'),
			currentMonth: false,
		};
	}

	// 填充剩余日期
	for (let i = 0; i < daysMatrix.length; i++) {
		const calcDate = startDate.add(i - day, 'day');

		daysMatrix[i] = {
			date: calcDate,
			currentMonth: calcDate.month() === date.month(),
		};
	}

	return daysMatrix;
}

function Month(props: MonthCalendarProps) {
	const { dateRender, dateInnerContent, selectHandler, value, curMonth } = props;

	const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
	const allDays = getAllDays(curMonth);

	function renderDays(days: Array<DaysMatrixData>) {
		// 二维数组6 * 7
		const rows = [];
		for (let i = 0; i < 6; i++) {
			const row = [];
			for (let j = 0; j < 7; j++) {
				const item = days[i * 7 + j];

				row[j] = (
					<div
						className={
							'calendar-month-body-cell ' +
							(item.currentMonth
								? 'calendar-month-body-cell-current'
								: '')
						}
						onClick={() => selectHandler?.(item.date!)}
					>
						{dateRender ? (
							dateRender(item.date!)
						) : (
							<div className="calendar-month-body-cell-date">
								<div
									className={cs(
										'calendar-month-body-cell-date-value',
										value?.format('YYYY-MM-DD') ===
											item.date?.format('YYYY-MM-DD')
											? 'calendar-month-body-cell-date-selected'
											: ''
									)}
								>
									{item.date?.date()}
								</div>
								<div className="calendar-month-body-cell-date-content">
									{dateInnerContent?.(item.date!)}
								</div>
							</div>
						)}
					</div>
				);
			}
			rows.push(row);
		}

		return rows.map((row, idx) => (
			<div key={idx} className="calendar-month-body-row">
				{row}
			</div>
		));
	}

	return (
		<div className="calendar-month">
			<div className="calendar-month-week-list">
				{weekList.map((week) => (
					<div className="calendar-month-week-list-item" key={week}>
						{week}
					</div>
				))}
			</div>
			<div className="calendar-month-body">{renderDays(allDays)}</div>
		</div>
	);
}

export default Month;
