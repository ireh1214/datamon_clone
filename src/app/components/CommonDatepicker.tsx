'use client';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {ko} from 'date-fns/locale';
import {NextPage} from "next";


interface DateRangePickerProps {
    setDate: (startDate: Date | undefined, endDate: Date | undefined) => void
}

const DateRangePicker: NextPage<DateRangePickerProps> = ({ setDate }) => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const handleDateChange = (dates: [Date | null, Date | null] | null) => {
        let [start, end] = dates || [null, null];
        setStartDate(undefined)
        setEndDate(undefined)
        if(!!start){
            setStartDate(start);
            if(!!end) setEndDate(end);
        }
    };

    useEffect(() => {
        setDate(startDate, endDate);
    }, [startDate, endDate]);

    useEffect(() => {
        setStartDate(undefined)
        setEndDate(undefined)
    }, []);

    return (
        <div>
            <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => handleDateChange(dates as [Date | null, Date | null] | null)}
                dateFormat="yyyy/MM/dd"
                placeholderText="yyyy-mm-dd"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                locale={ko}
                // minDate={new Date('1900-01-01')}
                // maxDate={new Date('9999-12-31')}
                // isClearable={true}
            />
        </div>
    );
};

export default DateRangePicker;