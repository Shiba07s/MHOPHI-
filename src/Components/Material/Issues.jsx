import React, { useState, useEffect } from "react";
import "../Material/MaterialStatus.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import { Modal, Form, Row, Col,Dropdown } from "react-bootstrap";
 

function Issues() {
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

  useEffect(() => {
    // Delay the effect to ensure the table is rendered
    const timer = setTimeout(() => {
      const tableHeaders = Array.from(
        document.querySelectorAll("table thead th")
      )
        .filter((th) => {
          const thIndex = Array.from(th.parentNode.children).indexOf(th);
          const correspondingTds = Array.from(
            document.querySelectorAll(
              `table tbody tr td:nth-child(${thIndex + 1})`
            )
          );

          // Check if th or any corresponding td contains a div or button
          const containsDivOrButton = (element) =>
            element.querySelector("div, button") !== null;

          const thContainsDivOrButton = containsDivOrButton(th);
          const tdContainsDivOrButton = correspondingTds.some((td) =>
            containsDivOrButton(td)
          );

          return !(thContainsDivOrButton || tdContainsDivOrButton);
        })
        .map((th) => th.textContent);

      setHeaders(tableHeaders);
      console.log(tableHeaders);
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
      <div className="material-container">
        <div className="card">
          <div className="card-body">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="card-title">Issues List</h2>
                <div>
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
                    />
                  </div>
                  <div>
                    <label>Start Date</label>
                    <input
                      className="btn btn-outline-secondary"
                      type="date"
                      name="startdate"
                      id="startdate"
                    />
                  </div>
                  <div>
                    <label>End Date</label>
                    <input
                      className="btn btn-outline-secondary"
                      type="date"
                      name="enddate"
                      id="enddate"
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
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr class="table-header">
                        <th>Issue Type</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Creation Date</th>
                        <th>Production Lines Affected</th>
                        <th>Reported By</th>
                        
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

export default Issues;