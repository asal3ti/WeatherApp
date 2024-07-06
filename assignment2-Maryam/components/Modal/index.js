import styles from "./Modal.module.css";

import { Col, Container, Pagination, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCloudBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faDroplet,
  faLocationDot,
  faSnowflake,
  faSun,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faTemperatureThreeQuarters,
  faWater,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { Cloudy, HeavyRain, MostlyCloudy, Sunny, SunnyHot } from "../svg";
import { useRef, useState, useEffect } from "react";

const Modal = ({ data }) => {
  const svgRef = useRef();

  const [units, setUnits] = useState("C");
  const [color, setColor] = useState(null);

  const offset = 14440;

  useEffect(() => {
    if (svgRef.current) {
      const rect = svgRef.current.querySelector("rect");
      setColor(rect.attributes["fill"].value);
    }
  }, [svgRef]);

  return (
    <Container className={styles.content_spacer} fluid>
      <div className={styles.modal_spacer}>
        <div className={styles.modal_unit_spacer}>
          <span
            className={units === "C" ? styles.selected : ""}
            onClick={() => setUnits("C")}
          >
            &deg;C
          </span>
          <span
            className={units === "F" ? styles.selected : ""}
            onClick={() => setUnits("F")}
          >
            &deg;F
          </span>
        </div>

        <div ref={svgRef} className={styles.modal_svg}>
          {data.weather[0].main === "Clear" && data.main.temp >= 30 && (
            <SunnyHot />
          )}
          {data.weather[0].main === "Clear" && data.main.temp < 30 && <Sunny />}
          {data.weather[0].main === "Clouds" &&
            data.weather.description === "few clouds" && <Cloudy />}
          {data.weather[0].main === "Clouds" &&
            data.weather.description !== "few clouds" && <MostlyCloudy />}
          {data.weather[0].main === "Rain" && <HeavyRain />}
          {data.weather[0].main === "Thunderstorm" && <Cloudy />}
          {data.weather[0].main === "Drizzle" && <Cloudy />}
          {data.weather[0].main === "Snow" && <Cloudy />}
          {data.weather[0].main === "Mist" && <Cloudy />}
        </div>

        <div className={styles.modal_header}>
          <div className={styles.modal_info}>
            <h2>
              <i>
                <FontAwesomeIcon icon={faLocationDot} />
              </i>
              {data.name}
              <span>{data.sys.country}</span>
            </h2>
          </div>
        </div>

        <div className={styles.modal_daily_spacer}>
          {data.daily &&
            data.daily.slice(1, 8).map((item, index) => (
              <div key={index} className={styles.modal_daily_item}>
                <h2>
                  {new Date(
                    (item.dt + (offset + data.timezone)) * 1000
                  ).toLocaleString("en-us", { month: "short", day: "numeric" })}
                </h2>

                {item.weather[0].main === "Clear" && (
                  <i>
                    <FontAwesomeIcon icon={faSun} />
                  </i>
                )}
                {item.weather[0].main === "Clouds" && (
                  <i>
                    <FontAwesomeIcon icon={faCloudSun} />
                  </i>
                )}
                {item.weather[0].main === "Rain" && (
                  <i>
                    <FontAwesomeIcon icon={faCloudShowersHeavy} />
                  </i>
                )}
                {item.weather[0].main === "Drizzle" && (
                  <i>
                    <FontAwesomeIcon icon={faCloudRain} />
                  </i>
                )}
                {item.weather[0].main === "Thunderstorm" && (
                  <i>
                    <FontAwesomeIcon icon={faCloudBolt} />
                  </i>
                )}
                {item.weather[0].main === "Snow" && (
                  <i>
                    <FontAwesomeIcon icon={faSnowflake} />
                  </i>
                )}
                {item.weather[0].main === "Mist" && (
                  <i>
                    <FontAwesomeIcon icon={faWater} />
                  </i>
                )}

                <h3>
                  {units === "C"
                    ? Math.round(item.temp.min)
                    : Math.round((item.temp.min * 9) / 5 + 32)}
                  &nbsp;|&nbsp;
                  {units === "C"
                    ? Math.round(item.temp.max)
                    : Math.round((item.temp.max * 9) / 5 + 32)}{" "}
                  <span>&deg;{units}</span>
                </h3>
              </div>
            ))}
        </div>

        <div className={styles.modal_content}>
          <div className={styles.modal_content_line}>
            <div className={styles.modal_line_header}>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
                </i>
                Current
              </h2>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faTemperatureThreeQuarters} />
                </i>
                Feels Like
              </h2>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faTemperatureArrowDown} />
                </i>
                Min
              </h2>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faTemperatureArrowUp} />
                </i>
                Max
              </h2>
            </div>
            <div className={styles.modal_line_info}>
              <h2>
                {units === "C"
                  ? Math.round(data.main.temp)
                  : Math.round((data.main.temp * 9) / 5 + 32)}
                <span>&deg;{units}</span>
              </h2>
              <h2>
                {units === "C"
                  ? Math.round(data.main.feels_like)
                  : Math.round((data.main.feels_like * 9) / 5 + 32)}
                <span>&deg;{units}</span>
              </h2>
              <h2>
                {units === "C"
                  ? Math.round(data.main.temp_min)
                  : Math.round((data.main.temp_min * 9) / 5 + 32)}
                <span>&deg;{units}</span>
              </h2>
              <h2>
                {units === "C"
                  ? Math.round(data.main.temp_max)
                  : Math.round((data.main.temp_max * 9) / 5 + 32)}
                <span>&deg;{units}</span>
              </h2>
            </div>
          </div>

          <div className={styles.modal_content_line}>
            <div className={styles.modal_line_header}>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faWind} />
                </i>
                Wind Speed
              </h2>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faDroplet} />
                </i>
                Humidity
              </h2>
              <h2>
                <i>
                  <FontAwesomeIcon icon={faArrowDown} />
                </i>
                Pressure
              </h2>
            </div>
            <div className={styles.modal_line_info}>
              <h2>
                {Math.round(data.wind.speed * 3.2)}
                <span>km/h</span>
              </h2>
              <h2>
                {Math.round(data.main.humidity)}
                <span>%</span>
              </h2>
              <h2>
                {Math.round(data.main.pressure)}
                <span>hPa</span>
              </h2>
            </div>
          </div>
        </div>

        {color && (
          <div
            className={styles.modal_footer}
            style={{ background: `linear-gradient(transparent, ${color})` }}
          ></div>
        )}
      </div>
    </Container>
  );
};

export default Modal;
