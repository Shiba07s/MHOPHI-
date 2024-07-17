import React, { useEffect, useState } from "react";
import "./ProductionLineManagement.css";
import { Card, Row, Col, Button, Container, Form, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

const ProductionLineManagement = () => {
  const navigate = useNavigate();
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
    fetchProducts(0);
  }, []);

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:7071/api/v1/products?pageNumber=${page}&pageSize=${paginationInfo.pageSize}&sortBy=productId&sortDir=asc`
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

  const goToFirstPage = () => fetchProducts(0);
  const goToLastPage = () => fetchProducts(paginationInfo.totalPages - 1);

  const goTosetup = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="material-container card">
        <Container className="mt-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={goTosetup}
            >
              <i className="bi bi-arrow-left"></i>
            </button>
            <h2 className="text-center">Production Line Page</h2>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary me-2"
                onClick={() => window.location.reload()}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </button>
              <button type="button" className="btn btn-outline-secondary">
                <i className="bi bi-plus-circle"></i>
              </button>
            </div>
          </div>
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
                    <button type="button" className="btn btn-outline-secondary">
                      <i className="bi bi-download"></i> Download
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr className="table-header">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Product Count</th>
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
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.productCount}</td>
                          <td>
                            <Button
                              variant="primary"
                              onClick={() => setSelectedRow(index)}
                            >
                              Select
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
          <br />
          <hr />
          <Col>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="text-center">
                    Product List For Production Line
                  </h2>
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add Product To Production Line
                </button>

                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="card p-3">
                          <h3 className="text-center">
                            Select To Add Product To Production Line
                          </h3>
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                              <thead>
                                <tr className="table-header">
                                  <th>Action</th>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Variance</th>
                                  <th>Category</th>
                                  <th>Product Family</th>
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
                                      <Button
                                        variant="primary"
                                        onClick={() => setSelectedRow(index)}
                                      >
                                        Select
                                      </Button>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.variance}</td>
                                    <td>{item.category}</td>
                                    <td>{item.productFamily}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <Pagination
                            className="text-center mt-2"
                            style={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <Pagination.Item disabled={paginationInfo.pageNumber === 0} onClick={goToFirstPage}>
                              First
                            </Pagination.Item>
                            <Pagination.Item disabled={paginationInfo.pageNumber === 0} onClick={() => fetchProducts(paginationInfo.pageNumber - 1)}>
                              Previous
                            </Pagination.Item>
                            {[...Array(paginationInfo.totalPages)].map((_, index) => (
                              <Pagination.Item
                                key={index}
                                active={index === paginationInfo.pageNumber}
                                onClick={() => fetchProducts(index)}
                              >
                                {index + 1}
                              </Pagination.Item>
                            ))}
                            <Pagination.Item disabled={paginationInfo.lastPage} onClick={() => fetchProducts(paginationInfo.pageNumber + 1)}>
                              Next
                            </Pagination.Item>
                            <Pagination.Item disabled={paginationInfo.lastPage} onClick={goToLastPage}>
                              Last
                            </Pagination.Item>
                          </Pagination>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-success">
                          Add Selected
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default ProductionLineManagement;
