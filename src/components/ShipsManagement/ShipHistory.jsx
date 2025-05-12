import React from 'react';
import '../../styles/HomeShip.css';
import ShipMaintenanceHistory from './ShipMaintenanceHistory';
import ShipComponenetHistory from './ShipComponentHistory';
import { Typography } from '@mui/material';
import { Anchor, Flag, Info, User } from "lucide-react"

function ShipHistory({ shipDetail }) {
    const selectedShip = shipDetail || {
        id: "1",
        name: "Ever Given",
        imo: "9811000",
        flag: "Panama",
        status: "Active",
        owner: "Shoei Kisen Kaisha",
    }

    return (
        <>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                Ship History
            </Typography>
            <div className="shipHistoryContainer">
                <div className="shipDetailsSection">
                    {selectedShip && (
                        <div className="ship-details-card">
                            <h3 className="ship-details-title">{selectedShip.name} Details</h3>
                            <div className="details-list">
                                <div className="detail-item">
                                    <div className="icon-container">
                                        <Anchor size={16} color="#555" />
                                    </div>
                                    <div className="detail-content">
                                        <p className="detail-label">IMO Number:</p>
                                        <p className="detail-value">{selectedShip.imo}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="icon-container">
                                        <Flag size={16} color="#555" />
                                    </div>
                                    <div className="detail-content">
                                        <p className="detail-label">Flag:</p>
                                        <p className="detail-value">{selectedShip.flag}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="icon-container">
                                        <Info size={16} color="#555" />
                                    </div>
                                    <div className="detail-content">
                                        <p className="detail-label">Status:</p>
                                        <p className="detail-value">{selectedShip.status}</p>
                                    </div>
                                </div>

                                <div className="detail-item">
                                    <div className="icon-container">
                                        <User size={16} color="#555" />
                                    </div>
                                    <div className="detail-content">
                                        <p className="detail-label">Owner:</p>
                                        <p className="detail-value">{selectedShip.owner || "ENTNT Ship Corp."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="tableSection">
                    <div>
                        <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                            Ship Component History
                        </Typography>
                        <ShipComponenetHistory shipId={selectedShip.id} />
                    </div>
                    <div>
                        <Typography variant="h7" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
                            Ship Maintenance History
                        </Typography>
                        <ShipMaintenanceHistory shipId={selectedShip.id} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShipHistory;
