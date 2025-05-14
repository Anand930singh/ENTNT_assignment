import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

export default function ShipComponenetHistory({ shipId }) {
  const [componentsData, setComponentsData] = React.useState([]);
  const componentReduxData = useSelector((state) => state.components.components || []);


  React.useEffect(() => {
    const filtered = componentReduxData.filter(item => item.shipId === shipId);
    setComponentsData(filtered);
  }, [shipId]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Component Name', flex: 1 },
    { field: 'serialNumber', headerName: 'Serial Number', flex: 1 },
    { field: 'installDate', headerName: 'Install Date', flex: 1 },
    { field: 'lastMaintenanceDate', headerName: 'Last Maintenance', flex: 1 },
  ];

  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={componentsData}
        columns={columns}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
