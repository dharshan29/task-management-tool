import { TableRow, TableHead, Typography, TableCell } from '@mui/material';

interface TableHeadMainProps {
  count: number;
  status: string;
}

const taskStatus: Record<string, string> = {
  'TO-DO': "Todo",
  'IN-PROGRESS': 'In-Progress',
  'COMPLETED': 'Completed'
};

const headColor: Record<string, string> = {
  'TO-DO': "#FAC3FF",
  'IN-PROGRESS': '#85D9F1',
  'COMPLETED': '#CEFFCC'
};

export default function TableHeadMain({ count, status }: TableHeadMainProps) {
  return (
    <TableHead sx={{ 
      height: '49px', 
      bgcolor: headColor[status], 
      borderBottom: '1px solid #EAECF0'
    }}>
      <TableRow>
        <TableCell colSpan={4} sx={{ border: 'none', py: 1, width: '100%' }}>
          <Typography sx={{ fontWeight: 600 }} variant='body1'>
            {`${taskStatus[status]} (${count})`}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
