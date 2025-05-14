import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import '../../styles/MaintenanceCalendar.css'
import { useSelector } from 'react-redux';

export default function JobsOnDateTable({ selectedDate }) {
  const jobData = useSelector((state) => state.jobs.jobs || []);
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
    <div className="jobs-table" >
      <Typography variant="h6" gutterBottom>
        Jobs on {formattedDate}
      </Typography>

      {filteredJobs.length === 0 ? (
        <Typography>No jobs scheduled for this date.</Typography>
      ) : (
        <Paper sx={{ width: '100%' }}>
          <DataGrid
            rows={filteredJobs}
            columns={columns}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            sx={{
              border: 0,
              '& .super-app-theme--header': {
                fontWeight: 'bold',
                fontSize: '1rem',
              },
            }}
          />
        </Paper>
      )}
    </div>
  );
}
