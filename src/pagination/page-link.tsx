type BasePageLinkProps = {
  currentPage: number;
  onSelectPage: (pageNumber: number) => void;
};

type PageLinkProps = {
  page: number;
  label?: string;
};

const basePageLink = ({ currentPage, onSelectPage }: BasePageLinkProps) => {
  const PageLink = ({ page, label }: PageLinkProps) => {
    const isCurrent = page === currentPage;
    return () => (
      <button
        // disabled={isCurrent}
        onClick={(event) => {
          event.preventDefault();
          onSelectPage(page);
        }}
        style={{
          cursor: "pointer",
          pointerEvents: isCurrent ? "none" : "auto",
          borderStyle: isCurrent ? "none" : ""
        }}
      >
        {label ?? page}
      </button>
    );
  };
  return PageLink;
};

type PageLink = ReturnType<typeof basePageLink>;

export type { PageLink };
export { basePageLink };
