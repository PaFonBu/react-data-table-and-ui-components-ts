import styled from "styled-components";
import { Button } from "../npm-package/src/components/ui/Button.ui";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledContainer>
      <h1>React data table and ui components</h1>
      <StyledNavigation>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/data-table")}>Data table</Button>
        <Button onClick={() => navigate("/ui")}>UI</Button>
      </StyledNavigation>
      <StyledContent>
        <Outlet />
      </StyledContent>
    </StyledContainer>
  );
};

const StyledContent = styled.div`
  margin-right: 2rem;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledNavigation = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledContainer = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;
