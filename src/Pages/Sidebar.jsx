import React from "react";
import "./Sidebar.css"; // Ensure this line is not commented out
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Task } from "@mui/icons-material";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import ClearIcon from "@mui/icons-material/Clear";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FlagIcon from "@mui/icons-material/Flag";
import SummarizeIcon from "@mui/icons-material/Summarize";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommitIcon from "@mui/icons-material/Commit";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
 
const Sidebar = ({ className = "" }) => {
  return (
    <div className={`menuTop ${className}`}>
      <Link className="menuActive1" to="/dashboard-page" data-title="Dashboard">
        <div className="menuActiveItem">
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/listOrder" data-title="Orders">
        <div className="menuActiveItem">
          <ShoppingCartIcon />
          <span>Orders</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/assignment" data-title="Assignment">
        <div className="menuActiveItem">
          <AssignmentIcon />
          <span>Assignment</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/production-plan"
        data-title="Production Plan"
      >
        <div className="menuActiveItem">
          <Task />
          <span>Production Plan</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/material-status"
        data-title="Material Status"
      >
        <div className="menuActiveItem">
          <MonitorHeartIcon />
          <span>Material Status</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/inventory"
        data-title="Material Inventory"
      >
        <div className="menuActiveItem">
          <Inventory2Icon />
          <span>Material Inventory</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/material-movements"
        data-title="Material Movements"
      >
        <div className="menuActiveItem">
          <SwapHorizIcon />
          <span>Material Movements</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/workstation" data-title="Workstation">
        <div className="menuActiveItem">
          <HomeWorkIcon />
          <span>Workstation</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/process-violation"
        data-title="Process Violation"
      >
        <div className="menuActiveItem">
          <PowerSettingsNewIcon />
          <span>Process Violation</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/rejection" data-title="Reject">
        <div className="menuActiveItem">
          <ClearIcon />
          <span>Reject</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/issues" data-title="Issue">
        <div className="menuActiveItem">
          <ErrorOutlineIcon />
          <span>Issue</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/reports" data-title="Reports">
        <div className="menuActiveItem">
          <SummarizeIcon />
          <span>Reports</span>
        </div>
      </Link>
      <Link className="menuActive1" to="/roaster" data-title="Team Rooster">
        <div className="menuActiveItem">
          <CalendarMonthIcon />
          <span>Team Rooster</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/process-execution"
        data-title="Production Execution"
      >
        <div className="menuActiveItem">
          <CommitIcon />
          <span>Production Execution</span>
        </div>
      </Link>
      <Link
        className="menuActive1"
        to="/setup"
        data-title="Process Configuration"
      >
        <div className="menuActiveItem">
          <SettingsInputComponentIcon />
          <span>Process Configuration</span>
        </div>
      </Link>
    </div>
  );
};
 
export default Sidebar;