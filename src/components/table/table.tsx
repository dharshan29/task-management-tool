import { Card, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from "@mui/material";
import TableHeadMain from "./tableHead";

interface CustomTableProps {
    data: Array<object>;
    isLoading: boolean;
    row: React.ComponentType<any>;
    addTaskComponent?: React.ComponentType<any>;
}

export default function CustomTable({ data, isLoading, row: RowComponent, addTaskComponent: AddTaskComponent, ...rest }: CustomTableProps) {
    const theme = useTheme();
    return (
        <TableContainer sx={{borderRadius: '12px'}}>
            <Table size="small">
                <TableHeadMain count={3} status={(data[0] as any)?.taskStatus} />
                    <TableBody sx={{bgcolor: theme.palette.background.paper}}>
                        {AddTaskComponent && (
                            <TableRow>
                                <TableCell colSpan={4} sx={{ border: 'none', p: 0 }}>
                                    <AddTaskComponent />
                                </TableCell>
                            </TableRow>
                        )}
                        {data && data.map((item,index) => {
                            return <RowComponent key={index} data={item}/>
                        })}
                    </TableBody>
            </Table>
        </TableContainer>
    );
}
