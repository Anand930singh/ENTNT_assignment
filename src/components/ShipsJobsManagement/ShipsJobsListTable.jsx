import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';
import ShipsJobEditForm from './ShipsJobEditForm';

export default function ShipsJobsListTable() {
  const [rows, setRows] = React.useState([]);
  const [editingJob, setEditingJob] = React.useState(null);

  React.useEffect(() => {
    const cookieData = Cookies.get('jobs');
    if (cookieData) {
      try {
        setRows(JSON.parse(cookieData));
      } catch (error) {
        console.error('Failed to parse jobs cookie', error);
      }
    }
  }, []);

  const handleDelete = (id) => {
    const cookieData = Cookies.get('jobs');
    if (!cookieData) return;

    try {
      const parsedData = JSON.parse(cookieData);
      const updatedData = parsedData.filter((row) => row.id !== id);
      Cookies.set('jobs', JSON.stringify(updatedData));
      setRows(updatedData);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const handleSaveEdit = (updatedJob) => {
    const updatedRows = rows.map((row) =>
      row.id === editingJob.id ? { ...row, ...updatedJob } : row
    );
    Cookies.set('jobs', JSON.stringify(updatedRows));
    setRows(updatedRows);
    setEditingJob(null);
  };

  const columns = [
    { field: 'type', headerName: 'Job Type', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'priority', headerName: 'Priority', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        const statusColorMap = {
          Open: '#1976d2',       // Blue
          Closed: '#616161',     // Dark Gray
          Progress: '#f57c00',   // Orange
          Completed: '#2e7d32',  // Green
        };

        return (
          <span
            style={{
              color: statusColorMap[params.value] || '#000',
              fontWeight: 600,
            }}
          >
            {params.value}
          </span>
        );
      },
    },
    { field: 'assignedEngineerId', headerName: 'Engineer ID', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'scheduledDate', headerName: 'Scheduled Date', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditClick(params.row)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
        Ship Jobs
      </Typography>
      <Paper sx={{ width: '98%' }}>
        <DataGrid
          rows={rows}
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
      {editingJob && (
        <ShipsJobEditForm
          job={editingJob}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
