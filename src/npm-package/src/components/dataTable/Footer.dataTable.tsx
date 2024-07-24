import { useMemo } from "react";
import { Button } from "../ui/Button.ui";
import { ChevronLeft } from "../ui/icons/ChevronLeft.icon";
import { DoubleChevronLeft } from "../ui/icons/DoubleChevronLeft.icon";
import { ChevronRight } from "../ui/icons/ChevronRight.icon";
import { DoubleChevronRight } from "../ui/icons/DoubleChevronRight.icon";
import styled from "styled-components";
import { colors } from "../../colors";

export const Footer: React.FC<FooterProps> = ({
  numberOfRows,
  rowsPerPage,
  numberOfPages,
  currentPage,
  setCurrentPage,
  styles,
}) => {
  const pagesSelector = useMemo(() => {
    let pagesSelectorOptions: number[] = [];
    switch (currentPage) {
      case 1:
        pagesSelectorOptions = [
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
          currentPage + 4,
        ];
        break;
      case 2:
        pagesSelectorOptions = [
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
          currentPage + 3,
        ];
        break;
      case 3:
        pagesSelectorOptions = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
        break;
      case 4:
        pagesSelectorOptions = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
        break;
      case numberOfPages - 1:
        pagesSelectorOptions = [
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
        ];
        break;
      case numberOfPages:
        pagesSelectorOptions = [
          currentPage - 4,
          currentPage - 3,
          currentPage - 2,
          currentPage - 1,
          currentPage,
        ];
        break;
      default:
        pagesSelectorOptions = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
        break;
    }
    const pagesSelectorOptionsLength = pagesSelectorOptions.length;
    for (let i = numberOfPages; i < pagesSelectorOptionsLength; i++)
      pagesSelectorOptions.pop();
    return pagesSelectorOptions;
  }, [numberOfPages, currentPage]);

  return (
    <StyledContainer className={styles?.container ?? ""}>
      <StyledVisibleRowsIndicator
        className={styles?.visibleRowsIndicator ?? ""}
      >
        Showing {currentPage * rowsPerPage - (rowsPerPage - 1)}-
        {numberOfPages === currentPage
          ? currentPage * rowsPerPage -
            (numberOfPages * rowsPerPage - numberOfRows)
          : currentPage * rowsPerPage}{" "}
        of {numberOfRows}
      </StyledVisibleRowsIndicator>
      <StyledPageSelector>
        <StyledArrowButton
          className={styles?.pageSelection?.first ?? ""}
          variant="primary"
          onClick={() => setCurrentPage(1)}
        >
          <StyledDoubleChevronLeft />
        </StyledArrowButton>
        <StyledArrowButton
          className={styles?.pageSelection?.previous ?? ""}
          variant="primary"
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
        >
          <StyledChevronLeft />
        </StyledArrowButton>
        <div>
          {pagesSelector.map((item, index) => (
            <StyledPageNumberButton
              key={index}
              className={`
                  ${
                    item === currentPage
                      ? `selected ${
                          styles?.pageSelection?.selectedPageNumber ?? ""
                        }`
                      : ""
                  }
                  ${styles?.pageSelection?.pageNumber ?? ""}`}
              variant={item === currentPage ? "secondary" : "primary"}
              size="sm"
              onClick={() => setCurrentPage(item)}
            >
              {item}
            </StyledPageNumberButton>
          ))}
        </div>
        <StyledArrowButton
          className={styles?.pageSelection?.next ?? ""}
          variant="primary"
          onClick={() => {
            if (currentPage < numberOfPages) setCurrentPage(currentPage + 1);
          }}
        >
          <StyledChevronRight />
        </StyledArrowButton>
        <StyledArrowButton
          className={styles?.pageSelection?.last ?? ""}
          variant="primary"
          onClick={() => setCurrentPage(numberOfPages)}
        >
          <StyledDoubleChevronRight />
        </StyledArrowButton>
      </StyledPageSelector>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1.5rem;
  background-color: var(--primary-color, ${colors.primary});
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

const StyledVisibleRowsIndicator = styled.div`
  font-weight: 500;
`;

const StyledPageSelector = styled.div`
  display: flex;
  align-items: center;
`;

const StyledArrowButton = styled(Button)`
  padding-left: 0;
  padding-right: 0;
`;

const StyledPageNumberButton = styled(Button)`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  &.selected {
    color: var(--primary-color, ${colors.primary});
    pointer-events: none;
    user-select: none;
  }
`;

const StyledDoubleChevronLeft = styled(DoubleChevronLeft)`
  vertical-align: middle;
`;

const StyledChevronLeft = styled(ChevronLeft)`
  vertical-align: middle;
`;

const StyledChevronRight = styled(ChevronRight)`
  vertical-align: middle;
`;

const StyledDoubleChevronRight = styled(DoubleChevronRight)`
  vertical-align: middle;
`;

interface FooterProps {
  numberOfRows: number;
  rowsPerPage: number;
  numberOfPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  styles?: FooterStyles;
}

export interface FooterStyles {
  container?: string;
  visibleRowsIndicator?: string;
  pageSelection?: {
    first?: string;
    previous?: string;
    pageNumber?: string;
    selectedPageNumber?: string;
    next?: string;
    last?: string;
  };
}
