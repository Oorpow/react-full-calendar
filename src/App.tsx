import dayjs from 'dayjs';
import Calendar from './Calendar/Calendar';
import { useState } from 'react';

function App() {
	const [val, setVal] = useState(dayjs())

	return (
		<>
			<Calendar
				// dateRender={(date) => {
				// 	return (
				// 		<div>
				// 			<p style={{ background: 'yellow', height: '50px' }}>
				// 				{date.format('YYYY/MM/DD')}
				// 			</p>
				// 		</div>
				// 	);
				// }}
				// defaultValue={dayjs('2025-01-18')}
				value={val}
				onChange={(date) => {
					setVal(date)
					// alert(date.format('YYYY-MM-DD'));
				}}
			/>
		</>
	);
}

export default App;
