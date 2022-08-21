import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import programImg from "../assets/kids1.jpeg";
import { getActivePrograms } from "../Hooks/Programs.js";

const UserHomePage = () => {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const getDaPrograms = async () => {
      const activePrograms = await getActivePrograms();
      setPrograms(activePrograms.programs);
    };
    getDaPrograms();
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <Row xs={1} md={3} className="g-4" id="programGrid">
        {programs.map((item, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img variant="top" src={item.photo} alt="" />
              <Card.Body>
                <Card.Title>{item.programName}</Card.Title>
                <Card.Text>
                  Start: {item.startDate} <br />
                  End: {item.endDate}
                </Card.Text>
              </Card.Body>
              <Button
                variant="dark"
                onClick={() => {
                  localStorage.setItem("program", JSON.stringify(item));
                  navigate("/program-details");
                }}
              >
                More Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserHomePage;
