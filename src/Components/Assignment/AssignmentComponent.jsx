import React from "react";
import { Card, Row, Col, Button, Container, Form } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import Header from '../../Pages/Header'
import Sidebar from '../../Pages/Sidebar'
import "./AssignmentComponent.css";
 
const data = [
  { category: "Assigned Work Cards" },
  { category: "Completed Work Cards" },
  { category: "Delayed Work Cards" },
];

const AssignmentComponent = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="inventory-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-4">My Work Cards</h2>
          </div>
          <Row>
            {data.map((item, index) => (
              <Col xs={12} sm={6} md={4} className="mb-4" key={index}>
                <Card className="h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title style={{ color: "#d3d3d9" }}>
                        {item.category}
                      </Card.Title>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <hr style={{color:"black",opacity: 0.5}} />
          <Row>
            <Col>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title style={{ color: "black", textAlign: "center" }}>
                   <h4> My Assignment </h4>
                  </Card.Title>
                  <Form>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="formWorkstation">
                          <Form.Label>Workstation:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter workstation"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formDate">
                          <Form.Label>Date:</Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formShift">
                          <Form.Label>Shift:</Form.Label>
                          <Form.Control type="text" placeholder="Enter shift" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="formDepartment">
                          <Form.Label>Department:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter department"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formActivity">
                          <Form.Label>Activity:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter activity"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="formAttendanceStatus">
                          <Form.Label>Attendance Status:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="to be done"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formSkill">
                          <Form.Label>Skill:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="to be done"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <hr style={{color:"black",opacity: 0.5}} />
          <div style={{color:'black', textAlign:'center'}}>
          <label htmlFor="" ><h4>Allocated Work Cards</h4></label>
          </div>
          <Row style={{marginBottom:"20px"}}>
          <Col>
              <Card className="h-100">
                <Card.Body>
                   <p><h6>No Work cards Assigned to user</h6></p>
                  <Form style={{ border: "0.5px solid lightgrey", padding: "10px", borderRadius: "5px" }}>
                      svwvevgerg
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AssignmentComponent;