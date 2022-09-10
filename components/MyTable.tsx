import { User } from "./firebase";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Material UI's GRID TABLDE is very usefule
// https://mui.com/material-ui/react-table/#data-table
interface iTable {
  name: string;
  id: number;
  email: string;
  city: string;
}

export const MyTable = (props: { users: User[] }) => {
  const [rows, setRows] = useState<iTable[]>([]);

  useEffect(() => {
    const recs = props.users.map((usr) => {
      const rec: iTable = {
        name: usr.username,
        id: usr.id,
        email: usr.email,
        city: usr.address.city,
      };
      return rec;
    });
    setRows(recs);
  }, [props.users]);

  //column  setting (header and data items)
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "email", headerName: "Email", width: 240 },
  ];

  return (
    <div style={{ height: 400, width: 600 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
