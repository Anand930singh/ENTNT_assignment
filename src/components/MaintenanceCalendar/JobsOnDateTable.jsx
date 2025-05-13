import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import moment from 'moment';

export default function JobsOnDateTable({ selectedDate }) {
  const jobData = JSON.parse(Cookies.get('jobs') || '[]');
  const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

  const filteredJobs = jobData.filter(
    job => moment(job.scheduledDate).format('YYYY-MM-DD') === formattedDate
  );

  const columns = [
    { field: 'type', headerName: 'Job Type', flex: 1 },
    { field: 'priority', headerName: 'Priority', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'componentId', headerName: 'Component ID', flex: 1 },
    { field: 'assignedEngineerId', headerName: 'Engineer ID', flex: 1 },
  ];

  return (
    <div style={{ marginTop: '20px', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Jobs on {formattedDate}
      </Typography>

      {filteredJobs.length === 0 ? (
        <Typography>No jobs scheduled for this date.</Typography>
      ) : (
        <Paper>
          <DataGrid
            rows={filteredJobs}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            autoHeight
          />
        </Paper>
      )}
    </div>
  );
}
