import {
  arrayUnion,
  arrayRemove,
  collection,
  FieldPath,
  FieldValue,
} from "firebase/firestore";
import { db } from "./firebase";
import Swal from "sweetalert2";

import {
  orderBy,
  limit,
  query,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import type {
  Query,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

// This interface is made by Web Service
// https://app.quicktype.io/

// Copy and Paste

export interface StaffReserve {
  ymd: string;
  staffNo: number;
  reservableTime: number;
  reserveArray: Reserve[];
}

export interface Reserve {
  clientName: string;
  menu: string;
  startTime: string;
  endTime: string;
}

// export type FormReserve = Pick<StaffReserve, "ymd" | "staffNo"> | Reserve;
export interface FormReserve {
  ymd: string;
  staffNo: number;
  clientName: string;
  menu: string;
  startTime: string;
  endTime: string;
}

export const makeStaffReserveObject = (
  ymd: string,
  staffNo: number,
  clientName: string,
  menu: string,
  startTime: string,
  endTime: string
) => {
  return {
    ymd: ymd,
    staffNo: staffNo,
    reserveArray: [makeReserveObject(clientName, menu, startTime, endTime)],
  };
};

export const makeReserveObject = (
  clientName: string,
  menu: string,
  startTime: string,
  endTime: string
) => {
  return {
    clientName: clientName,
    menu: menu,
    startTime: startTime,
    endTime: endTime,
  };
};

//example: 20220901 and 1 => 20220901-01
export const getStaffReserveId = (ymd: string, staffNo: number) =>
  ymd + "-" + ("00" + staffNo).slice(-2);

export const addStaffReserve = async (
  ymd: string,
  staffNo: number,
  clientName: string,
  menu: string,
  startTime: string,
  endTime: string
) => {
  const id = getStaffReserveId(ymd, staffNo);
  const staffReserveRecord = makeStaffReserveObject(
    ymd,
    staffNo,
    clientName,
    menu,
    startTime,
    endTime
  );
  console.log("staffReserveRecord", staffReserveRecord);
  try {
    await setDoc(doc(db, "staff_reserve", id), staffReserveRecord);
  } catch (error) {
    Swal.fire("staffReserveRecord", "Can't Add Staff Reserve data", "error");
  }
};

export const addReserve = async (
  ymd: string,
  staffNo: number,
  clientName: string,
  menu: string,
  startTime: string,
  endTime: string
) => {
  const id = getStaffReserveId(ymd, staffNo);
  const docRef = doc(db, "staff_reserve", id);
  const mydoc = await getDoc(docRef);
  if (mydoc.exists()) {
    const reserve = makeReserveObject(clientName, menu, startTime, endTime);
    try {
      await updateDoc(docRef, {
        reserveArray: arrayUnion(reserve),
      });
    } catch (error) {
      Swal.fire("addReserveRecord", "Can't add Reserve Data", "error");
    }
  } else {
    addStaffReserve(ymd, staffNo, clientName, menu, startTime, endTime);
  }
  Swal.fire("Reserve Success");
};

// Find  Data From Array
export const findReserve = (
  staffReserveRecord: StaffReserve,
  startTime: string,
  endTime: string
) => {
  console.log("aray", staffReserveRecord.reserveArray);
  for (const reserve of staffReserveRecord.reserveArray) {
    if (reserve.startTime == startTime && reserve.endTime == endTime) {
      return reserve;
    }
  }
};

export const removeReserve = async (
  ymd: string,
  staffNo: number,
  startTime: string,
  endTime: string
) => {
  const id = getStaffReserveId(ymd, staffNo);
  const staffReserveRef = doc(db, "staff_reserve", id);
  const myDoc = await getDoc(staffReserveRef);
  if (!myDoc.exists()) {
    Swal.fire("removeReserveRecord", "Can't Find StaffReserveData", "error");
    return;
  }
  const ExistReserve = myDoc.data() as StaffReserve;
  const reserve = findReserve(ExistReserve, startTime, endTime);
  if (reserve) {
    try {
      await updateDoc(staffReserveRef, {
        reserveArray: arrayRemove(reserve),
      });
    } catch (error) {
      Swal.fire("removeReserveRecord", "Can't Edit Record", "error");
    }
  } else {
    Swal.fire("removeReserveRecord", "Can't Find Reserve", "error");
  }
  Swal.fire("removeReserveRecord", "Reserve is Canceld", "success");
};

export const getStaffReserve = async () => {
  const q = query(collection(db, "staff_reserve"), orderBy("ymd"));
  try {
    const myQuerySnapshot = await getDocs(q);
    return myQuerySnapshot.docs.map(
      (doc: QueryDocumentSnapshot<DocumentData>) => doc.data() as StaffReserve
    );
  } catch (error) {
    console.log(error);
    Swal.fire("getStaffReserve", "Can't Return Records", "error");
    return [];
  }
};
