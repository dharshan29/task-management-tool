import { Card, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from "@mui/material";
import TableHeadMain from "./tableHead";
import { useState, useEffect } from "react";

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

    return (
        <TableContainer sx={{borderRadius: '12px'}}>
            <Table size="small">
                <TableHeadMain count={data?.length ?? 0}  header={header} status={data ? (data[0] as any)?.status : undefined} body={body} setBody={setBody} />
                {body && <TableBody sx={{bgcolor: theme.palette.background.paper, transition: 'transform 0.3s ease-in-out'}}>
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
                </TableBody>}
            </Table>
        </TableContainer>
    );
}
