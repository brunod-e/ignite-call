import { Calendar } from "@/components/Calendar"
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList,
} from "./styles"
import { useState } from "react"

export function CalendarStep() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const isDaySelected = !!selectedDate

  return (
    <Container isTimePickerOpen={isDaySelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDaySelected && (
        <TimePicker>
          <TimePickerHeader>
            terça-feira <span>20 de setembro</span>
          </TimePickerHeader>

          <TimePickerList>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
            <TimePickerItem>08:00h</TimePickerItem>
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
