//11:00 12:00 -> 1.0
export const getDiffTime = (strTime: string, endTime: string): number => {
  const date1 = new Date(getTodayStr() + " " + strTime);
  const date2 = new Date(getTodayStr() + " " + endTime);
  const diff = date2.getTime() - date1.getTime();
  return diff / (60 * 60 * 1000);
};

export const getAddMinutesTime = (
  strTime: string,
  addMinutes: number
): string => {
  const date1 = new Date(getTodayStr() + " " + strTime);
  date1.setMinutes(date1.getMinutes() + addMinutes);
  const endTime =
    String(date1.getHours()).padStart(2, "0") +
    ":" +
    String(date1.getMinutes()).padStart(2, "0");
  return endTime;
};

export const getRangeTimeArray = (
  startTime: string,
  endTime: string,
  Minutes: number
) => {
  const times = Math.floor((getDiffTime(startTime, endTime) * 60) / Minutes);
  const timeArray: string[] = [];
  for (let i = 0; i <= times; i++) {
    timeArray.push(getAddMinutesTime(startTime, Minutes * i));
  }
  return timeArray;
};

//YYYYMMDD for Today
export const getTodayYMD = (): string => {
  const now = new Date();
  return String(
    now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate()
  );
};
// 20220202 -> 2022/02/02
export const getYMD2Y_M_D = (ymd: string): string => {
  const now = new Date();
  return [ymd.substring(0, 4), ymd.substring(4, 6), ymd.substring(6, 8)].join(
    "/"
  );
};

//YYYY-MM-DD for Today
export const getTodayStr = (): string => {
  const ymd = getTodayYMD();
  return [ymd.substring(0, 4), ymd.substring(4, 6), ymd.substring(6, 8)].join(
    "-"
  );
};

// Date:2022/3/9  -> 220309
export const getDate2ymd = (date: Date): string => {
  const yyyymmdd = String(
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
  return yyyymmdd;
};

// Date; 2022/3/9  -> 3/9
export const getDate2MD = (date: Date): string => {
  return String(date.getMonth() + 1) + "/" + String(date.getDate());
};
// getWeekday（DateType）　-> Week
export const getWeekday = (date: Date) => {
  return ["Sun", "Mon", "Tue", "Wen", "Thu", "Fry", "Sut"][date.getDay()];
};

// "20220309" => Date
export const getYMD2Date = (YMD: string): Date => {
  const ymdStr =
    YMD.substring(0, 4) + "/" + YMD.substring(4, 6) + "/" + YMD.substring(6, 8);
  return new Date(ymdStr);
};

// getDays("1/1",3) => [1/1  1/2 1/3]
export const getDays = (dateZero: Date, Days: number): Date[] => {
  const date = new Date(dateZero);
  const dateNumberArray = [...Array(Days)].map((item, idx) =>
    idx === 0
      ? date.setDate(date.getDate() + 0)
      : date.setDate(date.getDate() + 1)
  );
  return dateNumberArray.map((item) => new Date(item));
};
// getNthDay("1/1",3) => 1/4
export const getNthDay = (dateZero: Date, nth: number): Date => {
  const date = new Date(dateZero);
  const myDate =
    nth > 0
      ? date.setDate(date.getDate() + nth)
      : date.setDate(date.getDate() - Math.abs(nth));

  return new Date(myDate);
};

// isPast(date:2022/3/9) -> If it's the past compared to today, True
export const isPast = (date: Date): Boolean => {
  return getDate2ymd(date) < getDate2ymd(new Date()) ? true : false;
};

//base dateー＞ Array of 7 consecutive days including the base date
export const getDays7 = (baseDate: Date): Date[] => getDays(baseDate, 7);

//date[] -> string[] yymmdd
export const getYmdArray = (dateArray: Date[]): string[] =>
  dateArray.map((item) => getDate2ymd(item));

//日付配列　-> ["火","水","木"] 的な文字列の配列
export const getWeeks = (dateArray: Date[]) =>
  dateArray.map((item) => getWeekday(item));

//日付配列　-> ["3/9","3/10","3/11"] 的な文字列の配列
export const getMDStrings = (dateArray: Date[]) =>
  dateArray.map((item) => getDate2MD(item));
