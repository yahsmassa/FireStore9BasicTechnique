import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { StaffReserve, FormReserve } from "../components/firebaseAdvance";
// Material UI's GRID TABLDE is very usefule
// https://mui.com/material-ui/react-table/#data-table

export const MyReserve = (props: { reserves: StaffReserve[] }) => {
  const [rows, setRows] = useState<FormReserve[]>([]);

  useEffect(() => {
    const result: FormReserve[] = [];
    props.reserves.forEach((reserve) => {
      reserve.reserveArray.forEach((item) => {
        const rec = {
          id: [
            reserve.ymd,
            String(reserve.staffNo),
            item.startTime,
            item.endTime,
          ].join("-"),
          ymd: reserve.ymd,
          staffNo: reserve.staffNo,
          clientName: item.clientName,
          menu: item.menu,
          startTime: item.startTime,
          endTime: item.endTime,
        };
        result.push(rec);
      });
    });
    setRows(result);
  }, [props.reserves]);

  //column  setting (header and data items)
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "id",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    { field: "ymd", headerName: "Date", width: 100 },
    { field: "staffNo", headerName: "Staff", width: 50 },
    { field: "clientName", headerName: "Client", width: 150 },
    { field: "menu", headerName: "MENU", width: 100 },
    { field: "startTime", headerName: "Start", width: 90 },
    { field: "endTime", headerName: "End", width: 90 },
  ];

  return (
    <div style={{ height: 400, width: 600, marginTop: "15px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
