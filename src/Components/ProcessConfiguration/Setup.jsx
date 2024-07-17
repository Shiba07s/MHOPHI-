import React from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import "../Inventory/Inventory.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HomeIcon from "@mui/icons-material/Home";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import InventoryIcon from "@mui/icons-material/Inventory";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import GroupsIcon from "@mui/icons-material/Groups";

const Setup = () => {
  const navigate = useNavigate();

  const handleDepartmentPage = () => {
    navigate("/departments");
  };

  const handleUserPage = () => {
    navigate('/user')
  }
  const handleProductPage = () => {
    navigate('/product')
  }
  const handleActivityPage = () => {
    navigate('/activity')
  }
  const handleProductionLinePage = () => {
    navigate('/production-line')
  }
  const handleTeamPage = () => {
    navigate('/manage-team')
  }
  const handleWorkstationPage = () => {
    navigate('/manage-workstation')
  }
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="inventory-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2 className="text-center mb-4">Process Configuration Centre</h2>
          </div>
          <Row>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleUserPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Users</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Users: 16
                    </Card.Text>
                  </div>
                  <div>
                    <AssignmentIndIcon style={{ fontSize: "50px"}} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleDepartmentPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Departments</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Departments: 16
                    </Card.Text>
                  </div>
                  <div>
                    <HomeIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleActivityPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Activities</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Activities: 16
                    </Card.Text>
                  </div>
                  <div>
                    <PendingActionsIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleWorkstationPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Workstations</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Workstations: 16
                    </Card.Text>
                  </div>
                  <div>
                    <HomeWorkIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleProductPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Products</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Products: 16
                    </Card.Text>
                  </div>
                  <div>
                    <InventoryIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleProductionLinePage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage Production Line</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Prodcution Line: 16
                    </Card.Text>
                  </div>
                  <div>
                    <PrecisionManufacturingIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card
                style={{
                  height: "10rem",
                  width: "18rem",
                  backgroundColor: "#E1AFD1",
                  marginLeft: "45px",
                  marginRight: "45px",
                }}
                onClick={handleTeamPage}
              >
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <Card.Title>Manage teams</Card.Title>
                    <Card.Text style={{ color: "white" }}>
                      No of Teams: 16
                    </Card.Text>
                  </div>
                  <div>
                    <GroupsIcon style={{ fontSize: "50px" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Setup;
