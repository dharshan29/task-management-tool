import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import TableHeadMain from "./tableHead";
import { useState, useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";

interface CustomTableProps {
    data?: Array<object>;
    header: string,
    isLoading: boolean;
    row: React.ComponentType<any>;
    addTaskComponent?: React.ComponentType<any>;
}

export default function CustomTable({ data, header, isLoading, row: RowComponent, addTaskComponent: AddTaskComponent, ...rest }: CustomTableProps) {
    const theme = useTheme();
    const [body, setBody] = useState(true);
    const { setNodeRef } = useDroppable({ id: header });

    console.log({data})

    const isLaptop = useMediaQuery(theme.breakpoints.up('sm'))
    return (
        <TableContainer  sx={{borderRadius: '12px', overflow: 'visible'}}>
            <Table size="small">
                <TableHeadMain count={data?.length ?? 0}  header={header} status={data ? (data[0] as any)?.status : undefined} body={body} setBody={setBody} />
                {body && 
                <TableBody ref={setNodeRef} sx={{bgcolor: theme.palette.background.paper, transition: 'transform 0.3s ease-in-out'}}>
                    {isLaptop && AddTaskComponent && (
                        <TableRow>
                            <TableCell colSpan={4} sx={{ border: 'none', p: 0 }}>
                                <AddTaskComponent />
                            </TableCell>
                        </TableRow>
                    )}
                    {data && data.map((item,index) => {
                        return <RowComponent key={index} data={item}/>
                    })} 
                    {data?.length === 0 &&
                        <TableRow 
                             sx={{height: '158px'}}>
                            <TableCell component="th" scope="row" colSpan={4}>
                                <Stack sx={{height: '158px' , width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                    <Typography variant="subtitle1" sx={{fontWeight: 500, color: theme.palette.black[400]}}>
                                        No Task in {header}
                                    </Typography>
                                </Stack>
                            </TableCell>
                         </TableRow>
                    }
                </TableBody>}
            </Table>
        </TableContainer>
    );
}
