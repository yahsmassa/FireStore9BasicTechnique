import { useEffect, useState } from "react";
import {
  StaffReserve,
  FormReserve,
  removeReserve,
} from "../components/firebaseAdvance";

export const MyList = (props: { reserves: StaffReserve[] }) => {
  const [rows, setRows] = useState<FormReserve[]>([]);

  useEffect(() => {
    const result: FormReserve[] = [];
    props.reserves.forEach((reserve) => {
      reserve.reserveArray.forEach((item) => {
        const rec: FormReserve = {
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

  function renderHead() {
    return (
      <tr>
        {["Date", "Staff", "Client", "Menu", "Start", "End", "Cancel"].map(
          (item, index) => (
            <th className="text-left p-4" key={index}>
              {item}
            </th>
          )
        )}
      </tr>
    );
  }

  function renderRow() {
    return rows.map((row, i) => {
      return (
        <tr
          key={i}
          className={`${
            i % 2 === 0 ? "bg-blue-100" : "bg-blue-200"
          } table-auto`}
        >
          <td className="text-left p-2">{row.ymd}</td>
          <td className="text-left p-2">{row.staffNo}</td>
          <td className="text-left p-2">{row.clientName}</td>
          <td className="text-left p-2">{row.menu}</td>
          <td className="text-left p-2">{row.startTime}</td>
          <td className="text-left p-2">{row.endTime}</td>
          <td className="text-left p-2">
            <button
              onClick={() => {
                removeReserve(row.ymd, row.staffNo, row.startTime, row.endTime);
                setRows((prev) =>
                  prev.filter(
                    (item) =>
                      !(
                        item.ymd == row.ymd &&
                        item.staffNo == row.staffNo &&
                        item.startTime == row.startTime &&
                        item.endTime == row.endTime
                      )
                  )
                );
              }}
              className="flex justify-center items-center p-2 m-1 rounded-full text-zinc-400 hover:text-green-600 hover:bg-white "
            >
              Cancel
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <table className="w-full rounded-xl overflow-hidden table-auto">
      <thead
        className={`
                bg-gradient-to-r from-blue-500 to-blue-400 text-gray-100
            `}
      >
        {renderHead()}
      </thead>
      <tbody>{renderRow()}</tbody>
    </table>
  );
};
