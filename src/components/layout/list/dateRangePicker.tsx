import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addYears, subYears } from 'date-fns';
import './dateRangePicker.css';

const DateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
      isClearable
      placeholderText="Select Date Range"
      dateFormat="MM/dd/yyyy"
      minDate={subYears(new Date(), 5)}
      maxDate={addYears(new Date(), 5)}
      monthsShown={1}
      shouldCloseOnSelect={false}

      // Enable month & year dropdowns
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"

      // Custom Header: Month & Year Dropdown
      renderCustomHeader={({ date, changeMonth, changeYear }) => (
        <div className="custom-header">
          <select
            value={date.getMonth()}
            onChange={(e) => changeMonth(Number(e.target.value))}
            className="custom-dropdown"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>

          <select
            value={date.getFullYear()}
            onChange={(e) => changeYear(Number(e.target.value))}
            className="custom-dropdown"
          >
            {Array.from({ length: 11 }, (_, i) => {
              const year = new Date().getFullYear() - 5 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      )}

      className="custom-datepicker"
    />
  );
};

export default DateRangePicker;
