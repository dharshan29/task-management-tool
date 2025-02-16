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
import { Close, KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { TaskType } from '../../services/types';
import FileUpload from '../uploadFIles';
import Activity from './Activity';

const style = {
    position: "absolute",
    top: { xs: "auto", sm: "50%" }, 
    bottom: { xs: 0, sm: "auto" }, 
    left: "50%",
    transform: { xs: "translateX(-50%)", sm: "translate(-50%, -50%)" }, 
    bgcolor: "background.default",
    borderRadius: "20px",
    border: "1px solid #00000021",
    width: { xs: "100%", sm: "auto" },
 
  };
  
interface AddUpdateTaskModalProps {
    open: boolean;
    handleClose: () => void;
    loading: boolean,
    handleAction: (payload: TaskType) => void;  
    mode: 'add' | 'update';
    data: TaskType | null;
  }

export default function AddUpdateTaskModal({open, handleClose, loading, handleAction, data = null, mode='add'}: AddUpdateTaskModalProps) {
  const theme = useTheme();
  const styles = useStyles(theme); 

  const [text, setText] = React.useState<string>('');
  const [content, setContent] = React.useState<string>('');
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [status, setStatus] = React.useState<string>('');
  const [category, setCategory] = React.useState<string>('');
  const [openMenu, setOpenMenu] = React.useState<boolean>(false);
  const [files, setFiles] = React.useState<string[]>([]);
  const [toggleContent, setToggleContent] = React.useState<string>("details");


  const handleCreate = () => {
    const taskPayload: TaskType = {
      taskName: text,
      description: content,
      dueOn: selectedDate ?? new Date(),
      category,
      status: status as string,  
      fileLinks: files,
    };
    handleAction(taskPayload);
  };
  
  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleChange = (newContent: string) => {
    setContent(newContent);
  }

  React.useEffect(() => {
      console.log({data})
    if(data){
        setText(data?.taskName);
        setContent(data?.description || '');
        setSelectedDate(data?.dueOn);
        setCategory(data?.category);
        setStatus(data?.status);
        setFiles(data?.fileLinks || []);
    }

    return () => {
      setText('');
      setContent('');
      setSelectedDate(null);
      setStatus('');
      setCategory('');
      setFiles([])
    };
  }, [data, open]);

  return (
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack sx={{ 
            ...style, 
            height: {xs: '95%', sm: '80%'},
            width: { 
            xs: '100%',
            sm: "90%",  
            md: mode === "add" ? "674px" : "1026px" 
        }}} 
    >
            <Stack flexDirection="row" sx={styles.header}>
                <Typography variant='h2' sx={{fontWeight: 600, color: theme.palette.black[400]}}>{mode === 'add' ? 'Create' : 'Update'} Task</Typography>
                <IconButton onClick={handleClose}>
                    <Image src={CloseIcon} alt='close'/>
                </IconButton>
            </Stack>
            <Divider sx={styles.divider}/>
            <Stack flexDirection="row" sx={{flex: 1, maxHeight: {xs: "83%"} }}>
                <Stack sx={{flex: 1, justifyContent: "flex-start", overflowY: "scroll"}}>
                    <Stack sx={{pl: "20px", pr: "24px"}}>
                        {mode === "update" &&<Stack sx={{display: {xs: 'flex', sm: 'none', flexDirection: 'row',gap: '8px', marginTop: '27px', marginBottom: '23px'}}}>
                            <Button
                                sx={{
                                    ...styles.toggleButton,
                                    ...(toggleContent === "details" && styles.activeButton),
                                }}
                                onClick={() => setToggleContent("details")}
                                >
                                Details
                                </Button>
                                <Button
                                onClick={() => setToggleContent("activity")}
                                sx={{
                                    ...styles.toggleButton,
                                    ...(toggleContent === "activity" && styles.activeButton), 
                                }}
                                >
                                Activity
                            </Button>
                        </Stack>}
                        {toggleContent === "details" && <>
                        
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
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <TextEditor content={content} handleChange={handleChange}/> 
                        <Stack sx={{mt: '22px', mb: '31px', justifyContent: 'space-between', flexDirection: {xs: 'column', sm: 'row'}}}> 
                            <Stack>
                                <Typography variant='caption' sx={styles.label}>Task Category*</Typography>
                                <Stack flexDirection="row" gap="10px">
                                    <Button sx={[styles.option, category === 'work' && styles.activeOption]} onClick={() => setCategory('work')}>
                                        Work
                                    </Button>
                                    <Button sx={[styles.option, category === 'personal' && styles.activeOption]} onClick={() => setCategory('personal')}>
                                        Personal
                                    </Button>
                                </Stack>
                            </Stack>
                            <Stack gap="22px" sx={{flexDirection: {xs: 'column', sm: 'row'}}}>
                                <Stack>
                                    <Typography variant='caption' sx={styles.label}>Due on*</Typography>
                                    <SingleDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} mode='modal'/>
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
                                                    fontSize: {xs:12,sm:16},
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
                        <FileUpload files={files} setFiles={setFiles} />
                        <Stack direction="row" mt="8px" spacing={2} sx={{ flexWrap: "wrap" }}>
                            {files.map((file, index) => (
                               <Box
                               key={index}
                               sx={{
                                 position: "relative",
                                 width: 160,
                                 height: 160,
                                 borderRadius: 8,
                                 overflow: "visible", // Ensures the close button is not hidden
                                 display: "flex",
                                 alignItems: "center",
                                 justifyContent: "center",
                                 paddingTop: "12px", // Adds space for the close button
                               }}
                             >
                               {/* Image Preview */}
                               <img
                                 src={file}
                                 alt={`Uploaded file ${index + 1}`}
                                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
                               />
                             
                               {/* Close Icon */}
                               <IconButton
                                 size="small"
                                 sx={{
                                   position: "absolute",
                                   top: -2, // Keeps it outside
                                   right: -16,
                                   border: "0.3px solid #00000026",
                                   bgcolor: "#FAFAFA",
                                 }}
                                 onClick={() => handleRemoveFile(index)}
                               >
                                 <Close fontSize="small" />
                               </IconButton>
                             </Box>
                             
                            ))}
                        </Stack>
                        </>}
                        {toggleContent === "activity" && 
                        <Stack sx={{height: '100%'}}>
                            <Activity />
                        </Stack>
                        }
                    </Stack>
                </Stack>
                {mode === "update" && 
                    <Stack
                        sx={{ display: {xs: 'none', sm: 'flex'}, width: {xs: "35%", md: '355px'}}}>
                        <Stack sx={{height: '45px', px: '16px', borderLeft: '1px solid #00000021', borderBottom: '1px solid #00000021', justifyContent: 'center'}}>
                            <Typography variant='h6' sx={{fontWeight: 600}}>Activity</Typography>
                        </Stack>
                        <Stack sx={{flex: 1, bgcolor: 'background.paper', height: '100%'}}>
                           <Activity />
                        </Stack>
                    </Stack>
                }
            </Stack>
            <Divider sx={{bgcolor: theme.palette.black[100_10]}}/>
            <Stack flexDirection="row" 
                gap="8px"
                sx={styles.footer}>
                <Button sx={styles.button} onClick={handleClose}>
                    CANCEL
                </Button>
                <Button disabled={loading} onClick={handleCreate} sx={[styles.button, styles.buttonFilled]}>
                    {loading ? 'LOADING...' : mode === 'add' ? 'CREATE' : 'UPDATE'}
                </Button>
            </Stack>
        </Stack>
      </Modal>
  );
}