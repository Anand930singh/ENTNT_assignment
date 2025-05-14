import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import JobsOnDateTable from './JobsOnDateTable';
import '../../styles/MaintenanceCalendar.css'
import { useSelector } from 'react-redux';

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
  const [myEventsList, setMyEventsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const jobData = useSelector((state) => state.jobs.jobs || []);

  useEffect(() => {
    const events = jobData.map(job => ({
      id: job.id,
      title: `${job.type} - Priority: ${job.priority}`,
      start: new Date(job.scheduledDate),
      end: new Date(job.scheduledDate),
      allDay: true,
      resource: job,
    }));

    setMyEventsList(events);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(moment(date).startOf('day').toDate());
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          defaultDate={new Date()}
          views={['month', 'week']}
          popup
          selectable
          toolbar
          onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
          onSelectEvent={(event) => handleDateSelect(event.start)}
          eventPropGetter={(event) => {
            let backgroundColor = '';
            if (event.resource.priority === 'High') backgroundColor = '#f87171';
            else if (event.resource.priority === 'Medium') backgroundColor = '#facc15';
            else if (event.resource.priority === 'Low') backgroundColor = '#4ade80';

            return {
              style: {
                backgroundColor,
                color: 'black',
                borderRadius: '5px',
                border: 'none',
              },
            };
          }}
        />
      </div>

      {selectedDate && <JobsOnDateTable selectedDate={selectedDate} />}
    </div>
  );
};

export default MaintenanceCalendar;
