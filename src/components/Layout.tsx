import styled from "styled-components";
import { Button } from "../npm-package/src/components/ui/Button.ui";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <StyledTitle>React data table and ui components</StyledTitle>
      <StyledNavigation>
        {/* <Button size="lg" onClick={() => navigate("/")}>Home</Button> */}
        <Button size="lg" onClick={() => navigate("/data-table")}>
          Data table
        </Button>
        <Button size="lg" onClick={() => navigate("/ui-components")}>
          UI Components
        </Button>
      </StyledNavigation>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledContainer>
  );
};

const StyledTitle = styled.h1`
  text-align: center;
  margin: 0;
  margin-bottom: 2rem;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledNavigation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StyledContainer = styled.div`
  margin: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 1240px) {
    margin-left: 8rem;
    margin-right: 8rem;
  }
`;
