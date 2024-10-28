import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background: white;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 5px;
  border-radius: 10px;
`;

export const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormHelperText = styled.span`
  margin: 0;
  color: red;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const LinkStyled = styled.a`
    text-decoration:none;
`;