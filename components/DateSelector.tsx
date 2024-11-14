// components/DateSelector.tsx
import { useState, useEffect } from "preact/hooks";

interface DateSelectorProps {
  onSelectDate: (date: string) => void;
}

export default function DateSelector({ onSelectDate }: DateSelectorProps) {
  const [availableDates, setAvailableDates] = useState<string[]>([]);

  useEffect(() => {
    const today = new Date();
    const dates: string[] = [];

    // Generate the next 30 days and select only Friday (5), Saturday (6), and Sunday (0)
    for (let i = 0; i < 30; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 6) {
        dates.push(currentDate.toISOString().split("T")[0]); // Use the ISO date format to store
      }
    }

    setAvailableDates(dates);
  }, []);

  const handleDateChange = (e: Event) => {
    const selectedDate = (e.target as HTMLSelectElement).value;
    onSelectDate(selectedDate);
  };

  return (
    <div class="mt-4 mb-4">
      <label class="block mb-2">Select a Pickup Date:</label>
      <select onChange={handleDateChange} class="w-full p-2">
        <option value="">Choose a date</option>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long", // Display the day of the week (Friday, Saturday, Sunday)
              year: "numeric", // Display the year
              month: "long",    // Display the full month name
              day: "numeric",   // Display the day of the month
            })}
          </option>
        ))}
      </select>
    </div>
  );
}
