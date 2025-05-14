import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Typography } from '@mui/material';
import ShipEditForm from './ShipEditForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { addShip, updateShip, removeShip } from '../../slice/shipSlice'; // adjust path if needed

export default function ShipsListTable({ setSelectedShipDetail }) {
  const shipReduxData = useSelector((state) => state.ships.ships || []);
  const userRole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();

  const [editingShip, setEditingShip] = React.useState(null);
  const [openAddForm, setOpenAddForm] = React.useState(false);

  const handleDelete = (id) => {
    try {
      dispatch(removeShip(id));
      toast.success('Ship deleted successfully.');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete the ship.');
    }
  };

  const handleEditClick = (ship) => {
    setEditingShip(ship);
  };

  const handleCancelEdit = () => {
    setEditingShip(null);
  };

  const handleSaveEdit = (updatedShip) => {
    try {
      dispatch(updateShip({ ...editingShip, ...updatedShip }));
      setEditingShip(null);
      toast.success('Ship details updated successfully.');
    } catch (err) {
      console.error('Edit failed', err);
      toast.error('Failed to update ship details.');
    }
  };

  const handleAddShip = (newShip) => {
    try {
      const shipWithId = { ...newShip, id: 's' + Date.now() };
      dispatch(addShip(shipWithId));
      setOpenAddForm(false);
      toast.success('New ship added successfully.');
    } catch (err) {
      console.error('Add ship failed', err);
      toast.error('Failed to add new ship.');
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'imo', headerName: 'IMO Number', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'flag', headerName: 'Flag', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      cellClassName: (params) =>
        params.value === 'Active'
          ? 'status-active'
          : params.value === 'Under Maintenance'
          ? 'status-maintenance'
          : params.value === 'Inactive'
          ? 'status-inactive'
          : '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => setSelectedShipDetail(params.row)}>
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          {(userRole === "Inspector"||userRole === "Admin") && (
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditClick(params.row)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>)}

          {userRole==="Admin" && (<Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row.id)}>
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>)}
        </>
      ),
    },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div className="headingContainer">
        <Typography variant="h6" className="headingTitle">
          Ships
        </Typography>
        {userRole === "Admin" && (<Button
          variant="outlined"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '6px 16px',
            borderWidth: '3px',
            textTransform: 'none',
          }}
          onClick={() => setOpenAddForm(true)}
        >
          Add Ship
        </Button>)}
      </div>

      <Paper sx={{ width: '98%' }}>
        <DataGrid
          rows={shipReduxData}
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
            '& .status-active': {
              color: 'green',
              fontWeight: 'bold',
            },
            '& .status-maintenance': {
              color: 'orange',
              fontWeight: 'bold',
            },
            '& .status-inactive': {
              color: 'red',
              fontWeight: 'bold',
            },
          }}
        />
      </Paper>

      {editingShip && (
        <ShipEditForm
          ship={editingShip}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          userRole={userRole}
        />
      )}
      {openAddForm && (
        <ShipEditForm
          ship={null}
          onSave={handleAddShip}
          onCancel={() => setOpenAddForm(false)}
          userRole={userRole}
        />
      )}

      <ToastContainer />
    </div>
  );
}
