import { Popper, Paper, List, ListItem, ClickAwayListener, PopperPlacementType } from '@mui/material';
import EditIcon from '@/assets/icons/edit.svg';
import DeleteIcon from '@/assets/icons/delete.svg';
import Image from 'next/image';

interface CustomPopperProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onActionSelect: (option: string) => void;
  placement: string,
}

const ActionPopper: React.FC<CustomPopperProps> = ({ anchorEl, open, onClose, onActionSelect, placement = "left-start"}) => {
  
  return (
    <Popper open={open} 
        anchorEl={anchorEl} 
        placement={placement as PopperPlacementType} 
        sx={{ zIndex: 9, ...(placement === "right-start" ? { top: '15px !important', left: '5px !important' } : {}), }} 
        disablePortal
        modifiers={[
            {
                name: 'flip',
                enabled: true,
                options: {
                  altBoundary: true,
                  rootBoundary: 'viewport',
                },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
              },
            },
          ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper sx={{ borderRadius: "12px", width: '114px', border: "1px solid #7B198426", bgcolor: 'background.soft' }}>
          <List>
              <ListItem
                component="button" 
                onClick={() => onActionSelect("edit")}
                sx={{ border: "0", textTransform: 'uppercase', 
                    bgcolor: 'background.soft', 
                    fontSize: '12px', 
                    p: '6px 13px', 
                    cursor: 'pointer', 
                    fontWeight: 600, display: 'flex', alignItems: 'center'}}
              >
                <Image src={EditIcon} alt="Edit" style={{ marginRight: '8px' }} />
                Edit
              </ListItem>
              <ListItem
                component="button" 
                onClick={() => onActionSelect("delete")}
                sx={{ border: "0", textTransform: 'uppercase', 
                    bgcolor: 'background.soft', 
                    fontSize: '12px', 
                    p: '6px 13px', 
                    color: "#DA2F2F",
                    cursor: 'pointer', 
                    fontWeight: 600, display: 'flex', alignItems: 'center'}}
              >
                <Image src={DeleteIcon} alt="Delete" style={{ marginRight: '8px' }} />
                Delete
              </ListItem>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default ActionPopper;
