import styles from "./Card.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faLocationDot,
  faSnowflake,
  faSun,
  faTemperature2,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

import { useRef } from "react";
import { gsap } from "gsap";
import {
  MostlyCloudy,
  Cloudy,
  Sunny,
  SunnyHot,
  Snow,
  HeavyRain,
} from "@/components/svg";

const Card = ({ data }) => {
  const revealRef = useRef();
  const offset = 14440;

  const revealAnimation = () => {
    gsap.to(revealRef.current, { duration: 0.4, bottom: 0 });

    const days = revealRef.current.querySelectorAll(".day");

    let delay = 0.3;

    for (let i = 0; i < days.length; i++) {
      const h2 = days[i].querySelector("h2");
      const h3 = days[i].querySelector("h3");
      const icon = days[i].querySelector("i");

      gsap.to(days[i], { delay, duration: 0.3, opacity: 1 });
      gsap.to(h2, { delay: delay + 0.2, duration: 0.3, opacity: 1 });
      gsap.to(h3, { delay: delay + 0.3, duration: 0.3, opacity: 1 });
      gsap.to(icon, { delay: delay + 0.1, duration: 0.3, opacity: 1 });
      delay += 0.15;
    }
  };
  const hideAnimation = () => {
    const days = revealRef.current.querySelectorAll(".day");

    for (let i = 0; i < days.length; i++) {
      const h2 = days[i].querySelector("h2");
      const h3 = days[i].querySelector("h3");
      const icon = days[i].querySelector("i");

      gsap.to(h2, { opacity: 0, duration: 0.2, right: "10px", delay: 0.2 });
      gsap.to(h3, { opacity: 0, duration: 0.2, right: "10px", delay: 0.2 });
      gsap.to(icon, { opacity: 0, duration: 0.2, delay: 0.2 });
    }

    gsap.to(revealRef.current, { duration: 0.4, bottom: -40 });
    gsap.to(days, { opacity: 0, duration: 0.2, delay: 0.2 });
  };

  return (
    <div
      className={styles.card_spacer}
      onMouseEnter={revealAnimation}
      onMouseLeave={hideAnimation}
    >
      <div className={styles.card_svg}>
        {data.weather[0].main === "Clear" && data.main.temp >= 30 && (
          <SunnyHot />
        )}
        {data.weather[0].main === "Clear" && data.main.temp < 30 && <Sunny />}
        {data.weather[0].main === "Clouds" &&
          data.weather[0].description === "few clouds" && <Cloudy />}
        {data.weather[0].main === "Clouds" &&
          data.weather[0].description !== "few clouds" && <MostlyCloudy />}
        {data.weather[0].main === "Rain" && <HeavyRain />}
        {data.weather[0].main === "Thunderstorm" && <Cloudy />}
        {data.weather[0].main === "Drizzle" && <Cloudy />}
        {data.weather[0].main === "Snow" && <Snow />}
        {data.weather[0].main === "Mist" && <Cloudy />}
      </div>

      <div className={styles.card_header}>
        <h2>
          <i>
            {/* <FontAwesomeIcon icon={faLocationDot} /> */}
            <img
              src={`http://openweathermap.org/images/flags/${data.sys.country.toLowerCase()}.png`}
              alt={data.sys.country}
            />
          </i>
          {data.name}
          <span>{data.sys.country}</span>
        </h2>
        <h3>
          {data.coord.lat}, {data.coord.lon}
        </h3>
        <div className={styles.card_info}>
          <div className={styles.description}>
            {data.weather[0].description
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
          <h2 className={styles.temperature}>
            <i>
              <FontAwesomeIcon icon={faTemperature2} />
            </i>
            {Math.round(data.main.temp)}
            <span>&deg;C</span>
          </h2>
        </div>
      </div>

      <div ref={revealRef} className={styles.reveal_div}>
        {data.daily &&
          data.daily.slice(1, 5).map((item, index) => (
            <div key={index} className={styles.day_reveal + " day"}>
              <h2>
                {new Date(
                  (item.dt + (offset + data.timezone)) * 1000
                ).toLocaleString("en-us", { weekday: "short" })}
              </h2>
              <h3>
                {Math.round(item.temp.day)}
                <span>&deg;C</span>
              </h3>
              <i>
                {item.weather[0].main === "Clear" && (
                  <FontAwesomeIcon icon={faSun} />
                )}
                {item.weather[0].main === "Clouds" && (
                  <FontAwesomeIcon icon={faCloudSun} />
                )}
                {item.weather[0].main === "Rain" && (
                  <FontAwesomeIcon icon={faCloudShowersHeavy} />
                )}
                {item.weather[0].main === "Drizzle" && (
                  <FontAwesomeIcon icon={faCloudRain} />
                )}
                {item.weather[0].main === "Thunderstorm" && (
                  <FontAwesomeIcon icon={faCloudBolt} />
                )}
                {item.weather[0].main === "Snow" && (
                  <FontAwesomeIcon icon={faSnowflake} />
                )}
                {item.weather[0].main === "Mist" && (
                  <FontAwesomeIcon icon={faWater} />
                )}
              </i>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
