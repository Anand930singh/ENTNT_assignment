import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';
import ShipComponentEditForm from './ShipComponentEditForm';

export default function ShipsComponentListTable({ setSelectedComponentDetail }) {
  const [rows, setRows] = React.useState([]);
  const [editingComponent, setEditingComponent] = React.useState(null);

  React.useEffect(() => {
    const cookieData = Cookies.get('components');
    if (cookieData) {
      try {
        setRows(JSON.parse(cookieData));
      } catch (error) {
        console.error('Failed to parse components cookie', error);
      }
    }
  }, []);

  const handleDelete = (id) => {
    const cookieData = Cookies.get('components');
    if (!cookieData) return;

    try {
      const parsedData = JSON.parse(cookieData);
      const updatedData = parsedData.filter((row) => row.id !== id);
      Cookies.set('components', JSON.stringify(updatedData));
      setRows(updatedData);
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleEditClick = (component) => {
    setEditingComponent(component);
  };

  const handleCancelEdit = () => {
    setEditingComponent(null);
  };

  const handleSaveEdit = (updatedComponent) => {
    const updatedRows = rows.map((row) =>
      row.id === editingComponent.id ? { ...row, ...updatedComponent } : row
    );
    Cookies.set('components', JSON.stringify(updatedRows));
    setRows(updatedRows);
    setEditingComponent(null);
  };

  const columns = [
    { field: 'name', headerName: 'Component Name', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'serialNumber', headerName: 'Serial Number', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'installDate', headerName: 'Install Date', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'lastMaintenanceDate', headerName: 'Last Maintenance', flex: 1, headerClassName: 'super-app-theme--header' },
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
        Ship Components
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
      {editingComponent && (
        <ShipComponentEditForm
          component={editingComponent}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
