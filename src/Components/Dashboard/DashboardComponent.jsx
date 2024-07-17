 // src/Dashboard.js
import React from "react";
import { AppBar, Toolbar, IconButton, InputBase, Avatar } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Assignment } from "@mui/icons-material"; // Or any other relevant icon from Material UI
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
 
import "./Dashboard.css";
import Sidebar from "../../Pages/Sidebar";
import Header from "../../Pages/Header";
 
const DashboardComponent = () => {
  const rows = [
    {
      id: 1,
      workCard: "#01245687",
      reason: "UNSPECIFIED",
      rejectedBy: "Ram Gopal Sharma",
      rejectionTime: "10-06-2023",
    },
    {
      id: 2,
      workCard: "#01245687",
      reason: "UNSPECIFIED",
      rejectedBy: "Rupa Ganguly",
      rejectionTime: "10-06-2023",
    },
    {
      id: 3,
      workCard: "#01245687",
      reason: "UNSPECIFIED",
      rejectedBy: "Ricky Martin",
      rejectionTime: "10-06-2023",
    },
   
   
  ];
 
  const columns = [
    { field: "workCard", headerName: "WORK CARDS", width: 150 },
    { field: "reason", headerName: "REJECT REASON", width: 150 },
    { field: "rejectedBy", headerName: "REJECTED BY", width: 200 },
    { field: "rejectionTime", headerName: "REJECTION TIME", width: 150 },
  ];
 
  return (
    <div>
      <Header/>
      <Sidebar />
      <div className="dashboard-container">
        <Box display="flex" flexDirection="column" p={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  backgroundColor: "whitesmoke",
                  width: "115%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "10px",
                        backgroundColor: "#7469b6",
                        color: "white",
                        height: "120px",
                        boxShadow: "0 4px 8px rgba(116, 105, 182, 1)",
                        borderRadius: "0.9rem", // Dark box shadow of the same color
                      }}
                    >
                      <Typography variant="h6" style={{ color: "black" }}>
                        Number of Active Orders
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h4">50</Typography>
                        <Box
                          position="relative"
                          display="inline-flex"
                          style={{
                            backgroundColor: "white",
                            width: "2.9em",
                            height: "3em",
                            borderRadius: "6px",
                          }}
                        >
                          <TrendingUpIcon
                            size={100}
                            style={{
                              width: "1.7em",
                              height: "2em",
                              color: "green",
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <IconButton
                          size="small"
                          style={{ padding: "3px", color: "white" }}
                        >
                          <InfoIcon fontSize="extra-small" />
                        </IconButton>
                        <Typography fontSize="small">
                          Number of Active Orders
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "0.9rem",
                        boxShadow: "0 4px 8px rgba(33, 33, 33, 0.8)",
                      }}
                    >
                      <Typography variant="h6">
                        Total No. of Work Cards
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h4">10</Typography>
                        <Box position="relative" display="inline-flex">
                          <CircularProgress
                            variant="determinate"
                            value={50}
                            size={40}
                          />
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            style={{
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <Typography variant="caption" color="textSecondary">
                              50%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <IconButton size="small" style={{ padding: "3px" }}>
                          <InfoIcon fontSize="extra-small" />
                        </IconButton>
                        <Typography fontSize="small">
                          5 completed cards
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "10px",
                        backgroundColor: "rgb(225,175,209)",
                        color: "white",
                        boxShadow: "0 4px 8px rgba(225,175,209, 1)", // Dark box shadow of the same color
                        borderRadius: "0.9rem", // Dark box shadow of the same color
                      }}
                    >
                      <Typography variant="h6" style={{ color: "black" }}>
                        Total Number of Issues
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h4">13</Typography>
                        <Box position="relative" display="inline-flex">
                          <Assignment
                            size={100}
                            style={{
                              width: "2em",
                              height: "2em",
                              color: "black",
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="left"
                      >
                        <IconButton
                          size="small"
                          style={{ padding: "3px", color: "white" }}
                        >
                          <InfoIcon fontSize="extra-small" />
                        </IconButton>
                        <Typography fontSize="small">
                          7 Issues are critical
                        </Typography>
                      </Box>
                      {/* <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                       
                      >
                        View All
                      </Button> */}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Paper
                      elevation={3}
                      style={{
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "0.9rem",
                        boxShadow: "0 4px 8px rgba(33,33,33, 0.8)",
                      }}
                    >
                      <Typography variant="h6">
                        Risk Warning Activity
                      </Typography>
                      <Typography variant="h4" style={{ marginBottom: "10px" }}>
                        80%
                      </Typography>
                      <Box display="flex" alignItems="center">
                        <WarningIcon color="error" fontSize="extra-small" />
                        <Box ml={1}>
                          <Typography fontSize="small">
                            2 Risk yet to resolve
                          </Typography>
                        </Box>
                      </Box>
                      {/* <Button variant="contained" color="primary" size="small">
                        View All
                      </Button> */}
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  width: "90%",
                  marginLeft: "14%",
                  borderRadius: "0.5rem",
                }}
              >
                <Typography variant="h5" style={{ marginBottom: "7px" }}>
                  Orders
                </Typography>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                    }}
                  >
                    <ShoppingCartCheckoutIcon />
                    <Typography>01 IC 00077010000</Typography>
                    <Typography>X400</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(234, 237, 242, 0.5)", // Transparent gray color
                        color: "black", // Text color
                        "&:hover": {
                          backgroundColor: "rgba(234, 237, 242, 0.7)", // Slightly darker gray on hover
                        },
                      }}
                    >
                      Allocated
                    </Button>
                  </Box>
 
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                    }}
                  >
                    <ShoppingCartCheckoutIcon />
                    <Typography>01 IC 00077010000</Typography>
                    <Typography>X400</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(234, 237, 242, 0.5)", // Transparent gray color
                        color: "black", // Text color
                        "&:hover": {
                          backgroundColor: "rgba(234, 237, 242, 0.7)", // Slightly darker gray on hover
                        },
                      }}
                    >
                      Allocated
                    </Button>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <ShoppingCartCheckoutIcon />
 
                    <Typography>01 IC 00077010000</Typography>
                    <Typography>X400</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        backgroundColor: "rgba(234, 237, 242, 0.5)", // Transparent gray color
                        color: "black", // Text color
                        "&:hover": {
                          backgroundColor: "rgba(234, 237, 242, 0.7)", // Slightly darker gray on hover
                        },
                      }}
                    >
                      Allocated
                    </Button>
                  </Box>
 
                  <Button
                    size="small"
                    variant="contained"
                    style={{ backgroundColor: "#7469B6", width: "100%" }}
                    startIcon={<AddIcon />}
                  >
                    Create Order
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  width: "115%",
                  borderRadius: "0.5rem",
                }}
              >
                <Typography variant="h5" style={{ marginBottom: "7px" }}>Rejected Work Cards</Typography>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={4}
                //   checkboxSelection
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                style={{
                  padding: "20px",
                  width: "90%",
                  marginLeft: "14%",
                  borderRadius: "0.5rem",
                }}
              >
                <Typography variant="h5" style={{ marginBottom: "7px" }}>Inventory Summary</Typography>
                <Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                    }}
                  >
                    <ViewInArIcon />
                    <div>
                      <Typography
                        style={{
                          backgroundColor: "#7469B6",
                          borderRadius: "0.3rem",
                          textAlign: "center",
                          width: "50px",
                        }}
                      >
                        Type
                      </Typography>
                      <Typography>Raw material</Typography>
                    </div>
                    <div>
                      <Typography
                        style={{
                          color: "gray",
                          textAlign: "center",
                        }}
                      >
                        Number of Product
                      </Typography>
                      <Typography>50</Typography>
                    </div>
                   
                  </Box>
 
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                    }}
                  >
                    <ViewInArIcon />
                    <div>
                      <Typography
                        style={{
                          backgroundColor: "#7469B6",
                          borderRadius: "0.3rem",
                          textAlign: "center",
                          width: "50px",
                        }}
                      >
                        Type
                      </Typography>
                      <Typography>Raw material</Typography>
                    </div>
                    <div>
                      <Typography
                        style={{
                          color: "gray",
                          textAlign: "center",
                        }}
                      >
                        Number of Product
                      </Typography>
                      <Typography>50</Typography>
                    </div>
                   
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1} // Adding margin below this Box
                    style={{
                      border: "1px solid #ccc", // Adding border
                      borderRadius: "8px", // Optional rounded corners
                      padding: "10px",
                      marginBottom: "15px",
                    }}
                  >
                    <ViewInArIcon />
 
                    <div>
                      <Typography
                        style={{
                          backgroundColor: "#7469B6",
                          borderRadius: "0.3rem",
                          textAlign: "center",
                          width: "50px",
                        }}
                      >
                        Type
                      </Typography>
                      <Typography>Raw material</Typography>
                    </div>
                    <div>
                      <Typography
                        style={{
                          color: "gray",
                          textAlign: "center",
                        }}
                      >
                        Number of Product
                      </Typography>
                      <Typography>50</Typography>
                    </div>
                   
                  </Box>
 
                  <Button
                 
                    size="small"
                    variant="contained"
                    sx={{
                        marginLeft:"40%",
                        backgroundColor: "transparent",
                        border: "1px solid black",
                        borderRadius: "8px",
                        color: "black", // Text color
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.1)", // Light black on hover
                        },
                      }}
                   
                  >
                    Load More
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};
 
export default DashboardComponent;
 