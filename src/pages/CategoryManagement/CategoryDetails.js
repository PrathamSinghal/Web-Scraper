import React, { useState, useEffect } from "react";
import {
  DashboardContainer,
  DashboardWrapper,
  DashboardHeading,
  DashTableHead,
  SearchRow,
  DetailsParaLink,
  FetchDetailsButton,
  DashTableRow,
  HomeText,
  BottomContainer,
  BottomContainerTop,
  BottomContainerLeft,
  LeftImage,
  LeftDetails,
  WebsiteHeading,
  BottomContainerRight,
  BottomContainerBottom,
  CompanyDetails,
  DetailsHeading,
  DetailsSection,
  DetailsNameRow,
  DetailNameIcon,
  DetailName,
  DetailsPara,
  CompanyScreenshot,
  ScreenshotRow,
  ScreenshotImage,
  DashboardWrapperDetails
} from "./CategoryElements";
// import { EarthIcon } from "../../components/SvgElements";
import Camera from "../../assets/Camera.svg";
import EarthIcon from "../../assets/EarthIcon.svg";
import Email from "../../assets/Email.svg";
import Facebook from "../../assets/Facebook.svg";
import Info from "../../assets/Info.svg";
import Instagram from "../../assets/Instagram.svg";
import Linkedin from "../../assets/Linkedin.svg";
import Location from "../../assets/Location.svg";
import Phone from "../../assets/Phone.svg";
import Twitter from "../../assets/Twitter.svg";
import PlaceholderLogo from "../../assets/logo-Placeholder.jpg";
import * as FaIcons from "react-icons/fa"


import axios from "../../axios";
import Overlay from "../../components/Overlay";
import { toast } from "react-toastify";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import { withRouter, useParams } from "react-router-dom";
import { SearchContainer, SearchBar, SearchIcon, SearchInput } from "../../components/SearchBar/SearchElements";

