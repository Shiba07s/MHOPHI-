import React from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { ArrowOutward } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
 
import "../Inventory/Inventory.css";

const data = [
  { category: "BLANKING", noOfWorkstation:2, running: 4,breakdown:0 },
  { category: "PIERCING", noOfWorkstation: 1, running: 0,breakdown:0 },
  { category: "DRAWING", noOfWorkstation: 1, running: 4,breakdown:0 },
  { category: "FIN ROLLING", noOfWorkstation: 2, running: 0,breakdown:0 },
  { category: "MANUAL CORE ASSY", noOfWorkstation: 5, running: 0,breakdown:0 },
  { category: "WELDING", noOfWorkstation: 9, running: 0,breakdown:0 },
  { category: "Leak Testing", noOfWorkstation: 4, running: 0,breakdown:0 },
  { category: "WELDING  (01 IC 15 0000)", noOfWorkstation: 10, running: 0,breakdown:0 },
  { category: "WELDING (01 IC 32 0000)", noOfWorkstation: 9, running: 0 ,breakdown:0},
  { category: "SEMI AUTO CORE ASSY", noOfWorkstation: 1, running: 0,breakdown:0 },
  { category: "FORMING", noOfWorkstation: 1, running: 0,breakdown:0 },
  { category: "FORMING(ES)", noOfWorkstation: 2, running: 0,breakdown:0 },
];


const WorkstationStates = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };
  return (
    <div> 
      <Header />
      <Sidebar />
      <div className="inventory-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-4">WorkStation States</h2>
          </div>
          <Row>
            {data.map((item, index) => (
              <Col xs={12} sm={6} md={4} className="mb-4" key={index}>
                <Card className="h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title style={{ color: "darkgrey" }}>{item.category}</Card.Title>
                      <Card.Text style={{fontSize:"20px"}}>No of Workstation: {item.noOfWorkstation}</Card.Text>
                      {item.running !== undefined && (
                        <Card.Text>
                          Running: {item.running}
                        </Card.Text>
                      )}
                      {item.breakdown !== undefined && (
                        <Card.Text>
                          Breakdown: {item.breakdown}
                        </Card.Text>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      className="squared-circle"
                      onClick={handleButtonClick}
                      style={{height:"50px"}}
                    >
                      <ArrowOutward color="white" />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default WorkstationStates;