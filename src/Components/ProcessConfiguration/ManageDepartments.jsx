import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "./ManageDepartments.css";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ManageDepartments = () => {
  const [showModal, setShowModal] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
    lastPage: false,
  });

  useEffect(() => {
    fetchDepartments(paginationInfo.pageNumber);
  }, []);

  const fetchDepartments = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:7071/api/v1/department?pageNumber=${page}&pageSize=${paginationInfo.pageSize}&sortBy=departmentId&sortDir=asc`
      );
      setTableData(response.data.content);
      setPaginationInfo({
        pageNumber: response.data.pageNumber,
        pageSize: response.data.pageSize,
        totalElements: response.data.totalElements,
        totalPages: response.data.totalPages,
        lastPage: response.data.lastPage,
      });
    } catch (error) {
      console.error("Error fetching table data", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!departmentName) {
      setErrorMessage("Please enter a department name.");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a description.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7071/api/v1/department/create",
        {
          departmentName: departmentName,
          description: description,
        }
      );

      console.log("API Response:", response.data);

      handleCloseModal();
      setDepartmentName("");
      setDescription("");
      setErrorMessage("");
      fetchDepartments(paginationInfo.pageNumber);
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleReset = () => {
    setDepartmentName("");
    setDescription("");
    setErrorMessage("");
  };

  const handleRadioChange = (index) => {
    if (selectedRow === index) {
      setSelectedRow(null);
    } else {
      setSelectedRow(index);
    }
  };

  const goToFirstPage = () => fetchDepartments(0);
  const goToLastPage = () => fetchDepartments(paginationInfo.totalPages - 1);

  const deleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:7071/api/v1/department/${departmentId}`);
      fetchDepartments(paginationInfo.pageNumber); // Refresh table data
    } catch (error) {
      console.error("Error deleting department", error);
      setErrorMessage("An error occurred while deleting. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="order-container">
        <div className="card">
          <div className="card-body">
            <div className="card p-4">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="card-title">Departments Detail Page</h5>
                <div>
                  <button
                    style={{ backgroundColor: "#4ADE80", color: "black" }}
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleShowModal}
                  >
                    <AddIcon />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => fetchDepartments(paginationInfo.pageNumber)}
                  >
                    <i className="bi bi-arrow-clockwise"></i>
                  </button>
                </div>
              </div>
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
                      <tr>
                        <th>Sl.No</th>
                        <th>Department Name</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            selectedRow === index ? "table-active" : ""
                          }
                        >
                          <td>
                            {paginationInfo.pageNumber *
                              paginationInfo.pageSize +
                              index +
                              1}
                          </td>
                          <td>{item.departmentName}</td>
                          <td>{item.description}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteDepartment(item.departmentId)}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  className="text-center mt-2"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <PaginationItem disabled={paginationInfo.pageNumber === 0}>
                    <PaginationLink first onClick={goToFirstPage} />
                  </PaginationItem>
                  <PaginationItem disabled={paginationInfo.pageNumber === 0}>
                    <PaginationLink
                      previous
                      onClick={() =>
                        fetchDepartments(paginationInfo.pageNumber - 1)
                      }
                    />
                  </PaginationItem>
                  {[...Array(paginationInfo.totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={index === paginationInfo.pageNumber}
                    >
                      <PaginationLink onClick={() => fetchDepartments(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={paginationInfo.lastPage}>
                    <PaginationLink
                      next
                      onClick={() =>
                        fetchDepartments(paginationInfo.pageNumber + 1)
                      }
                    />
                  </PaginationItem>
                  <PaginationItem disabled={paginationInfo.lastPage}>
                    <PaginationLink last onClick={goToLastPage} />
                  </PaginationItem>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Department</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label htmlFor="departmentName">Department Name</label>
              <input
                type="text"
                id="departmentName"
                className="form-control"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ManageDepartments;
