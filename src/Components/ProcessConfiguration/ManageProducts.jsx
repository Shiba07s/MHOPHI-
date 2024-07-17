import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";
import "./ManageProducts.css";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const ManageProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productFamily, setProductFamily] = useState("");
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

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = async (event) => {
    event.preventDefault();
    if (!productName) {
      setErrorMessage("Please enter a product name.");
      return;
    }
    if (!description) {
      setErrorMessage("Please enter a description.");
      return;
    }
    if (!category) {
      setErrorMessage("Please enter a category.");
      return;
    }
    if (!productFamily) {
      setErrorMessage("Please enter a product family.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:7071/api/v1/products/create",
        {
          name: productName,
          description: description,
          category: category,
          productFamily: productFamily,
        }
      );

      console.log("API Response:", response.data);

      handleCloseModal();
      setProductName("");
      setDescription("");
      setCategory("");
      setProductFamily("");
      setErrorMessage("");
      fetchProducts(paginationInfo.pageNumber);
    } catch (error) {
      console.error("Error saving data", error);
      setErrorMessage("An error occurred while saving. Please try again.");
    }
  };

  const handleReset = () => {
    setProductName("");
    setDescription("");
    setCategory("");
    setProductFamily("");
    setErrorMessage("");
  };

  const goToFirstPage = () => fetchProducts(0);
  const goToLastPage = () => fetchProducts(paginationInfo.totalPages - 1);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:7071/api/v1/products/${productId}`);
      fetchProducts(paginationInfo.pageNumber); // Refresh table data
    } catch (error) {
      console.error("Error deleting product", error);
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
                <h5 className="card-title">Products Detail Page</h5>
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
                    onClick={() => fetchProducts(paginationInfo.pageNumber)}
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
                        <th>Product Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Product Family</th>
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
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          <td>{item.category}</td>
                          <td>{item.productFamily}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-danger btn-sm"
                              onClick={() => deleteProduct(item.productId)}
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
                        fetchProducts(paginationInfo.pageNumber - 1)
                      }
                    />
                  </PaginationItem>
                  {[...Array(paginationInfo.totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={index === paginationInfo.pageNumber}
                    >
                      <PaginationLink onClick={() => fetchProducts(index)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={paginationInfo.lastPage}>
                    <PaginationLink
                      next
                      onClick={() =>
                        fetchProducts(paginationInfo.pageNumber + 1)
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
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSave}>
          <Modal.Body>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                id="productName"
                className="form-control"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
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
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="productFamily">Product Family</label>
              <input
                type="text"
                id="productFamily"
                className="form-control"
                value={productFamily}
                onChange={(e) => setProductFamily(e.target.value)}
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

export default ManageProducts;
