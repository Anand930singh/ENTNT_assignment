import React from 'react'
import RightDrawer from '../components/RightDrawer/RightDrawer'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';


export default function Home() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <RightDrawer />
    </>
  )
}
