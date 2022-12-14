import React, { useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import programImg from "../assets/kids1.jpeg";
import { getActivePrograms } from "../Hooks/Programs.js";
import Spinner from "react-bootstrap/Spinner";

const UserHomePage = () => {

  const navigate = useNavigate();
  const [programs, setPrograms] = useState(null);


  useEffect(() => {
    const getDaPrograms = async () => {
      const activePrograms = await getActivePrograms();
      setPrograms(activePrograms.programs);
    };
    getDaPrograms();
  }, []);

  return (
    <>
      {Array.isArray(programs) && programs.length > 0 && (
        <>
          <br />
          <br />
          <br />
          <Row xs={1} md={3} className='g-4' id='programGrid'>
            {programs.map((item, idx) => (
              <Col key={idx}>
                <Card style={{ height: "100%" }}>
                  <Card.Img
                    variant='top'
                    src={item.photo}
                    alt=''
                    style={{ aspectRatio: "550/350" }}
                  />
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div id='titleArea'>
                      <Card.Title>{item.programName}</Card.Title>
                    </div>
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
      )}
      {programs === null && <Spinner animation='border' />}
    </>
  );
};

export default UserHomePage;
