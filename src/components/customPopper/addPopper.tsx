import { Popper, Paper, List, ListItem, ClickAwayListener, PopperPlacementType } from '@mui/material';
import { useState } from 'react';

interface CustomPopperProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  options: string[];
  onClose: () => void;
  onSelect: (option: string) => void;
  selected: string | null,
  placement: string,
}

const AddPopper: React.FC<CustomPopperProps> = ({ anchorEl, open, options, onClose, onSelect , selected = null, placement = "right-start"}) => {
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
            {options.map((option, index) => (
              <ListItem
                component="button" 
                key={index}
                onClick={() => onSelect(option)}
                sx={{ border: "0" ,textTransform: 'uppercase', 
                    bgcolor: 'background.soft', 
                    fontSize: '12px', 
                    p: '6px 13px', 
                    cursor: 'pointer', 
                    fontWeight: selected === option ? 600 : 500}}
              >
                {option}
              </ListItem>
            ))}
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default AddPopper;
