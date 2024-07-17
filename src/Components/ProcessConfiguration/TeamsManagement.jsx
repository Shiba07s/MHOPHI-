import React from "react";
import "./TeamsManagement.css";
import { Card, Row, Col, Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

const TeamsManagement = () => {

  const navigate = useNavigate();

  const goTosetup = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="team-management-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
          <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={goTosetup}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h2 className="text-center">Teams Management</h2>
          </div>
          <Row>
            <Col xs={12} sm={6} md={4} className="mb-4">
              <Card className="h-100">
                <Card.Body className="">
                  <Form>
                    <h3>Add New Teams</h3>
                    <Col>
                      <Form.Group controlId="formWorkstation">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formWorkstation">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" />
                      </Form.Group>
                    </Col>
                    <br />
                    <div className="d-flex justify-content-end">
                      <Button className="me-2" variant="outline-success">Reset</Button>{" "}
                      <Button variant="success">Add</Button>{" "}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col>
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
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                      >
                        <i className="bi bi-download"></i> Download
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr class="table-header">
                          <th>Name</th>
                          <th>Description</th>
                          <th>Action</th>
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
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TeamsManagement;