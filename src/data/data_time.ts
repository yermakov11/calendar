import axios from "axios";

export const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",];

export const MOCKAPPS = [
  { date: new Date(2024, 2, 3), title: "appointment", color: "#238783" },
  { date: new Date(2024, 2, 6), title: "doctos", color: "#708898" },
  { date: new Date(2024, 2, 13), title: "bd", color: "#047106" },
  { date: new Date(2024, 2, 9), title: "second", color: "#371395" },
];

export const fetchHolidays = async ( year: number,countryCode: string): Promise<string[]> => {
  try {
    const URL = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;
    const response = await axios.get(URL);
    if (!response.data) {
      throw new Error("Failed to fetch holidays");
    }
    const holidayNames = response.data.map((holiday: any) => holiday.date);
    return holidayNames;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    throw error;
  }
};
