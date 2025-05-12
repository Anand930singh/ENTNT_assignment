import React from 'react'
import ShipsListTable from './ShipsListTable'
import '../../styles/HomeShip.css'
import ShipHistory from './ShipHistory'
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';


function ShipsManagement() {
    const [selectedShipDetail, setSelectedShipDetail] = React.useState(null);

    React.useEffect(() => {
        console.log(selectedShipDetail)
    }, [selectedShipDetail]);
    return (
        <>
            <ShipsListTable setSelectedShipDetail={setSelectedShipDetail} />
            <div className='divisonLine'></div>
            {selectedShipDetail ? (
                <ShipHistory shipDetail={selectedShipDetail} />
            ) : (
                <div className="placeholder-icon">
                    <DirectionsBoatFilledIcon />
                </div>
            )}
        </>
    )
}

export default ShipsManagement