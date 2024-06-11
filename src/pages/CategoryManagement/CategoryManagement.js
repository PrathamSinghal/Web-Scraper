import React, { useState, useEffect } from "react";
import {
  DashboardContainer,
  DashboardWrapper,
  DashboardHeading,
  DashTableHead,
  FetchDetailsButton,
  DashTableRow,
  SelectedText,
  DashButtons,
  ScrapButton
} from "./CategoryElements";
import Input from "../../components/Input";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios";
import Overlay from "../../components/Overlay";
import { toast } from "react-toastify";
import { get, isEmpty } from "lodash";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter } from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as FiIcons from "react-icons/fi"
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../components/SearchBar/SearchElements";
import { CSVLink, CSVDownload } from "react-csv";
import { extractCsvDataFromSection } from "../../utils/functions";
import Nodata from "../../components/Nodata";

const useStyles = makeStyles((theme) => ({
  textMiddle: {
    verticalAlign: "middle !important",
    textAlign: "center",
    color: "#6B7280"
  },
  tablePadding: {
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
    fontWeight: "800",
  },
  paperTableHeight: {
    height: "650px",
    width: "99%",
    marginLeft: "0.5rem",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  "@media (max-width: 780px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
  },
  "@media (max-width: 480px)": {
    paperTableHeight: {
      marginLeft: "0.75rem",
    },
  },
  tablePaginationStyle: {
    border: "1px solid #0000001a",
    borderRadius: "0rem 0rem 0.4rem 0.4rem",
    overflowY: "hidden",
  },
  tableContainerHeight: {
    height: "calc(100% - 52px)"
  },
  tableFlex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchDesign: {
    borderRadius: "20px",
    boxShadow: "none",
    width: "21%",
  },
}));

