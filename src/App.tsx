import "./styles.css";
import { Pagination } from "./pagination";
import { useState } from "react";

export default function App() {
  const [total, setTotal] = useState(100);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(5);

  return (
    <div className="App">
      total:
      <input
        type="number"
        value={total}
        onChange={(value) => setTotal(Number(value.target.value))}
      />
      <br />
      limit:
      <input
        type="number"
        value={limit}
        onChange={(value) => setLimit(Number(value.target.value))}
      />
      <br />
      current:
      <input
        type="number"
        value={currentPage}
        onChange={(value) => setCurrentPage(Number(value.target.value))}
      />
      <br />
      <br />
      <Pagination
        total={total}
        limit={limit}
        currentPage={currentPage}
        onSelectPage={(selectedPage) => {
          console.log(selectedPage);
        }}
      />
    </div>
  );
}
