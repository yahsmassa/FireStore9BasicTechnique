import { useState } from "react";
import { FormReserve, addReserve } from "./firebaseAdvance";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import {
  getDays7,
  getYmdArray,
  getYMD2Y_M_D,
  getRangeTimeArray,
  getAddMinutesTime,
} from "./util";
import { ChangeEvent, SyntheticEvent } from "react";
import { useForm } from "./useForm";

export const MyForm = () => {
  const [ymds, setYmds] = useState(getYmdArray(getDays7(new Date()).slice(1)));
  const [times, setTimes] = useState(getRangeTimeArray("10:00", "18:00", 60));
  const { values, handleInputChange, reset, setEditValues } =
    useForm<FormReserve>({
      ymd: "",
      staffNo: 1,
      clientName: "",
      menu: "",
      startTime: "",
      endTime: "",
    });

  const { ymd, staffNo, startTime, endTime, clientName, menu } = values;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    addReserve(ymd, staffNo, clientName, menu, startTime, endTime);
    reset();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="w-[900px] pl-4 shadow-lg">
        <div className="flex flex-row mb-3 justify-between">
          <div className="text-2xl ">Reservation</div>
          <Button className="mr-5 text-xl" variant="outlined" type="submit">
            Reserve
          </Button>
        </div>

        <div className="flex flex-row">
          {/* YMD */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 170 }}>
            <InputLabel id="ymd-label">YMD</InputLabel>
            <Select
              labelId="ymd-label"
              id="demo-simple-select-autowidth"
              value={ymd as any}
              onChange={({ target }: SelectChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value as string, "ymd")
              }
              autoWidth
              required
              label="YMD"
            >
              {ymds.map((ymd, index) => (
                <MenuItem key={index} value={ymd}>
                  {getYMD2Y_M_D(ymd)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ height: 2 }} />

          {/* StaffNo */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 150 }}>
            <InputLabel id="Staff-label">Staff</InputLabel>
            <Select
              labelId="Staff-label"
              id="demo-simple-select-autowidth"
              value={staffNo as any}
              onChange={({ target }: SelectChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value as string, "staffNo")
              }
              required
              autoWidth
              label="Staff"
            >
              {["Tom", "Jenny", "Bob"].map((item, index) => (
                <MenuItem key={index} value={index + 1}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ height: 2 }} />

          {/* Clinent Name */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 150 }}>
            <TextField
              value={clientName as any}
              type="text"
              variant="filled"
              label="Client Name"
              onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value, "clientName")
              }
              required
            />
          </FormControl>

          {/* Menu */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 150 }}>
            <InputLabel id="Menu-label">Menu</InputLabel>
            <Select
              labelId="Menu-label"
              id="demo-simple-select-autowidth"
              value={menu as any}
              onChange={({ target }: SelectChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value as string, "menu")
              }
              autoWidth
              required
              label="MENU"
            >
              {["CUT", "PERM", "COLOR"].map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ height: 2 }} />

          {/* Start Time */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 150 }}>
            <InputLabel id="StartTime-label">StartTime</InputLabel>
            <Select
              labelId="StartTime-label"
              id="demo-simple-select-autowidth"
              value={startTime as any}
              onChange={({ target }) => {
                // handleInputChange(target.value as string, "startTime");
                setEditValues({
                  ...values,
                  startTime: target.value,
                  endTime: getAddMinutesTime(target.value, 60),
                });
              }}
              required
              autoWidth
              label="startTime"
            >
              {times.slice(0, -1).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ height: 2 }} />

          {/* EndTime */}
          <FormControl sx={{ m: 1, minWidth: 80, width: 150 }}>
            <InputLabel id="EndTime-label">EndTime</InputLabel>
            <Select
              labelId="EndTime-label"
              id="endTime"
              value={endTime as any}
              onChange={({ target }: SelectChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value as string, "endTime")
              }
              autoWidth
              required
              label="EndTime"
            >
              {times.slice(1).map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ height: 2 }} />
        </div>
        <Box sx={{ height: 10 }} />
      </div>
    </form>
  );
};
