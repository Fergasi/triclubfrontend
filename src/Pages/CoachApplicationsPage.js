import React from "react";

const CoachApplications = () => {
  return (
    // <Row xs={1} md={3} className='g-4' id='programGrid'>
    //   {Array.from({ length: 12 }).map((_, idx) => (
    //     <Col key={idx}>
    //       <Card>
    //         <Card.Img variant='top' src={programImg} alt='' />
    //         <Card.Body>
    //           <Card.Title>Swim Training</Card.Title>
    //           <Card.Text>
    //             Time: Tuesday 15th August, 5pm
    //             <br />
    //             Place: Longmount Public Pool
    //             <br />
    //             Type: Swim
    //           </Card.Text>
    //         </Card.Body>
    //         <Button variant='dark'>More Details</Button>
    //       </Card>
    //     </Col>
    //   ))}
    // </Row>

    <div class='btn-group-toggle' data-toggle='buttons'>
      <label class='btn btn-secondary'>
        <input type='checkbox' autocomplete='off' /> Checked
      </label>
    </div>
  );
};

export default CoachApplications;
