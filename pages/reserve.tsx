import { useState, Fragment } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Button from "@mui/material/Button";

import {
  removeReserve,
  addReserve,
  getStaffReserve,
  StaffReserve,
} from "../components/firebaseAdvance";
import Swal from "sweetalert2";
import { MyForm } from "../components/MyForm";
import { MyReserve } from "../components/MyReserve";
import { MyList } from "../components/MyList";

const Home: NextPage = () => {
  const [staffReserve, setstaffReserve] = useState<StaffReserve[]>([]);
  const getReserveData = async () => {
    const reserve = await getStaffReserve();
    setstaffReserve(reserve);
  };
  return (
    <div className="w-[900px] ml-5  mt-10 ">
      <div className="navbar bg-base-100">
        <Link href="/">
          <a className="link link-primary normal-case text-xl">Home</a>
        </Link>
      </div>

      <MyForm />
      <div className="mt-5">
        <Button
          className="mx-2 my-5 w-72 text-blue-500 hover:text-white"
          variant="contained"
          onClick={() => getReserveData()}
        >
          Get Reserve Data
        </Button>
        <MyList reserves={staffReserve} />
      </div>
    </div>
  );
};

export default Home;
