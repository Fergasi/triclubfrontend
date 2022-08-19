import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";
import { getActivePrograms } from "../Hooks/Programs.js";

const UserHomePage = () => {
  const activePrograms = getActivePrograms();
  return (
    <>
      <br />
      <br />
      <br />
      <Row xs={1} md={3} className='g-4' id='programGrid'>
        {Array.from({ length: 12 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant='top' src={programImg} alt='' />
              <Card.Body>
                <Card.Title>Swim Training</Card.Title>
                <Card.Text>
                  Time: Tuesday 15th August, 5pm
                  <br />
                  Place: Longmount Public Pool
                  <br />
                  Type: Swim
                </Card.Text>
              </Card.Body>
              <Button variant='dark'>More Details</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserHomePage;
