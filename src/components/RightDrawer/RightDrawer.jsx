import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShipsManagement from '../ShipsManagement/ShipsManagement';
import '../../styles/HomeShip.css'
import ShipsComponentManagement from '../ShipsComponentManagement/ShipsComponentManagement'
import ShipsJobsManagement from '../ShipsJobsManagement/ShipsJobsManagement';
import MaintenanceCalendar from '../MaintenanceCalendar/MaintenanceCalendar';
import Dashboard from '../Dashboard/Dashboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import BuildIcon from '@mui/icons-material/Build';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ProfileIcon from './ProfileIcon';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { logout } from '../../slice/authSlice';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const sectionIcons = {
  dashboard: <DashboardIcon />,
  ships: <DirectionsBoatIcon />,
  shipComponents: <SettingsApplicationsIcon />,
  maintenanceJobs: <BuildIcon />,
  maintenanceCalendar: <CalendarMonthIcon />,
};

export default function RightDrawer() {
  const [selectedSection, setSelectedSelection] = React.useState("dashboard");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='navBar'>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ship Maintenance Dashboard
          </Typography>

          {/* Push ProfileIcon to the right */}
          <Box sx={{ ml: 'auto' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <ProfileIcon />
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                sx={{ textTransform: 'none' }}
              >
                Logout
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { label: 'Dashboard', value: 'dashboard' },
            { label: 'Ships', value: 'ships' },
            { label: 'Ship Components', value: 'shipComponents' },
            { label: 'Maintenance Jobs', value: 'maintenanceJobs' },
            { label: 'Maintenance Calendar', value: 'maintenanceCalendar' },
          ].map((item, index) => (
            <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                selected={selectedSection === item.value}
                onClick={() => setSelectedSelection(item.value)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                    color: selectedSection === item.value ? 'primary.main' : 'inherit',
                  },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0, justifyContent: 'center',
                      color: selectedSection === item.value ? 'primary.main' : 'grey',

                    },
                    open ? { mr: 3 } : { mr: 'auto' },

                  ]}
                >
                  {sectionIcons[item.value]}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {
          selectedSection === "ships" ? (<Typography sx={{ marginBottom: 2 }}>
            <ShipsManagement />
          </Typography>) : selectedSection === "shipComponents" ? (<Typography>
            <ShipsComponentManagement />
          </Typography>) : selectedSection === "maintenanceJobs" ? (
            <Typography>
              <ShipsJobsManagement />
            </Typography>
          ) : selectedSection === "maintenanceCalendar" ? (
            <Typography>
              <MaintenanceCalendar />
            </Typography>
          ) : selectedSection === "dashboard" ? (
            <Typography>
              <Dashboard />
            </Typography>
          ) : <></>
        }
      </Box>
    </Box>
  );
}
