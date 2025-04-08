import { useState } from "react"
import { addDays } from "date-fns"

import { Calendar } from "@/components/ui/calendar"

export default function WidgetCalendarRange({mode = "range" , selected, onSelect , numberOfMonths = 2}) {
   
  const today = new Date()
  const [date, setDate] = useState({
    from: today,
    to: addDays(today, 10),
  })

  return (
    (<div>
      <Calendar
        mode={mode}
        selected={date}
        onSelect={setDate}
        numberOfMonths={numberOfMonths}
        pagedNavigation
        showOutsideDays={false}
        className="rounded-md border p-2"
        classNames={{
          months: "gap-8",
          month:
            "relative first-of-type:before:hidden before:absolute max-sm:before:inset-x-2 max-sm:before:h-px max-sm:before:-top-2 sm:before:inset-y-2 sm:before:w-px before:bg-border sm:before:-left-4",
        }} />
   
    </div>)
  );
}
