import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, FormControl, IconButton, InputBase, MenuItem, Select, Stack, TextField, useTheme } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@/assets/icons/close.svg'
import TextEditor from '../textEditor';
import useStyles from './index.style';
import SingleDatePicker from '../datePickers/singleDatePicker';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.default',
  borderRadius: "20px",
  border: "1px solid #00000021"
};

interface AddUpdateTaskModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddUpdateTaskModal({open, handleClose}: AddUpdateTaskModalProps) {
  const theme = useTheme();
  const styles = useStyles(theme); 

  const [content, setContent] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [status, setStatus] = React.useState<string>('');
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);


  const handleChange = (newContent: string) => {
    setContent(newContent);
  }

  return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={{...style, width: "674px", height: '700px'}} >
            <Stack flexDirection="row" sx={styles.header}>
                <Typography variant='h2' sx={{fontWeight: 600, color: theme.palette.black[400]}}>Create Task</Typography>
                <IconButton onClick={handleClose}>
                    <Image src={CloseIcon} alt='close'/>
                </IconButton>
            </Stack>
            <Divider sx={styles.divider}/>
            <Stack sx={{flex: 1, justifyContent: "flex-start", overflowY: "scroll"}}>
                <Stack sx={{pl: "20px", pr: "24px"}}>
                    <TextField variant='outlined' 
                        sx={{
                            height: '38px',
                            my: "12px",
                            '& .MuiOutlinedInput-root': {
                                borderRadius: "8px",
                                background: "#F1F1F15C",
                                '& fieldset': {
                                    borderColor: theme.palette.black[100_21],
                                },
                            },
                            '& .MuiInputBase-input': {
                                '&::placeholder': {
                                    color: "#1E212A"
                                },
                            },
                        }}
                        placeholder='Task Title'
                    />
                    <TextEditor content={content} handleChange={handleChange}/> 
                    <Stack flexDirection="row" sx={{mt: '22px', mb: '31px', justifyContent: 'space-between'}}> 
                        <Stack>
                            <Typography variant='caption' sx={styles.label}>Task Category*</Typography>
                            <Stack flexDirection="row" gap="10px">
                                <Button sx={styles.option}>
                                    Work
                                </Button>
                                <Button sx={styles.option}>
                                    Personal
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack flexDirection="row" gap="22px">
                            <Stack>
                                <Typography variant='caption' sx={styles.label}>Due on*</Typography>
                                <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                            </Stack>
                            <Stack>
                                <Typography variant='caption' sx={styles.label}>Task Status*</Typography>
                                <FormControl sx={{ width: '195px', minWidth: 120 }} size="small">
                                    <Select
                                        displayEmpty
                                        sx={styles.select}
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        onOpen={() => setOpenMenu(true)}
                                        onClose={() => setOpenMenu(false)}
                                        input={<InputBase sx={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px' }} />}
                                        IconComponent={() => openMenu ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
                                        renderValue={(selected) => selected ? selected : "Choose"}
                                        MenuProps={{
                                            PaperProps: {
                                            sx: {
                                                bgcolor: 'background.soft',
                                                borderRadius: "12px",
                                                border: "1px solid #7B198426",
                                                '& .MuiMenuItem-root': {
                                                fontSize: 16,
                                                '&:hover': { bgcolor: '#F1F1F1' },
                                                '&.Mui-selected': { bgcolor: '#7B1984', color: 'white' },
                                                },
                                            },
                                            },
                                        }}
                                    >
                                        <MenuItem value="TO-DO">TO-DO</MenuItem>
                                        <MenuItem value="IN-PROGRESS">IN-PROGRESS</MenuItem>
                                        <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Typography variant='caption' sx={styles.label}>Attachment</Typography>
                </Stack>
            </Stack>
            <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
            <Stack flexDirection="row" 
                gap="8px"
                sx={styles.footer}>
                <Button sx={styles.button}>
                    CANCEL
                </Button>
                <Button disabled={false} sx={[styles.button, styles.buttonFilled]}>
                    CREATE
                </Button>
            </Stack>
        </Stack>
      </Modal>
  );
}