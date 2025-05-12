import React from 'react'
import ShipsComponentListTable from './ShipsComponentListTable';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import '../../styles/HomeShip.css'

function ShipsComponentManagement() {

  return (
    <>
      <ShipsComponentListTable />
      <div className='divisonLine'></div>
      <div className="placeholder-icon">
        <DirectionsBoatFilledIcon />
      </div>
    </>
  )
}

export default ShipsComponentManagement