import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Users from '../../data/users.json';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';
import ShipEditForm from './ShipEditForm';

export default function ShipsListTable({ setSelectedShipDetail }) {
  const [rows, setRows] = React.useState();
  const [editingShip, setEditingShip] = React.useState(null);

  React.useEffect(() => {
    if (Array.isArray(Users.ships)) {
      setRows(JSON.parse(Cookies.get('ships')))
    }
  }, []);

  const handleDelete = (id) => {
    const cookieData = Cookies.get('ships');
    if (!cookieData) return;

    try {
      const parsedData = JSON.parse(cookieData);
      const updatedData = parsedData.filter((row) => row.id !== id);
      Cookies.set('ships', JSON.stringify(updatedData));
      setRows(updatedData);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEditClick = (ship) => {
    setEditingShip(ship);
  };

  const handleCancelEdit = () => {
    setEditingShip(null);
  };

  const handleSaveEdit = (updatedShip) => {
    const updatedRows = rows.map((row) =>
      row.id === editingShip.id ? { ...row, ...updatedShip } : row
    );
    Cookies.set('ships', JSON.stringify(updatedRows));
    setRows(updatedRows);
    setEditingShip(null);
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
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditClick(params.row)}>
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => {
              handleDelete(params.row.id, setRows)
            }
            }>
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
        Ships
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
          // checkboxSelection
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
        />
      )}
    </div>
  );
}
