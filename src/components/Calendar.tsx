import React from 'react'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('ja')
const localizer = momentLocalizer(moment)

interface CalendarProps {
  events: Array<{
    id: number
    title: string
    start: Date
    end: Date
    pcId: number
  }>
  onSelectEvent: (event: any) => void
  pc: {
    id: number
    name: string
    status: string
  }
}

const Calendar: React.FC<CalendarProps> = ({ events, onSelectEvent, pc }) => {
  return (
    <div className="h-[400px]">
      <h4 className="text-lg font-semibold mb-2">{pc.name}の予約状況</h4>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        onSelectEvent={onSelectEvent}
        messages={{
          next: '次へ',
          previous: '前へ',
          today: '今日',
          month: '月',
          week: '週',
          day: '日',
          agenda: '予定リスト',
        }}
      />
    </div>
  )
}

export default Calendar