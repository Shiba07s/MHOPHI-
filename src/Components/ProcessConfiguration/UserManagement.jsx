import React from "react";

import { Card, Col, Row, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
// import "./table-header.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "./UserManagement.css";

const handleBackClick = (navigate) => {
  navigate(-1); // This navigates back to the previous page
};

function UserManagement() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="material-container  ">
        <div className="card p-2">
          <div className="card m-2">
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
                  <h2>User Management</h2>
                </Card.Title>
              </Col>
            </Row>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="card  justify-content-center align-items-center p-3 ">
              <h5 className="card-title">Add User Group To Organisation</h5>
              <p className="card-text">
                Organisation Name:&nbsp;&nbsp;&nbsp;&nbsp; ashutosh group of IT solutions
              </p>
              <form>
                <div className="form-group row">
                  <label
                    htmlFor="userGroupName"
                    className="col-sm-4 col-form-label"
                  >
                    User Group
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id="userGroupName"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button className="me-2" variant="outline-success">
                    Reset
                  </Button>
                  <Button variant="success">Submit</Button>
                </div>
              </form>
            </div>
          </div>

          <Row>
            <Col>
              <div className="card m-2 p-3">
                <h5 className="card-title">Add User To Organisation</h5>
                <form>
                  <div className="form-group row mb-3">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      Platform
                    </label>
                    <div className="col-sm-8">
                      <select className="form-control" id="userGroupName">
                        <option style={{ display: "none" }} disabled selected>
                          Select option
                        </option>
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="">All</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      User group
                    </label>
                    <div className="col-sm-8">
                      <select className="form-control" id="userGroupName">
                        <option style={{ display: "none" }} disabled selected>
                          Select option
                        </option>
                        <option value="platform1">Administration</option>
                        <option value="platform2">Manager</option>
                        <option value="platform3">Production Worker</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      Department
                    </label>
                    <div className="col-sm-8">
                      <select className="form-control" id="userGroupName">
                        <option style={{ display: "none" }} disabled selected>
                          Select option
                        </option>
                        <option value="administrator">Administrator</option>
                        <option value="press">Press</option>
                        <option value="sheetMill">Sheet Mill</option>
                        <option value="fabrication">Fabrication</option>
                        <option value="furnace">Furnace</option>
                        <option value="assembly">Assembly</option>
                        <option value="testing">Testing</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      User Name
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="userGroupName"
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="userGroupName"
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label
                      htmlFor="userGroupName"
                      className="col-sm-4 col-form-label"
                    >
                      Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="userGroupName"
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-end mt-3">
                    <Button className="me-2" variant="outline-success">
                      Reset
                    </Button>
                    <Button variant="success">Add User</Button>
                  </div>
                </form>
              </div>
            </Col>
            <Col>
              <div className=" card m-2 p-3">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr className="table-header">
                        <th>Name</th>
                        <th>User Type</th>
                        <th>Department Name</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
