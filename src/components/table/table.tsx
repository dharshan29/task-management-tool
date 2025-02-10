import { Card, Table, TableContainer } from "@mui/material";
import TableHeadMain from "./tableHead";


interface CustomTableProps {
    data: Array<object>;
    isLoading: boolean;
    row: React.ComponentType<any>;
}

export default function CustomTable({ data, isLoading, row, ...rest }: CustomTableProps) {
    // const Component = row;

    return (
        <TableContainer>
            <Table size="small">
            <TableHeadMain count={3} status={(data[0] as any).taskStatus}/>
                {/* <TableBody>
                  {(isLoading ? Array.from(new Array(6)) : data?.data).map((item) => {
                    return <Component key={Math.random()} row={item} isLoading={isLoading} {...rest} />;
                  })}
                </TableBody> */}
            </Table>
        </TableContainer>
    )
}