import { Button } from "../npm-package/src/components/ui/Button.ui";
import { Input } from "../npm-package/src/components/ui/Input.ui";
import { Select } from "../npm-package/src/components/ui/Select.ui";
import { Checkbox } from "../npm-package/src/components/ui/Checkbox.ui";
import { Spinner } from "../npm-package/src/components/ui/Spinner.ui";
import { TextDisplay } from "../npm-package/src/components/ui/TextDisplay.ui";
import styled from "styled-components";

export const UI: React.FC = () => (
  <>
    <h2>UI</h2>
    <h3>Input</h3>
    <StyledRow>
      <StyledCol>
        <h4>Text</h4>
        <Input />
        <Input label="Label" />
      </StyledCol>
      <StyledCol>
        <h4>Number</h4>
        <Input type="number" />
        <Input type="number" label="Label" />
      </StyledCol>
      <StyledCol>
        <h4>Error</h4>
        <Input error="Error" />
        <Input label="Label" error="Error" />
      </StyledCol>
    </StyledRow>
    <h3>Select</h3>
    <Select
      options={[
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
      ]}
    />
    <Select
      label="Label"
      options={[
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
      ]}
    />
    <h3>Checkbox</h3>
    <StyledRow>
      <StyledCol>
        <Checkbox label="Checkbox 1" />
        <Checkbox label="Checkbox 2" />
        <Checkbox label="Checkbox 3" />
      </StyledCol>
      <StyledCol>
        <Checkbox label="Radio 1" type="radio" name="1" />
        <Checkbox label="Radio 2" type="radio" name="1" />
        <Checkbox label="Radio 3" type="radio" name="1" />
      </StyledCol>
    </StyledRow>

    <h3>Button</h3>
    <Button variant="primary">Button</Button>
    <Button variant="secondary">Button</Button>
    <Button variant="tertiary">Button</Button>
    <h3>Spinner</h3>
    <Spinner />
    <h3>Text display</h3>
    <TextDisplay label="Label" value="value" />
  </>
);

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
