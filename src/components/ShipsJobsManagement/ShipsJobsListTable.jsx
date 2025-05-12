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
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShipsJobsListTable() {
  const [rows, setRows] = React.useState([]);
  const [editingJob, setEditingJob] = React.useState(null);
  const [addingJob, setAddingJob] = React.useState(false);

  const handleAddClick = () => {
    setEditingJob(null);
    setAddingJob(true);
  };

  const handleSaveAdd = (newJob) => {
    try {
      const updatedRows = [...rows, newJob];
      Cookies.set('jobs', JSON.stringify(updatedRows));
      setRows(updatedRows);
      toast.success('Job added successfully!');
    } catch (err) {
      console.error('Failed to add job', err);
      toast.error('Failed to add job!');
    } finally {
      setAddingJob(false);
    }
  };

  React.useEffect(() => {
    try {
      const cookieData = Cookies.get('jobs');
      if (cookieData) {
        setRows(JSON.parse(cookieData));
      }
    } catch (error) {
      console.error('Failed to parse jobs cookie', error);
      toast.error('Error loading saved jobs!');
    }
  }, []);

  const handleDelete = (id) => {
    try {
      const cookieData = Cookies.get('jobs');
      if (!cookieData) return;

      const parsedData = JSON.parse(cookieData);
      const updatedData = parsedData.filter((row) => row.id !== id);
      Cookies.set('jobs', JSON.stringify(updatedData));
      setRows(updatedData);
      toast.success('Job deleted successfully!');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete job!');
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const handleSaveEdit = (updatedJob) => {
    try {
      const updatedRows = rows.map((row) =>
        row.id === editingJob.id ? { ...row, ...updatedJob } : row
      );
      Cookies.set('jobs', JSON.stringify(updatedRows));
      setRows(updatedRows);
      toast.success('Job updated successfully!');
    } catch (err) {
      console.error('Edit failed', err);
      toast.error('Failed to update job!');
    } finally {
      setEditingJob(null);
    }
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
          Open: '#1976d2',
          Closed: '#616161',
          Progress: '#f57c00',
          Completed: '#2e7d32',
        };

        return (
          <span style={{ color: statusColorMap[params.value] || '#000', fontWeight: 600 }}>
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
      <div className="headingContainer">
        <Typography variant="h6" className="headingTitle">
          Ship Jobs
        </Typography>
        <Button
          variant="outlined"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '6px 16px',
            borderWidth: '3px',
            textTransform: 'none',
          }}
          onClick={handleAddClick}
        >
          Add Job
        </Button>
      </div>

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

      {(editingJob || addingJob) && (
        <ShipsJobEditForm
          job={editingJob}
          isAddMode={addingJob}
          onSave={addingJob ? handleSaveAdd : handleSaveEdit}
          onCancel={() => {
            setAddingJob(false);
            setEditingJob(null);
          }}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
