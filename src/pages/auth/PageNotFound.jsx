import React from "react";
import DefaultLayout from "../../components/Layout/default";
import {
  Container,
  LinkStyled
} from "../../components/formElements/FormStyledComponents";
import TopMenu from "../../components/elements/TopMenu";

const PageNotFound = () => {
  
  return (
    <DefaultLayout>
      <TopMenu />
      <Container>
        <h2>Page Not Found</h2>
        <LinkStyled href="/">Back To Home</LinkStyled>
      </Container>
    </DefaultLayout>
  );
};

export default PageNotFound;
