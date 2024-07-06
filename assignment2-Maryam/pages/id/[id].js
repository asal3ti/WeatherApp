import Modal from "@/components/Modal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { weatherAtom } from "@/store/jotaiState";
import { useAtom } from "jotai";
const SingleDisplay = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);
  const [weather, setWeather] = useAtom(weatherAtom);

  useEffect(() => {
    if (weather && id) {
      const index = weather.findIndex((item) => item.id === parseInt(id));
      setData(weather[index]);
    }
  }, [weather, id]);

  return <div>{data && <Modal data={data} />}</div>;
};

export default SingleDisplay;
