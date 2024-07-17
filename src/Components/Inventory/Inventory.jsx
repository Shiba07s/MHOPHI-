import React from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';
 
import "./Inventory.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

const data = [
  { category: "Raw Material", items: 4, belowSafety: 4 },
  { category: "Parts", items: 6, belowSafety: 0 },
  { category: "Consumables", items: 4, belowSafety: 4 },
  { category: "Supplements", items: 0, belowSafety: 0 },
  { category: "Unfinished Products", items: 0, distinctProducts: 0 },
  { category: "Finished Products", items: 0, belowSafety: 0 },
];


const Inventory = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/material-inventory');
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="inventory-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-4">Inventory Summary</h2>
          </div>
          <Row>
            {data.map((item, index) => (
              <Col xs={12} sm={6} md={4} className="mb-4" key={index}>
                <Card className="h-100">
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                      <Card.Title>{item.category}</Card.Title>
                      <Card.Text>No of Items: {item.items}</Card.Text>
                      {item.belowSafety !== undefined && (
                        <Card.Text>
                          # Below Safety Level: {item.belowSafety}
                        </Card.Text>
                      )}
                      {item.distinctProducts !== undefined && (
                        <Card.Text>
                          # Distinct Products: {item.distinctProducts}
                        </Card.Text>
                      )}
                    </div>
                    <Button
                      variant="primary"
                      className="rounded-circle"
                      onClick={handleButtonClick}
                    >
                      <ArrowRight color="white" />
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

export default Inventory;