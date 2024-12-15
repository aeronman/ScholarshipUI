// GlobalFilter.js
export const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
    return (
      <span>
        Search:{" "}
        <input
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value || undefined)}
          placeholder={"Search..."}
        />
      </span>
    );
  };
  