import { useMemo } from "react";
import { Button } from "../ui/Button.ui";
import { ChevronLeft } from "../ui/icons/ChevronLeft.icon";
import { DoubleChevronLeft } from "../ui/icons/DoubleChevronLeft.icon";
import { ChevronRight } from "../ui/icons/ChevronRight.icon";
import { DoubleChevronRight } from "../ui/icons/DoubleChevronRight.icon";

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
    <div
      className={`
        flex justify-between items-center
        px-6 py-1
        rounded-b-lg
        bg-red-400
        ${styles?.container ?? ""}`}
    >
      <div className={`font-bold ${styles?.visibleRowsIndicator ?? ""}`}>
        Showing {currentPage * rowsPerPage - (rowsPerPage - 1)}-
        {numberOfPages === currentPage
          ? currentPage * rowsPerPage -
            (numberOfPages * rowsPerPage - numberOfRows)
          : currentPage * rowsPerPage}{" "}
        of {numberOfRows}
      </div>
      <div className="flex items-center">
        <Button
          className={`!px-0 ${styles?.pageSelection?.first ?? ""}`}
          variant="primary"
          onClick={() => setCurrentPage(1)}
        >
          <DoubleChevronLeft className="!fill-slate-200" />
        </Button>
        <Button
          className={`!px-0 ${styles?.pageSelection?.previous ?? ""}`}
          variant="primary"
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
        >
          <ChevronLeft className="!fill-slate-200" />
        </Button>
        <div>
          {pagesSelector.map((item, index) => (
            <Button
              key={index}
              className={`
                !px-1.5
                  ${
                    item === currentPage
                      ? `!text-red-400 pointer-events-none select-none ${
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
            </Button>
          ))}
        </div>
        <Button
          className={`!px-0 ${styles?.pageSelection?.next ?? ""}`}
          variant="primary"
          onClick={() => {
            if (currentPage < numberOfPages) setCurrentPage(currentPage + 1);
          }}
        >
          <ChevronRight className="!fill-slate-200" />
        </Button>
        <Button
          className={`!px-0 ${styles?.pageSelection?.last ?? ""}`}
          variant="primary"
          onClick={() => setCurrentPage(numberOfPages)}
        >
          <DoubleChevronRight className="!fill-slate-200" />
        </Button>
      </div>
    </div>
  );
};

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
