import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Cookies from 'js-cookie'

const localizer = momentLocalizer(moment);

const MaintenanceCalendar = () => {
    const [myEventsList, setMyEventsList] = useState([]); // Fix 1

    useEffect(() => {
        const jobData = JSON.parse(Cookies.get("jobs") || '[]');

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

    return (
        <div style={{ height: '70vh', padding: '1rem' }}> {/* Fix 2 */}
            <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                defaultView="month"
                defaultDate={new Date('2025-05-01')}  // Fix 3
                views={['month', 'week']}
                style={{ height: '100%' }}
                popup
                selectable
                toolbar
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
    );
};

export default MaintenanceCalendar;
