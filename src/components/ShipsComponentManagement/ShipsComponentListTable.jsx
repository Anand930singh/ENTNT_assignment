import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import ShipComponentEditForm from './ShipComponentEditForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShipsComponentListTable({ setSelectedComponentDetail }) {
  const [rows, setRows] = React.useState([]);
  const [editingComponent, setEditingComponent] = React.useState(null);
  const [openAddForm, setOpenAddForm] = React.useState(false);

  React.useEffect(() => {
    const cookieData = Cookies.get('components');
    if (cookieData) {
      try {
        setRows(JSON.parse(cookieData));
      } catch (error) {
        console.error('Failed to parse components cookie', error);
        toast.error('Failed to load components. Please try again.');
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
      toast.success('Component deleted successfully');
    } catch (err) {
      console.error('Delete failed', err);
      toast.error('Failed to delete component. Please try again.');
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
    toast.success('Component updated successfully');
  };

  const handleAddComponent = () => {
    setOpenAddForm(true);
  };

  const handleSaveNewComponent = (newComponent) => {
    try {
      const updatedComponents = [...rows, { ...newComponent, id: 'c' + Date.now() }];
      Cookies.set('components', JSON.stringify(updatedComponents));
      setRows(updatedComponents);
      setOpenAddForm(false);
      toast.success('Component added successfully');
    } catch (error) {
      console.error('Error adding component', error);
      toast.error('Failed to add component. Please try again.');
    }
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
      <div className="headingContainer">
        <Typography variant="h6" className="headingTitle">
          Ship Components
        </Typography>
        <Button
          variant="outlined"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            padding: '6px 16px',
            borderWidth: '3px',
            textTransform: 'none'
          }}
          onClick={handleAddComponent}
        >
          Add Component
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

      {editingComponent && (
        <ShipComponentEditForm
          component={editingComponent}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      {openAddForm && (
        <ShipComponentEditForm
          component={null}
          onSave={handleSaveNewComponent}
          onCancel={() => setOpenAddForm(false)}
        />
      )}

      <ToastContainer />
    </div>
  );
}
