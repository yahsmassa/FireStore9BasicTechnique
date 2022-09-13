import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Button from "@mui/material/Button";
import { MyTable } from "../components/MyTable";
import { MyAlert } from "../components/MyAlert";

import {
  getUserRecords,
  User,
  addUserRecord,
  deleteAllUserRecord,
  usersRef,
} from "../components/firebase";
import { query, limit, orderBy, where } from "firebase/firestore";
import jsonUsers from "../public/users.json";
import Swal from "sweetalert2";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [jsonusers, setJsonusers] = useState(jsonUsers); // for table test

  const addUsers = () => {
    try {
      jsonUsers.forEach((jsonUser: User) => {
        addUserRecord(jsonUser);
      });
      getAllUsers();
      Swal.fire("myAdd", "User Records is uploaded");
    } catch (error) {}
  };

  const allDelete = () => {
    deleteAllUserRecord();
    getAllUsers();
  };

  const getAllUsers = async () => {
    const q = query(usersRef, orderBy("id"));
    const users = await getUserRecords(q);
    setUsers(users);
    console.log("getAllusers", users);
  };

  const clearTable = () => setUsers([]);

  // for Query Sample
  const getPartUsers = async () => {
    const q = query(
      usersRef,
      where("id", ">=", 5),
      where("id", "<=", 10),
      orderBy("id", "desc"),
      limit(3)
    );
    const users = await getUserRecords(q);
    setUsers(users);
    console.log("getPartusers", users);
  };

  return (
    <div className="w-[1000px] ml-5  mt-10 ">
      <div className="navbar bg-base-100">
        <Link href="/reserve">
          <a className="link link-primary normal-case text-xl">
            Reservation Menu
          </a>
        </Link>
      </div>
      <MyAlert
        className="w-[600px] mb-12 justify-center"
        message="firebase and grid table"
      />
      <div className="mb-5 ">
        {/* Button is Material UI */}
        <Button
          className="mx-2 w-72 text-blue-500 hover:text-white"
          variant="contained"
          onClick={() => addUsers()}
        >
          Upload from Json to Firebase
        </Button>
        <Button
          className="mx-2 w-72 text-blue-500  hover:text-white"
          variant="contained"
          onClick={() => allDelete()}
        >
          Delete all Data from Firebase
        </Button>
        <br />
        <Button
          className="mx-2 mt-8 w-72"
          variant="outlined"
          onClick={() => getAllUsers()}
        >
          Request All Data from firestore
        </Button>
        <Button
          className="mx-2 mt-8 w-72"
          variant="outlined"
          onClick={() => getPartUsers()}
        >
          Request part data (Query)
        </Button>
        <br />
        <Button
          className="mx-2 mt-2 w-72"
          variant="outlined"
          onClick={() => clearTable()}
        >
          Clear Table Data
        </Button>
      </div>
      <MyTable users={users} />
    </div>
  );
};

export default Home;
