import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addYears } from 'date-fns';
import { Box } from '@mui/material';
import Image from 'next/image';
import CalenderIcon from '@/assets/icons/calender.svg'
import './singleDatePicker.css';

interface SingleDatePickerProps {
    selectedDate: Date | null;
    setSelectedDate: (selectedDate: Date | null) => void;
    mode: string
}

const SingleDatePicker: React.FC<SingleDatePickerProps>  = ({selectedDate, setSelectedDate, mode}) => {

  return (
    <Box sx={{position: 'relative', width: mode==="modal" ? "195px": "98px"}}>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          isClearable
          placeholderText={mode === "modal" ? "DD/MM/YYYY" : "due date"}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()} 
          maxDate={addYears(new Date(), 5)} 
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="single-datepicker"
          renderCustomHeader={({ date, changeMonth, changeYear }) => (
            <div className="custom-header">
                <div className="custom-dropdown-wrapper">
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
                </div>
    
                <div className="custom-dropdown-wrapper">
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
            </div>
          )}
        />
        {selectedDate === null && <Image style={{position: 'absolute', right: "10px", top: '6px'}} src={CalenderIcon}  alt='cal'/>}
    </Box>
  );
};

export default SingleDatePicker;
