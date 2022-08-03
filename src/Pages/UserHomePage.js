import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";

const UserHomePage = () => {
  return (
    <>
      <br />
      <br />
      <br />

      <Row xs={1} md={3} className='g-4' id='programGrid'>
        {Array.from({ length: 9 }).map((_, idx) => (
          <Col>
            <Card bg='dark'>
              <Card.Img variant='top' src={programImg} alt='' />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserHomePage;
