import { useEffect, useState } from "preact/hooks";

// Date Selector property interface
interface DateSelectorProps {
  onSelectDate: (date: string) => void; // property that takes the date
}

/*
// Preact component
//
// name: DateSelector
// description: Date Selector to select pickup date
*/
export default function DateSelector({ onSelectDate }: DateSelectorProps) {
  /*
  // Preact useState
  //
  // availableDates: an array string for the dates that are available to order on
  // setAvailableDates: the function that updates the available dates
  */
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date(); // todays date
    const dates: string[] = []; // saved string of dates

    // Generate the next 30 days and select only Friday, Saturday, and Sunday
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 6) {
        dates.push(currentDate.toISOString().split("T")[0]); // Use the ISO date format and store dates
      }
    }

    setAvailableDates(dates); // Sets availableDates variable with dates
  }, []);

  // Handler for date change
  const handleDateChange = (e: Event) => {
    const selectedDate = (e.target as HTMLSelectElement).value; // Saves the selected date value
    onSelectDate(selectedDate);
  };

  return (
    <div class="mt-4 mb-4">
      <label class="block mb-2 text-white">Select a Pickup Date:</label>
      <select onChange={handleDateChange} class="w-full p-2">
        <option value="">Choose a date</option>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long", // Display the day of the week (Friday, Saturday, Sunday)
              year: "numeric", // Display the year
              month: "long", // Display the full month name
              day: "numeric", // Display the day of the month
            })}
          </option>
        ))}
      </select>
    </div>
  );
}
