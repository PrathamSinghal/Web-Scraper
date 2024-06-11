import styled from 'styled-components'

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 280px;


    @media screen and (max-width: 520px) {
        width: calc(100%);
    }
`




export const SearchBar = styled.div`
    width: 400px;
    margin: 0 auto;
    position: relative;
    display: flex;
    height: 38px;
    border: 1px solid #E5E7EB;
    background: #F9FAFB;
    border-radius: 5px;
    padding-left: 0.5rem;


`

export const SearchIcon = styled.span`
    width: 30px;
    padding: 5px;
    text-align: center;
    color: #6B7280;
    /* font-size: 20px; */
    background: #F9FAFB;
    border-radius: 8px 0px 0px 8px;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;


    @media screen and (max-width:480px) {
        width: 25px;
    }
    @media screen and (max-width:320px) {
        width: 20px;
    }


`

export const SearchInput = styled.input`
    width: 92%;
    border: none;
    padding: 5px;
    outline: none;
    background: #F9FAFB;
    border-radius: 0px 8px 8px 0px;
    opacity: 1;
    color: #6B7280;
    font-size: 0.9rem;
  
    &::placeholder{
        color: #c4c4c4;
    }
`
