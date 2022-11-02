import { Ellipsis } from "./Ellipsis";
import { PageLink, basePageLink } from "./page-link";

type lineUpPageLinksProps = {
  lastPage: number;
  currentPage: number;
  PageLink: PageLink;
};

const lineUpPageLinks = ({
  lastPage,
  currentPage,
  PageLink
}: lineUpPageLinksProps) => {
  // ページ数が5までの場合は単純にリンクを並べる
  if (lastPage < 6) {
    const pageLinks = [...Array(lastPage)].map((_, index) =>
      PageLink({ page: index + 1 })
    );
    return () => (
      <>
        {pageLinks.map((PageLink, index) => (
          <PageLink key={index} />
        ))}
      </>
    );
  }

  const Void = () => null;
  const FirstPageLink = PageLink({ page: 1 });
  const PreviousEllipsis = currentPage > 3 ? Ellipsis : Void;
  const PreviousPageLink =
    currentPage > 2 ? PageLink({ page: currentPage - 1 }) : Void;
  const CurrentPageLink =
    currentPage !== 1 && currentPage !== lastPage
      ? PageLink({ page: currentPage })
      : Void;
  const NextPageLink =
    currentPage < lastPage - 1 ? PageLink({ page: currentPage + 1 }) : Void;
  const NextEllipsis = currentPage < lastPage - 2 ? Ellipsis : Void;
  const LastPageLink = PageLink({ page: lastPage });

  return () => (
    <>
      <FirstPageLink /> {/* 左端のリンク */}
      <PreviousEllipsis /> {/* 左側の...の表示 */}
      <PreviousPageLink /> {/* 現在ページの一つ前のリンク */}
      <CurrentPageLink /> {/* 現在ページのリンク */}
      <NextPageLink /> {/* 現在ページの一つ次のリンク */}
      <NextEllipsis /> {/* 右側の...の表示 */}
      <LastPageLink /> {/* 右端のリンク */}
    </>
  );
};

type PaginationProps = {
  total: number;
  limit: number;
  currentPage: number;
  onSelectPage: (pageNumber: number) => void;
};

/**
 * 選択肢は最大5つ表示
 * □□□□□
 * ■□...□
 * □■□...□
 * □□■□...□
 * □...□■□...□
 * □...□■□□
 * □...□■□
 * □...□■
 */
const Pagination = ({
  total,
  limit,
  currentPage,
  onSelectPage
}: PaginationProps) => {
  if (currentPage < 1) {
    alert("Current page must be greater than 0");
    return <></>;
  }

  if (total === 0) return <></>;

  const lastPage = Math.ceil(total / limit);

  if (lastPage < currentPage) {
    alert("Current page exceeds last page");
    return <></>;
  }

  const currentPageIsFirst = currentPage === 1;
  const currentPageIsLast = currentPage === lastPage;

  const PageLink = basePageLink({
    currentPage,
    onSelectPage
  });

  const PreviousPageLink = PageLink({ page: currentPage - 1, label: "◀" });
  const NextPageLink = PageLink({ page: currentPage + 1, label: "▶" });
  const PageLinks = lineUpPageLinks({
    lastPage,
    currentPage,
    PageLink
  });

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      style={{
        display: "flex",
        gap: ".5rem"
      }}
    >
      {!currentPageIsFirst && <PreviousPageLink />}
      <PageLinks />
      {!currentPageIsLast && <NextPageLink />}
    </nav>
  );
};

export { Pagination };
