import { TableRow, TableHead, Typography, TableCell, IconButton, Stack } from '@mui/material';
import Image from 'next/image';
import downIcon from '@/assets/icons/down.svg';

interface TableHeadMainProps {
  count: number;
  header: string;
  status: string;
  body: boolean,
  setBody: React.Dispatch<React.SetStateAction<boolean>>
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

export default function TableHeadMain({ count, header, status, body, setBody }: TableHeadMainProps) {

  return (
    <TableHead sx={{ 
      height: '49px', 
      bgcolor: headColor[header], 
      borderBottom: '1px solid #EAECF0',
      transition: 'background-color 0.5s ease-in-out'
    }}>
      <TableRow>
        <TableCell colSpan={4} sx={{paddingX: '16px', paddingY: 0,  border: 'none', py: 1, width: '100%' }}>
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <Typography sx={{ fontWeight: 600 }} variant='body1'>
              {`${taskStatus[header]} (${count})`}
            </Typography>
            <IconButton sx={{padding: 0}} onClick={() => setBody(prev => !prev)}>
              <Image src={downIcon} alt='arrow' style={{transform: body ? 'scaleY(1)' : 'scaleY(-1)', transition: 'transform 0.3s ease-in-out'}} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}