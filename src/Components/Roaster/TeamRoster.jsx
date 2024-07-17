import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
 
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "../Orders/ListOrder.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const TeamRoster = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showProductionModal, setShowProductionModal] = useState(false);

  useEffect(() => {
    // Fetch product list from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://172.16.20.239:8085/mhophi/api/v1/allproduct"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch table data from API
    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          "http://172.16.20.239:8085/mhophi/api/v1/order-products"
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data", error);
      }
    };

    fetchTableData();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handleCloseProductionModal = () => {
    setErrorMessage("");
    setShowProductionModal(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    // Validation
    if (!selectedProduct) {
      setErrorMessage("Please select a product.");
      return;
    }
    if (!quantity || quantity <= 0) {
      setErrorMessage("Please enter a valid quantity.");
      return;
    }

    try {
      // Post data to API
      const response = await axios.post(
        "http://localhost:7071/api/v1/order-products/create",
        {
          productsId: selectedProduct,
          quantity: quantity,
        }
      );

      console.log("API Response:", response.data);

      // Handle successful response
      handleCloseModal();
      setSelectedProduct("");
      setQuantity("");
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleCreateProductio = async (event) => {
    event.preventDefault();
    // Validation

    if (!date) {
      setErrorMessage("Please enter a valid date.");
      return;
    }

    try {
      // Post data to API
      const response = await axios.post(
        "http://localhost:7071/api/v1/createprodplan",
        {
          orderCount: selectedRows.length,
          deadline: date,
        }
      );

      console.log("API Response:", response.data);

      // Handle successful response
      handleCloseModal();
      setSelectedProduct("");
      setQuantity("");
      setErrorMessage("");
      navigate("/productionplan");
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleReset = () => {
    setSelectedProduct("");
    setQuantity("");
    setErrorMessage("");
  };

  const handleProdModalReset = () => {
    setDate("");
    setErrorMessage("");
  };

  const handleRadioChange = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredData = tableData.filter(
    (item) =>
      (item.orderNumber &&
        item.orderNumber.toLowerCase().includes(searchQuery)) ||
      (item.productName &&
        item.productName.toLowerCase().includes(searchQuery)) ||
      (item.orderStatus &&
        item.orderStatus.toLowerCase().includes(searchQuery)) ||
      (item.executionStatus &&
        item.executionStatus.toLowerCase().includes(searchQuery)) ||
      (item.trackingStatus &&
        item.trackingStatus.toLowerCase().includes(searchQuery))
  );

  // Function to generate and download PDF
  const handleDownloadPDF = () => {
    const tableHeadings = [
      "Sl.No",
      "Order Number",
      "Product Name",
      "Quantity",
      "Order Status",
      "Execution Status",
      "Tracking Status",
      "Production Plan Id List",
    ];

    // Determine page size based on the number of headings
    const pageSize = tableHeadings.length <= 8 ? "a4" : "a3";

    // Specify page size during document creation
    const doc = new jsPDF("landscape", "px", pageSize);

    const tableData = filteredData.map((row, index) => [
      index + 1,
      row.orderNumber,
      row.productName,
      row.quantity,
      row.orderStatus,
      row.executionStatus,
      row.trackingStatus,
      row.productionPlanIdList,
    ]);

    doc.autoTable({
      head: [tableHeadings],
      body: tableData,
    });

    doc.save("orders_products.pdf");
    handleClose();
  };

  // Function to generate and download Excel
  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders_Products");
    XLSX.writeFile(workbook, "Orders_Products.xlsx");
    handleClose();
  };

  // Function to generate and download CSV
  const handleDownloadCSV = () => {
    const csvContent =
      Object.keys(filteredData[0])
        .map((key) => `${key},`)
        .join("") +
      "\n" +
      filteredData.map(
        (row) =>
          Object.values(row)
            .map((value) => `"${value}",`)
            .join("") + "\n"
      );
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders_products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClose = () => setShowDropdown(false);
  const handleToggle = () => setShowDropdown((prevShow) => !prevShow);

  const [show, setShow] = useState(false);

  const [headers, setHeaders] = useState([]);
  const [headers1, setHeaders1] = useState([]);

 useEffect(() => {
  const timer = setTimeout(() => {
    const tableHeaders = Array.from(document.querySelectorAll("table thead th"))
      .filter((th) => {
        const thIndex = Array.from(th.parentNode.children).indexOf(th);
        const correspondingTds = Array.from(
          document.querySelectorAll(`table tbody tr td:nth-child(${thIndex + 1})`)
        );

        // Check if th or any corresponding td contains a button or checkbox
        const containsButtonOrCheckbox = (element) =>
          element.querySelector("button, input[type='checkbox']") !== null;

        const thContainsButtonOrCheckbox = containsButtonOrCheckbox(th);
        const tdContainsButtonOrCheckbox = correspondingTds.some((td) =>
          containsButtonOrCheckbox(td)
        );

        return !(thContainsButtonOrCheckbox || tdContainsButtonOrCheckbox);
      })
      .map((th) => th.textContent);

    setHeaders(tableHeaders);
    console.log(tableHeaders);
  }, 100); // Delay for 100ms

  return () => clearTimeout(timer); // Cleanup the timer
}, [show]); // Run this effect when `show` state changes


useEffect(() => {
  const timer = setTimeout(() => {
    const table = document.querySelector("#filtertable");
    if (!table) return;

    const tableHeaders1 = Array.from(table.querySelectorAll("thead th"))
      .filter((th) => {
        const thIndex = Array.from(th.parentNode.children).indexOf(th);
        const correspondingTds = Array.from(
          table.querySelectorAll(`tbody tr td:nth-child(${thIndex + 1})`)
        );

        // Check if th or any corresponding td contains a button or checkbox
        const containsButtonOrCheckbox = (element) =>
          element.querySelector("button, input[type='checkbox']") !== null;

        const thContainsButtonOrCheckbox = containsButtonOrCheckbox(th);
        const tdContainsButtonOrCheckbox = correspondingTds.some((td) =>
          containsButtonOrCheckbox(td)
        );

        return !(thContainsButtonOrCheckbox || tdContainsButtonOrCheckbox);
      })
      .map((th) => th.textContent);

    setHeaders1(tableHeaders1);
  }, 100); // Delay for 100ms

  return () => clearTimeout(timer); // Cleanup the timer
}, [show]); // Run this effect when `show` state changes


  const handleClose1 = () => {
    setShow(false);
    setSelectedAttribute(""); // Reset selected attribute
  };
  const handleShow1 = () => setShow(true);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const handleSelectChange = (e) => {
    setSelectedAttribute(e.target.value);
  };

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="order-container">
        <div className="card">
          <div className="card-body">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="card-title">Team Roster</h2>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={handleShowModal}
                  >
                    Add Schedule
                  </button>
                  
                  <button
                    type="button"
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => window.location.reload()}
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
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary me-2"
                      onClick={handleShow1}
                    >
                      <i className="bi bi-funnel"></i> Filters
                    </button>
                    <Modal show={show} onHide={handleClose1}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "15px" }}>
                          Change column datatype to see filter operators
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formAttribute">
                            <Row className="align-items-center">
                              <Col>
                                <Form.Control
                                  as="select"
                                  style={{ width: "100%" }}
                                  onChange={handleSelectChange}
                                  defaultValue=""
                                >
                                  <option value="" selected disabled>
                                    Select attribute
                                  </option>
                                  {headers.map((header, index) => (
                                    <option key={index} value={header}>
                                      {header}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              {selectedAttribute && (
                                <Col>
                                  <Form.Control
                                    type="text"
                                    style={{ width: "100%" }}
                                    placeholder="Value"
                                  />
                                </Col>
                              )}
                            </Row>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    <button
                      onClick={handleToggle}
                      type="button"
                      className="btn btn-outline-secondary me-2"
                    >
                      <i className="bi bi-download"></i> Download
                    </button>
                    <Dropdown show={showDropdown} onHide={handleClose}>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleDownloadCSV}>
                          Download as CSV
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDownloadExcel}>
                          Download as Excel
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDownloadPDF}>
                          Download as PDF
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="table-responsive">
                  <table
                    className="table table-striped table-bordered"
                    id="ordertable"
                  >
                    <thead>
                    <tr class="table-header">
                        <th>Name</th>
                        <th>WorkStation Name</th>
                        <th>User Count</th>
                        <th>Action</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr
                          key={index}
                          className={
                            selectedRows.includes(index) ? "table-active" : ""
                          }
                        >
                          <td>{index + 1}</td>
                          <td>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                id={`action-${index}`}
                                className="form-check-input"
                                checked={selectedRows.includes(index)}
                                onChange={() => handleRadioChange(index)}
                              />
                              <label
                                htmlFor={`action-${index}`}
                                className="form-check-label"
                              ></label>
                            </div>
                          </td>
                          <td>{item.orderNumber}</td>
                          <td>{item.productName}</td>
                          <td>{item.quantity}</td>
                          <td>{item.orderStatus}</td>
                          <td>{item.executionStatus}</td>
                          <td>{item.trackingStatus}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                          <td>{item.productionPlanIdList}</td>
                        </tr>
                      ))}
                    </tbody>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title >Select a Team</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="form-group">
                    <input style={{width:"70%",padding:"0.272rem 0.8rem"}}
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={handleShow1}
                    >
                      <i className="bi bi-funnel"></i> Filters
                    </button>
                    <Modal show={show} onHide={handleClose1}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "15px" }}>
                          Change column datatype to see filter operators
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formAttribute">
                            <Row className="align-items-center">
                              <Col>
                                <Form.Control
                                  as="select"
                                  style={{ width: "100%" }}
                                  onChange={handleSelectChange}
                                  defaultValue=""
                                >
                                  <option value="" selected disabled>
                                    Select attribute
                                  </option>
                                  {headers1.map((header, index) => (
                                    <option key={index} value={header}>
                                      {header}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Col>
                              {selectedAttribute && (
                                <Col>
                                  <Form.Control
                                    type="text"
                                    style={{ width: "100%" }}
                                    placeholder="Value"
                                  />
                                </Col>
                              )}
                            </Row>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>
                    <button
                      onClick={handleToggle}
                      type="button"
                      className="btn btn-sm btn-outline-secondary me-2"
                    >
                      <i className="bi bi-download"></i> Download
                    </button>
                    <Dropdown show={showDropdown} onHide={handleClose}>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleDownloadCSV}>
                          Download as CSV
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDownloadExcel}>
                          Download as Excel
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleDownloadPDF}>
                          Download as PDF
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="table-responsive">
                  <table id="filtertable" className="table table-striped table-bordered">
                    <thead>
                      <tr class="table-header">
                        <th>Name</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
                <nav  aria-label="Page navigation">
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
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-sm" variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button className="btn-sm" type="submit" variant="primary">
              Next
            </Button>
            <Button className="btn-sm" variant="danger" onClick={handleReset}>
              Reset
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal show={showProductionModal} onHide={handleCloseProductionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter End Date For Production Plan</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleCreateProductio}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <div className="form-group mt-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductionModal}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              SUBMIT
            </Button>
            <Button variant="danger" onClick={handleProdModalReset}>
              Reset
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default TeamRoster;