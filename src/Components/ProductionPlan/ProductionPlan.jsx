import React from "react";
import "./ProductionPlan.css";
import Header from "../../Pages/Header";
import Sidebar from "../../Pages/Sidebar";

function Productionplan() {
  return (
    <div>
      <Header />
      <Sidebar/>

      <div className="production-container">
        <div className="card">
          <div className="card-body">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2 className="card-title">Production Plan</h2>
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
                        <th>Plan Name</th>
                        <th>Deadline</th>
                        <th>Planned End Date</th>
                        <th>Plan Status</th>
                        <th>Remarks</th>
                        <th>Is Deadline Met</th>
                        <th>Action</th>
                        <th>Order Count</th>
                        <th>Init WC Count</th>
                        <th>Final WC Count</th>
                        <th>Creation Time</th>
                        <th>Created By</th>
                        <th>Modified Time</th>
                        <th>Modified By</th>
                        <th>Start Date Shift</th>
                        <th>End Date Shift</th>
                        <th>Final Date Shift</th>
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

export default Productionplan;