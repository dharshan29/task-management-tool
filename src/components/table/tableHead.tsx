import { TableRow, TableHead, useTheme, Typography } from '@mui/material';

interface TableHeadMainProps {
  count: number;
  status: string;
}

const taskStatus: Record<string, string> = {
  'TO-DO': "Todo",
  'IN-PROGRESS':'In-Progress',
  'COMPLETED': 'Completed'
}
const headColor: Record<string, string> = {
  'TO-DO': "#FAC3FF",
  'IN-PROGRESS':'#85D9F1',
  'COMPLETED': '#CEFFCC'
}

export default function TableHeadMain({ count, status }: TableHeadMainProps) {
  const theme = useTheme();
  return (
    <TableHead sx={{
      height: '49px', 
      bgcolor: headColor[status], 
      border: `1px solid ${status === 'TO-DO' ? '#FAC3FF': '#EAECF0'}`
    }}>
      <TableRow sx={{display: 'flex', height: 'inherit', alignItems: 'center'}}>
        <Typography sx={{marginLeft: '14px', fontWeight: 600}} variant='body1' >
          {`${taskStatus[status]} (${count})`}
        </Typography>
      </TableRow>
    </TableHead>
  );
}
