// component/NavBar/index.js

import styles from "./Nav.module.css";

import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";

import { useEffect, useState } from "react";

import { fetchById, fetchBySearch } from "@/store/fetch";
import { useAtom } from "jotai";
import { errorAtom, weatherAtom } from "@/store/jotaiState";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const [weather, setWeather] = useAtom(weatherAtom);
  const [error, setError] = useAtom(errorAtom);
  const [search, setSearch] = useState("");
  const [searchArray, setSearchArray] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let data;
      if (/^[0-9]+$/.test(search)) {
        data = await fetchById(search);
      } else {
        data = await fetchBySearch(search);
        if (data && data.length > 0) {
          router.push("/search/" + data[0].name);
        } else {
          setError("No results found for the search query.");
          return;
        }
      }
      setWeather((prev) => {
        const updated = [...prev, ...data];
        localStorage.setItem("weatherData", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const clearData = () => {
    setWeather([]);
    localStorage.clear("weatherData");
    router.push("/");
  };

  const handleChange = (e) => setSearch(e.target.value);

  useEffect(() => setSearchArray(weather.slice(-4)), [weather]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">YourWeatherApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Visited Cities" id="navbarScrollingDropdown">
              {searchArray &&
                searchArray.map((data, index) => (
                  <NavDropdown.Item
                    className={styles.visited_item}
                    key={index}
                    href={`/id/${data.id}`}
                  >
                    {data.name}, {data.sys.country}
                    <span>{data.id}</span>
                  </NavDropdown.Item>
                ))}

              <NavDropdown.Divider />

              <NavDropdown.Item key={"clear"} onClick={clearData}>
                Clear History
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
          {error && <div className={styles.nav_error_spacer}>{error}</div>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
