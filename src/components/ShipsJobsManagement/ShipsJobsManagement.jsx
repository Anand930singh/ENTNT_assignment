import React from 'react'
import ShipsJobsListTable from './ShipsJobsListTable'
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import '../../styles/HomeShip.css'
import MaintenanceCalendar from '../MaintenanceCalendar/MaintenanceCalendar';

function ShipsJobsManagement() {
  return (
    <>
        <ShipsJobsListTable/>
        <div className='divisonLine'></div>
        <div className="placeholder-icon">
            <DirectionsBoatFilledIcon />
        </div>
    </>
  )
}

export default ShipsJobsManagement