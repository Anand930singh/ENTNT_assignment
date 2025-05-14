import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Button } from '@mui/material';
import ShipsJobEditForm from './ShipsJobEditForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addJob, updateJob, removeJob, setJobs } from '../../slice/jobSlice';

export default function ShipsJobsListTable() {
  const dispatch = useDispatch();
  const jobsReduxData = useSelector((state) => state.jobs.jobs || []);

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
      setRows(updatedRows);
      dispatch(addJob(newJob));
      toast.success('Job added successfully!');
    } catch (err) {
      console.error('Failed to add job', err);
      toast.error('Failed to add job!');
    } finally {
      setAddingJob(false);
    }
  };

  const handleSaveEdit = (updatedJob) => {
    try {
      const updatedRows = rows.map((row) =>
        row.id === editingJob.id ? { ...row, ...updatedJob } : row
      );
      setRows(updatedRows);
      dispatch(updateJob({ ...editingJob, ...updatedJob }));
      toast.success('Job updated successfully!');
    } catch (err) {
      console.error('Edit failed', err);
      toast.error('Failed to update job!');
    } finally {
      setEditingJob(null);
    }
  };

  const handleDelete = (id) => {
    try {
      const updatedData = rows.filter((row) => row.id !== id);
      setRows(updatedData);
      dispatch(removeJob(id));
      toast.success('Job deleted successfully!');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete job!');
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  React.useEffect(() => {
    try {
      if (jobsReduxData.length > 0) {
        setRows(jobsReduxData);
      } else {
        dispatch(setJobs(jobsReduxData));
        setRows(jobsReduxData);
      }
    } catch (error) {
      console.error('Failed to parse jobs cookie', error);
      toast.error('Error loading saved jobs!');
    }
  }, []);

  React.useEffect(() => {
    setRows(jobsReduxData);
  }, [jobsReduxData]);

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
      <div className="headingContainer" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
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
