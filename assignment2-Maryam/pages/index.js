/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Maryam Setayeshnia Student ID: 143893220 Date: 2024-07-04
 *
 *
 ********************************************************************************/
import Content from "@/components/Content";
import { weatherAtom } from "@/store/jotaiState";
import { useAtom } from "jotai";

import { fetchByLocation } from "@/store/fetch";
import { useEffect } from "react";

export default function Home() {
  const [weather, setWeather] = useAtom(weatherAtom);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("weatherData")) {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        );
        const data = await fetchByLocation(
          position.coords.latitude,
          position.coords.longitude
        );

        if (data) {
          setWeather([data]);
          localStorage.setItem("weatherData", JSON.stringify([data]));
        } else {
          console.log("Error occurred fetching data.");
        }
      } else {
        setWeather(JSON.parse(localStorage.getItem("weatherData")));
      }
    };

    if (weather.length === 0) fetchData();
  }, [weather, fetchByLocation]);

  return <Content weather={weather} />;
}
