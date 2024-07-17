import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
 
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "../Inventory/Inventory.css";
// import "./processconfiguration.css";
 
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
// import PendingActionsIcon from '@mui/icons-material/PendingActions';
// import HomeWorkIcon from '@mui/icons-material/HomeWork';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
// import GroupsIcon from '@mui/icons-material/Groups';
 
 
const Reports = () => {
  const navigate = useNavigate();
 
  const handleDepartmentPage = () => {
    navigate("/departments");
  };
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="inventory-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-4">Reports Center</h2>
          </div>
          
          <Row >
            <Col
              xs={12}
              sm={6}
              md={4}
              className="mb-4"
             
            >
              <Card className="card-custom"
                style={{
                  height: "12rem",
                  width: "22rem",
                  backgroundColor: "#7469b6",
                  marginLeft: "45px",
                  marginRight: "45px"
                }}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Workstation Efficiency</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                    <h4># Of Workstations: 35</h4>
                    </Card.Text>
                    <Card.Footer># Of Entries: 3333</Card.Footer>
                  </div>
                
                  <div><AssignmentIndIcon style={{fontSize:"50px"}}/></div>
                </Card.Body>
              </Card >
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="card-custom"
                style={{
                  height: "12rem",
                  width: "22rem",
                  backgroundColor: "#7469b6",
                  marginLeft: "45px",
                  marginRight: "45px"
                }}
                onClick={handleDepartmentPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Operator Efficiency</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                    <h4># Of Users: 76 </h4></Card.Text>
                    <Card.Footer># Of Entries: 2784</Card.Footer>
                  </div>
                  <div><HomeIcon style={{fontSize:"50px"}}/></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
 
export default Reports;