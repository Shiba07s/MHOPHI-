import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "./ManageActivity.css"; // You can rename this to ManageActivities.css if needed
import AddIcon from "@mui/icons-material/Add";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ManageActivity = () => {
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState("");
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
  const [departments, setDepartments] = useState([]); // State to hold departments
  const [selectedDepartment, setSelectedDepartment] = useState(""); // State to hold selected department

  useEffect(() => {
    fetchActivities(paginationInfo.pageNumber);
    fetchDepartments(); // Fetch departments when component mounts
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:7071/api/v1/department/names");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const fetchActivities = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:7071/api/v1/activities?pageNumber=${page}&pageSize=${paginationInfo.pageSize}&sortBy=activityId&sortDir=asc`
      );
      const activitiesWithDepartmentName = response.data.content.map(activity => ({
        ...activity,
        departmentName: activity.department[0] ? activity.department[0].departmentName : "N/A",
      }));
      setTableData(activitiesWithDepartmentName);
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
    if (!activityName) {
      setErrorMessage("Please enter an activity name.");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a description.");
      return;
    }
    if (!selectedDepartment) {
      setErrorMessage("Please select a department.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7071/api/v1/activities/create",
        {
          activityName: activityName,
          description: description,
          department:[ {
                  departmentId: selectedDepartment, // Send selected department ID
          }]
          
        }
      );

      console.log("API Response:", response.data);

      handleCloseModal();
      setActivityName("");
      setDescription("");
      setSelectedDepartment("");
      setErrorMessage("");
      fetchActivities(paginationInfo.pageNumber);
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleReset = () => {
    setActivityName("");
    setDescription("");
    setSelectedDepartment("");
    setErrorMessage("");
  };

  const goToFirstPage = () => fetchActivities(0);
  const goToLastPage = () => fetchActivities(paginationInfo.totalPages - 1);

  const deleteActivity = async (activityId) => {
    try {
      await axios.delete(`http://localhost:7071/api/v1/activities/${activityId}`);
      fetchActivities(paginationInfo.pageNumber); // Refresh table data
    } catch (error) {
      console.error("Error deleting activity", error);
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
                <h5 className="card-title">Activities Detail Page</h5>
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
                    onClick={() => fetchActivities(paginationInfo.pageNumber)}
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
                        <th>Activity Name</th>
                        <th>Description</th>
                        <th>Department Name</th>
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
                          <td>{item.activityName}</td>
                          <td>{item.description}</td>
                          <td>{item.departmentName}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteActivity(item.activityId)}
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
                        fetchActivities(paginationInfo.pageNumber - 1)
                      }
                    />
                  </PaginationItem>
                  {[...Array(paginationInfo.totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={index === paginationInfo.pageNumber}
                    >
                      <PaginationLink onClick={() => fetchActivities(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={paginationInfo.lastPage}>
                    <PaginationLink
                      next
                      onClick={() =>
                        fetchActivities(paginationInfo.pageNumber + 1)
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
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label htmlFor="activityName">Activity Name</label>
              <input
                type="text"
                id="activityName"
                className="form-control"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
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
            <div className="form-group mt-3">
              <label htmlFor="department">Department Name</label>
              <select
                id="department"
                className="form-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department.departmentId} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Add Activity
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ManageActivity;