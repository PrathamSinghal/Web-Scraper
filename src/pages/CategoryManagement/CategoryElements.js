import styled from "styled-components/macro";

export const DashboardContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#F2F2F2")};
  /* margin-left: 280px; */
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;

  @media screen and (max-width: 780px) {
    margin-left: 0px;
  }

  @media screen and (max-width: 480px) {
    margin-left: 0px;
  }
`

export const DashboardWrapper = styled.div`
  display: flex;
  z-index: 1;
  height: 100vh;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`
export const DashboardWrapperDetails = styled.div`
  display: flex;
  z-index: 1;
  height: 100%;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

export const DashboardHeading = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #FFFFFF;
  padding: 0.75rem 0.8rem;
`

export const DashTableHead = styled.div`
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 99%;
  background: #FFFFFF;
  padding: 0.75rem 0.8rem;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`

export const FetchDetailsButton = styled.button`
  border-radius: 5px;
  opacity: 1;
  white-space: nowrap;
  border: none;
  background: #EDE5FF;
  font-family: Helvetica;
  
  font-weight: 500;
  color: #6C2BD9;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`


export const DashTableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`
export const DashButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`
export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem;
`
export const BottomContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1rem;
  background: #FFFFFF;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`
export const BottomContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem;

  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: flex-start;
  }

`
export const BottomContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem;
  padding-left: 2rem;

  @media screen and (max-width: 520px) {
    padding-left: 0.5rem;
  }

`
export const BottomContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding-top: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

`
export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.5rem 0rem;
`
export const DetailsNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`
export const LeftDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-left: 1rem;
  padding-right: 2rem;
  border-right: 1px solid #ECECEC;

  @media screen and (max-width: 768px) {
    border-right: unset;
    padding-top: 1rem;
  }

  @media screen and (max-width: 520px) {
    padding-left: 0rem;
  }


`
export const LeftImage = styled.img`
  width: 200px;
  height: 170px;
  background: #000000;
`
export const CompanyDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  background: #FFFFFF;
`
export const CompanyScreenshot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 1.5rem;
  background: #FFFFFF;
`
export const ScreenshotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`

export const SelectedText = styled.h5`
  font-size: 1rem;
  padding: 0.5rem 4rem 0.5rem 0.5rem;
  color: #334155;
`

export const HomeText = styled.h5`
  font-size: 0.9rem;
  padding: 0rem 2rem 0.5rem 0.5rem;
  color: #334155;
  margin-bottom: 0rem;
`

export const ScrapButton = styled.button`
  border-radius: 5px;
  opacity: 1;
  white-space: nowrap;
  border: none;
  background: #FFFFFF;
  font-family: Helvetica;
  margin-right: 1rem;
  color: ${({ isActive }) => (isActive ? "#6C2BD9" : "#A2A2A2")};

  border: 1px solid #ECECEC;

  font-weight: 500;
  font-size: 0.85rem;
  outline: none;
  cursor: pointer;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
`
export const DetailsHeading = styled.h5`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  width: 100%;
  margin-bottom: 0rem;
`
export const WebsiteHeading = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  width: 100%;

`
export const DetailsPara = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #374151;
  width: 100%;
`
export const DetailsParaLink = styled.a`
  font-size: 0.9rem;
  font-weight: 400;
  color: #6C2BD9;
  width: 100%;
  word-wrap: break-word;

`
export const DetailName = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #64748B;
`
export const DetailNameIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
`
export const ScreenshotImage = styled.img`
  width: 100%;
  height: 100%;
`
export const SearchRow = styled.div`
  display: flex;
  gap: 1rem;
  width: calc(100%);

  @media screen and (max-width: 520px) {
        flex-direction: column;
  }

`