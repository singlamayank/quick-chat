import React from 'react'
import { Card } from '@mui/material';

function AppCard({width, height, style, children}) {
  return (
    <Card
      sx={{
        width: width,
        height: height,
        margin: "10px auto",
        padding: '20px',
        backgroundColor: "#F5F8FC",
        boxSizing: 'border-box',
        ...(style || {}),
      }}
    >
      {children}
    </Card>
  );
}

export default AppCard