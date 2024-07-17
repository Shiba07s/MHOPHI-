import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
// import "./ManageWorkstation.css";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ManageWorkstation = () => {
  const [showModal, setShowModal] = useState(false);
  const [workstationName, setWorkstationName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
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
 
  const [activities, setActivities] = useState([]);
  const [selectedActivityIds, setSelectedActivityIds] = useState([]);

  useEffect(() => {
    fetchWorkstations(paginationInfo.pageNumber);
   }, []);

 
   useEffect(() => {
    // Fetch activity names from the API
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:7071/api/v1/activities/names');
        setActivities(response.data); // Assuming the response data is an array of activity names or objects
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const fetchWorkstations = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:7071/api/v1/workstations?pageNumber=${page}&pageSize=${paginationInfo.pageSize}&sortBy=workstationId&sortDir=asc`
      );
      const workstationsWithDepartmentName = response.data.content.map(workstation => ({
        ...workstation,
        departmentName: workstation.department ? workstation.department.departmentName : "N/A",
      }));
      setTableData(workstationsWithDepartmentName);
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
    if (!workstationName) {
      setErrorMessage("Please enter a workstation name.");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a description.");
      return;
    }
    // if (!status) {
    //   setErrorMessage("Please enter a status.");
    //   return;
    // }
    if (selectedActivityIds.length === 0) {
      setErrorMessage("Please select at least one activity.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7071/api/v1/workstations/create",
        {
          workstationName: workstationName,
          description: description,
        //   status: status,
        //   createdAt: new Date().toLocaleString(),
          activities: selectedActivityIds.map(activityId => ({ activityId })),
        }
      );

      console.log("API Response:", response.data);

      handleCloseModal();
      setWorkstationName("");
      setDescription("");
      setStatus("");
      setSelectedActivityIds([]);
      setErrorMessage("");
      fetchWorkstations(paginationInfo.pageNumber);
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleReset = () => {
    setWorkstationName("");
    setDescription("");
    setStatus("");
    setSelectedActivityIds([]);
    setErrorMessage("");
  };

  const goToFirstPage = () => fetchWorkstations(0);
  const goToLastPage = () => fetchWorkstations(paginationInfo.totalPages - 1);

  const deleteWorkstation = async (workstationId) => {
    try {
      await axios.delete(`http://localhost:7071/api/v1/workstations/delete/${workstationId}`);
      fetchWorkstations(paginationInfo.pageNumber); // Refresh table data
    } catch (error) {
      console.error("Error deleting workstation", error);
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
                <h5 className="card-title">Workstations Detail Page</h5>
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
                    onClick={() => fetchWorkstations(paginationInfo.pageNumber)}
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
                        <th>Workstation Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Activities</th>
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
                          <td>{item.workstationName}</td>
                          <td>{item.description}</td>
                          <td>{item.status}</td>
                          <td>
                            {item.activities.map(activity => activity.activityName).join(", ")}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteWorkstation(item.workstationId)}
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
                        fetchWorkstations(paginationInfo.pageNumber - 1)
                      }
                    />
                  </PaginationItem>
                  {[...Array(paginationInfo.totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={index === paginationInfo.pageNumber}
                    >
                      <PaginationLink onClick={() => fetchWorkstations(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={paginationInfo.lastPage}>
                    <PaginationLink
                      next
                      onClick={() =>
                        fetchWorkstations(paginationInfo.pageNumber + 1)
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
          <Modal.Title>Add New Workstation</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label htmlFor="workstationName"> Name</label>
              <input
                type="text"
                id="workstationName"
                className="form-control"
                value={workstationName}
                onChange={(e) => setWorkstationName(e.target.value)}
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
{/*          
            <div className="form-group mt-3">
              <label htmlFor="department">Department Name</label>
              <select
                id="department"
                className="form-control"
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
            </div> */}
 {/* <div className="form-group mt-3">
      <label htmlFor="activities">Activities</label>
      <select
        id="activities"
        className="form-control"
        // multiple
        value={selectedActivityIds}
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions);
          const selectedIds = selectedOptions.map((option) => option.value);
          setSelectedActivityIds(selectedIds);
        }}
      >
        {activities.map((activity) => (
          <option key={activity.activityId} value={activity.activityId}>
            {activity.activityName}
          </option>
        ))}
      </select>
    </div> */}
<div className="form-group mt-3">
  <label htmlFor="activities">Activities</label>
  <select
    id="activities"
    className="form-control"
    // multiple
    value={selectedActivityIds}
    onChange={(e) => {
      const selectedOptions = Array.from(e.target.selectedOptions);
      const selectedIds = selectedOptions.map((option) => option.value);
      setSelectedActivityIds(selectedIds);
    }}
  >
    <option value="" disabled>Select Activities</option>
    {activities.map((activity) => (
      <option key={activity.activityId} value={activity.activityId}>
        {activity.activityName}
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
              Add Workstation
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default ManageWorkstation;
