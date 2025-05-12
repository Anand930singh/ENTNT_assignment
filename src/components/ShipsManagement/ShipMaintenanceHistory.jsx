import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Cookies from 'js-cookie';

export default function ShipMaintenanceHistory({ shipId }) {
  const [jobsData, setJobsData] = React.useState([]);

  React.useEffect(() => {
    const jobs = JSON.parse(Cookies.get('jobs') || '[]');
    const filtered = jobs.filter(job => job.shipId === shipId);
    setJobsData(filtered);
  }, [shipId]);

  const columns = [
    { field: 'id', headerName: 'Job ID', width: 100 },
    { field: 'componentId', headerName: 'Component ID', flex:1 },
    { field: 'type', headerName: 'Type', flex:1 },
    { field: 'priority', headerName: 'Priority', flex:1 },
    { field: 'status', headerName: 'Status', flex:1 },
    { field: 'assignedEngineerId', headerName: 'Engineer ID', flex:1 },
    { field: 'scheduledDate', headerName: 'Scheduled Date', flex:1 },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={jobsData}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
