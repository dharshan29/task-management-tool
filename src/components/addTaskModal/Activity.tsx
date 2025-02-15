import { useActivityStore } from '@/lib/zustand/activity'
import { Stack, Typography, useTheme } from '@mui/material';
import React from 'react'

const formatDate = (isoString: any) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      month: "short",  // "Dec"
      day: "2-digit",  // "27"
      year: "numeric", // "2025"
      hour: "numeric",
      minute: "2-digit",
      hour12: true,   // 12-hour format with AM/PM
    });
  };

  
const Activity = () => {
    const { activities } = useActivityStore();
    console.log(activities)

    const theme = useTheme();
  return (
    <Stack sx={{padding: '8px 20px 8px 16px'}} gap="14px">
        {activities?.map((item, index) => (
            <Stack key={index} justifyContent="space-between" flexDirection="row" alignItems="center" >
                <Typography sx={{fontSize: '10px', fontWeight: 400, color: theme.palette.black[200]}}>{item?.activity}</Typography>
                <Typography sx={{fontSize: '10px', fontWeight: 400, color: theme.palette.black[200]}}>{formatDate(item?.createdAt)}</Typography>
            </Stack>
        ))}
    </Stack>
  )
}

export default Activity