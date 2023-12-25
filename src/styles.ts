import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    align-items: center;
    jsutify-content: space-between;
    gap: .3rem;
    padding: .8rem 1rem;
    background-color: #019416;
    color: #eeffef;
    font-weight: 600;
    font-size: 1rem;
    border-radius: .5rem;
    border: none;
    
    &:hover {
        background-color: #085f17;
    }
`;