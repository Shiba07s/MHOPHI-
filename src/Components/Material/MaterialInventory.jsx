import React from "react";
 
import { Card, Col, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
// import "./table-header.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

const handleBackClick = (navigate) => {
  navigate(-1); // This navigates back to the previous page
};

function MaterialInventory() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="material-container">
        <div className="card">
          <Row className="align-items-center">
            <Col xs="auto">
              <Button
                className="custom-button"
                onClick={() => handleBackClick(navigate)}
              >
                <ArrowLeft />
              </Button>
            </Col>
            <Col>
              <Card.Title style={{ color: "black", textAlign: "center" }}>
                <h2>Material Inventory</h2>
              </Card.Title>
              <Card.Subtitle className="text-center text-muted">
                <h4>(RAWMATERIAL)</h4>
              </Card.Subtitle>
            </Col>
          </Row>
          <div className="card-body">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                    >
                      <i className="bi bi-funnel"></i> Filters
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-download"></i> Download
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr class="table-header">
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Unit End Date</th>
                        <th>Safety Quantity</th>
                        <th>Safety Quantity Unit</th>
                        <th>Storage</th>
                        <th>Storage Slot</th>
                        <th>Recorder Required</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a
                        className="page-link"
                        href="#"
                        tabIndex="-1"
                        aria-disabled="true"
                      >
                        Previous
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaterialInventory;