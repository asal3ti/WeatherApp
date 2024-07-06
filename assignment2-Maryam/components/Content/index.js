import styles from "./Content.module.css";

import { useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";

import Link from "next/link";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MAX = 3;

const Content = ({ weather }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(weather.length / MAX);

  return (
    <Container className={styles.content_spacer} fluid>
      <Row className={styles.row_spacer}>
        <Col
          xs={1}
          className={styles.col_pagination}
          onClick={() => setPage(page > 1 ? page - 1 : page)}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Col>

        {weather && (
          <>
            {weather.slice((page - 1) * MAX, page * MAX).map((data, index) => (
              <Link key={index} href={`/id/${data.id}`}>
                <Col key={index} xs={3} className={styles.col_card}>
                  <Card data={data} />
                </Col>
              </Link>
            ))}
          </>
        )}

        <Col
          xs={1}
          className={styles.col_pagination}
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Col>
      </Row>

      <Pagination className={styles.pagination_spacer} size="sm">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            className={styles.pagination_item}
            key={index}
            active={page === index + 1}
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Content;