const OfferManagement = ({ history, setUsers, userData }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [domainValue, setDomainValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [deleteArray, setDeleteArray] = useState([]);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    getScrapList();
  }, []);

  // For Pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    getScrapList(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    getScrapList(1, event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const getScrapList = async (page = 1, rowsPerPage = 10) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`user/scrapList?page=${page}&pageSize=${rowsPerPage}`);
      setTableData(data.data.docs);
      setPage(page - 1);
      setRowsPerPage(rowsPerPage);

      let csvDataFromSection = extractCsvDataFromSection(data.data.docs)
      setCsvData(csvDataFromSection);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleDeleteScrapData = async (values) => {
    setIsLoading(true);
    try {

      let deleteData = {
        scrapIds: values
      }

      const { data } = await axios.post(`user/scrapDelete`,deleteData);
      setDeleteArray([]);
      toast.success(`Deleted Succesfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      getScrapList();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if(err?.response?.data?.errors) {
        toast.error(`${err.response.data.errors[0]?.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const handleSubmitScrapData = async (values) => {
    setIsLoading(true);
    try {

      let reqData = {
        webUrl: values
      }

      const { data } = await axios.post(`user/scrapData`,reqData);
      setDomainValue("");
      toast.success(`Website Scraped Succesfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setIsLoading(false);
      getScrapList();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if(err?.response?.data?.errors) {
        toast.error(`${err.response.data.errors[0]?.msg}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(`${err.response.data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  // function formatPhoneNumber(phoneNumberString) {
  //   console.log(phoneNumberString,"phoneNumberString");

  //   if(phoneNumberString.length===12) {

  //   }

  //   var cleaned = ('' + phoneNumberString).replace(/\\D/g, '');
  //   var match = cleaned.match(/^(\\d{3})(\\d{3})(\\d{4})$/);
  //   if (match) {
  //     return '(' + match[1] + ')' + '-' + match[2] + '-' + match[3];
  //   }
  //   return null;
  // }

  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapper>
            <DashboardHeading>

              <div style={{ display: "flex", gap: "1rem" }}>
                <SearchContainer>
                  <SearchBar>
                    <SearchIcon>
                      <FaIcons.FaSearch style={{ color: "#6B7280" }} />
                    </SearchIcon>
                    <SearchInput
                      type="text"
                      value={domainValue}
                      onChange={(e) => {
                        setDomainValue(e.target.value)
                      }}
                      placeholder="Enter domain name"
                    ></SearchInput>
                  </SearchBar>
                </SearchContainer>
                  <FetchDetailsButton
                    onClick={() => {
                      handleSubmitScrapData(domainValue);
                    }}
                  >
                    Fetch & Save Details
                  </FetchDetailsButton>
              </div>
            </DashboardHeading>
            <DashTableHead>
              {tableData.length > 0 ? (
                <>
                  <DashTableRow>
                    <SelectedText>
                        {deleteArray.length} Selected
                    </SelectedText>
                    <DashButtons>
                      <ScrapButton
                        isActive={deleteArray.length>0 ? true : false}
                        onClick={() => {
                          handleDeleteScrapData(deleteArray);
                        }}
                      >
                        Delete
                      </ScrapButton>
                      <ScrapButton>
                        <CSVLink
                          data={csvData}
                          filename={"ScrapData"}
                          // className="btn btn-primary"
                          target="_blank"
                        >
                        Export as CSV
                        </CSVLink>
                      </ScrapButton>
                    </DashButtons>
                  </DashTableRow>
                </>
              ) : ""}
            </DashTableHead>
            <Paper className={classes.paperTableHeight} style={{ overflow: "hidden", height: "100%"}}>
              <TableContainer className={classes.tableContainerHeight}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tablePadding} style={{ fontWeight: "800" }}>
                        <div style={{paddingLeft: "1rem"}}>
                          <Input
                              type="checkbox"
                              checked={deleteArray.length>0 && (deleteArray.length===tableData.length) ? true: false}
                              onChange={(e) => {
                                if(deleteArray.length===tableData.length) {
                                  // all delete
                                  setDeleteArray([]);
                                } else {
                                  // all push
                                  let array = []
                                  tableData.map(item => array.push(item._id));
                                  setDeleteArray(array);
                                }
                              }}
                              noBorderBottom={true}
                          />
                        </div>
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Company
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Social&nbsp;Profiles
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Description
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Address
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Phone&nbsp;No.
                      </TableCell>
                      <TableCell className={classes.tablePadding}>
                        Email
                      </TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((category, index) => (
                      <TableRow key={category._id}>
                        <TableCell component="th" scope="row" className={classes.textMiddle}>
                          <div style={{paddingLeft: "1rem"}}>
                            <Input
                                type="checkbox"
                                checked={deleteArray.includes(category._id) ? true: false}
                                onChange={(e) => {
                                  if(deleteArray.includes(category._id)) {
                                    // remove kardo
                                    const newArray = deleteArray.filter(item => item !== category._id);
                                    setDeleteArray(newArray)
                                  } else {
                                    setDeleteArray([
                                      ...deleteArray,
                                      category._id
                                    ])
                                  }
                                }}
                                noBorderBottom={true}
                            />
                          
                          </div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>
                            {category?.companyName ? (
                              <>
                                <div style={{color: "#6C2BD9", cursor: "pointer"}}
                                  onClick={() => {
                                    // window.open(category.webUrl,'_blank')
                                    history.push(`/websiteDetails/${category._id}`);
                                  }}
                                >
                                  {category?.companyName}
                                </div>
                              </>
                            ) : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>
                            {category.facebook ?
                              <FaIcons.FaFacebook style={{fontSize: "15px", marginRight: "0.4rem", color: "#ECECEC", cursor: "pointer"}}
                                onClick={() => {
                                  window.open(category.facebook,'_blank')
                                }}
                              />
                              : ""
                            }
                            {category.twitter ?
                              <FaIcons.FaTwitter style={{fontSize: "15px", marginRight: "0.4rem", color: "#ECECEC", cursor: "pointer"}}
                                onClick={() => {
                                  window.open(category.twitter,'_blank')
                                }}
                              />
                               : ""
                            }
                            {category.linkedin ?
                              <FaIcons.FaLinkedin style={{fontSize: "15px", marginRight: "0.4rem", color: "#ECECEC", cursor: "pointer"}}
                                onClick={() => {
                                  window.open(category.linkedin,'_blank')
                                }}
                              />
                              : ""
                            }
                          </div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "description", "") || "N/A"}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div>{get(category, "address", "") || "N/A"}</div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            {category?.phone ? (
                              <>
                                <div style={{color: "#6C2BD9"}}>
                                  {category?.phone}
                                </div>
                                <FiIcons.FiCopy
                                  style={{marginLeft: "0.5rem", cursor: "pointer"}}
                                  onClick={() => {
                                      // Get the text field
                                      var copyText =  category?.phone;
                                  
                                      // Copy the text inside the text field
                                      navigator.clipboard.writeText(copyText);
                                  
                                      toast.success(`Phone Number Copied to Clipboard`, {
                                          position: toast.POSITION.TOP_RIGHT,
                                      });
                                  }}
                                />
                              </>
                            ) : "N/A"}
                          </div>
                        </TableCell>
                        <TableCell className={classes.textMiddle}>
                          <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            {category?.emails ? (
                              <>
                                {category?.emails.length >0 ? (
                                  <>
                                    <div style={{color: "#6C2BD9"}}>
                                      {category?.emails[0]}
                                    </div>
                                    <FiIcons.FiCopy
                                      style={{marginLeft: "0.5rem", cursor: "pointer"}}
                                      onClick={() => {
                                          // Get the text field
                                          var copyText =  category?.emails[0];
                                      
                                          // Copy the text inside the text field
                                          navigator.clipboard.writeText(copyText);
                                      
                                          toast.success(`Email Copied to Clipboard`, {
                                              position: toast.POSITION.TOP_RIGHT,
                                          });
                                      }}
                                    />
                                  </>
                                ) : "N/A"}
                              </>
                            ): "N/A"}
                          </div>
                        </TableCell>
                        

                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {tableData.length === 0 ? <Nodata TextToDisplay="No Data Found." fontSize="24px" /> : false}
              <TablePagination
                className={classes.tablePaginationStyle}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </DashboardWrapper>
        </DashboardContainer>
      </div>
      {isLoading && <Overlay />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_USER,
        updatedUser: updatedValue,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferManagement));
