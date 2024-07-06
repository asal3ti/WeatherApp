import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Content from "@/components/Content";
import { weatherAtom } from "@/store/jotaiState";
import { useAtom } from "jotai";

const SearchList = () => {
  const router = useRouter();
  const { city } = router.query;
  const [weather, setWeather] = useAtom(weatherAtom);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (weather.length > 0 && city) {
      console.log(weather);
      setResults(
        weather.filter((item) => item.name.toLowerCase() === city.toLowerCase())
      );
    }
  }, [weather, city]);

  // useEffect(() => {
  //   if (localStorage.getItem("weatherData"))
  //     setWeather(JSON.parse(localStorage.getItem("weatherData")));
  //   else router.push("/");
  // }, [city]);

  return <Content weather={results} />;
};

export default SearchList;