const OfferManagement = ({ history, setUsers, userData }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [domainValue, setDomainValue] = useState("");
  const [tableData, setTableData] = useState([]);
  const [websiteData, setWebsiteData] = useState("");

  const params = useParams();


  useEffect(() => {
    if(params?.id) {
        getWebsiteData(params?.id);
    }
}, [params?.id]);

  useEffect(() => {
    getScrapList();
  }, []);


  const getScrapList = async (page = 1, rowsPerPage = 10) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`user/scrapList?page=${page}&pageSize=${rowsPerPage}`);
      setTableData(data.data.docs);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const getWebsiteData = async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`user/getScrapDetails/${id}`);
      setWebsiteData(data.data);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
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

  console.log(websiteData,"websiteData");

  return (
    <>
      <div>
        <DashboardContainer>
          <DashboardWrapperDetails>
            <DashboardHeading>

              <SearchRow>
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
              </SearchRow>
            </DashboardHeading>
            <DashboardHeading>
                <DashTableRow>
                    <HomeText>
                        Home
                    </HomeText>
                    <HomeText>
                        {'>'}
                    </HomeText>
                    <HomeText>
                        {websiteData?.companyName || "N/A"}
                    </HomeText>
                </DashTableRow>
            </DashboardHeading>

            <BottomContainer>
                <BottomContainerTop>
                    <BottomContainerLeft>
                      <LeftImage src={websiteData?.logo || PlaceholderLogo} alt="website_logo"/>
                      <LeftDetails>
                        <WebsiteHeading>
                          {websiteData?.companyName || "N/A"}
                        </WebsiteHeading>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Info}>
                            </DetailNameIcon>
                            <DetailName>
                            Description
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsPara>
                            {websiteData?.description || "N/A"}
                          </DetailsPara>
                        </DetailsSection>

                      </LeftDetails>
                    </BottomContainerLeft>
                    <BottomContainerRight>
                      <DetailsSection>
                        <DetailsNameRow>
                          <DetailNameIcon src={Phone}>
                          </DetailNameIcon>
                          <DetailName>
                          Phone
                          </DetailName>
                        </DetailsNameRow>
                        <DetailsPara>
                          {websiteData?.phone || "N/A"}
                        </DetailsPara>
                      </DetailsSection>
                      <DetailsSection>
                        <DetailsNameRow>
                          <DetailNameIcon src={Email}>
                          </DetailNameIcon>
                          <DetailName>
                          Email
                          </DetailName>
                        </DetailsNameRow>
                        <DetailsPara>
                          {websiteData?.emails ? (
                            <>
                              {websiteData?.emails.length>0 ? (
                                <>
                                  {websiteData?.emails[0]}
                                </>
                              ) : "N/A"}
                            </>
                          ): "N/A"}
                        </DetailsPara>
                      </DetailsSection>
                    </BottomContainerRight>
                </BottomContainerTop>
                <BottomContainerBottom>
                    <div className="col-md-3">
                      <CompanyDetails>
                        <DetailsHeading>
                          Company Details
                        </DetailsHeading>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={EarthIcon}>
                            </DetailNameIcon>
                            <DetailName>
                            Website
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsPara>
                            {websiteData?.webUrl || "N/A"}
                          </DetailsPara>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Info}>
                            </DetailNameIcon>
                            <DetailName>
                            Description
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsPara>
                            {websiteData?.description || "N/A"}
                          </DetailsPara>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Email}>
                            </DetailNameIcon>
                            <DetailName>
                            Email
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsPara>
                            {websiteData?.emails ? (
                              <>
                                {websiteData?.emails.length>0 ? (
                                  <>
                                    {websiteData?.emails[0]}
                                  </>
                                ) : "N/A"}
                              </>
                            ): "N/A"}
                          </DetailsPara>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Facebook}>
                            </DetailNameIcon>
                            <DetailName>
                            Facebook
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsParaLink href={websiteData?.facebook} target="_blank">
                            {websiteData?.facebook || "N/A"}
                          </DetailsParaLink>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Instagram}>
                            </DetailNameIcon>
                            <DetailName>
                            Instagram
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsParaLink href={websiteData?.instagram} target="_blank">
                            {websiteData?.instagram || "N/A"}
                          </DetailsParaLink>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Twitter}>
                            </DetailNameIcon>
                            <DetailName>
                            Twitter
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsParaLink href={websiteData?.twitter} target="_blank">
                            {websiteData?.twitter || "N/A"}
                          </DetailsParaLink>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Linkedin}>
                            </DetailNameIcon>
                            <DetailName>
                            Linkedin
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsParaLink href={websiteData?.linkedin} target="_blank">
                            {websiteData?.linkedin || "N/A"}
                          </DetailsParaLink>
                        </DetailsSection>
                        <DetailsSection>
                          <DetailsNameRow>
                            <DetailNameIcon src={Location}>
                            </DetailNameIcon>
                            <DetailName>
                            Address
                            </DetailName>
                          </DetailsNameRow>
                          <DetailsPara>
                            {websiteData?.address || "N/A"}
                          </DetailsPara>
                        </DetailsSection>
                      </CompanyDetails>
                    </div>
                    <div className="col-md-9 mdColPadding">
                      <CompanyScreenshot>
                        <ScreenshotRow>
                          <DetailsSection>
                            <DetailsNameRow>
                              <DetailNameIcon src={Camera}>
                              </DetailNameIcon>
                              <DetailsHeading>
                              Screenshot of Webpage
                              </DetailsHeading>
                            </DetailsNameRow>
                          </DetailsSection>
                        </ScreenshotRow>
                        <ScreenshotImage src={`data:image/jpeg;base64, ${websiteData?.screenshot}`} />
                      </CompanyScreenshot>
                    </div>
                </BottomContainerBottom>
            </BottomContainer>
            
          </DashboardWrapperDetails>
        </DashboardContainer>
      </div>
      {isLoading && <Overlay />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (updatedValue) => {
      dispatch({
        type: actionTypes.UPDATE_USER,
        updatedUser: updatedValue,
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferManagement));
