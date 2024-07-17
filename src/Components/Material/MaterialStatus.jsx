import React from "react";
import "./MaterialStatus.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

function MaterialStatus() {
  return (
    <div>
      <Header/>
      <Sidebar />
      <div className="material-container">
        <div className="card">
          <div className="card-body">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="card-title">Material Status</h2>
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
                        <th>BOM Name</th>
                        <th>Creation Date</th>
                        <th>Material Type</th>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Status</th>
                        <th>Order</th>
                        <th>Product</th>
                        <th>Activity</th>
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

export default MaterialStatus;