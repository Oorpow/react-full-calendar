import dayjs from 'dayjs'
import Calendar from './Calendar/Calendar'

function App() {

  return (
    <>
      <Calendar value={dayjs()} />
    </>
  )
}

export default App
