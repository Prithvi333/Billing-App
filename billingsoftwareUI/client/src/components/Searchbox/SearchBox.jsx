const SearchBox = ({ onSearch, text }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search items..."
        value={text}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="input-group-text bg-warning">
        <i className="bi bi-search"></i>
      </span>
    </div>
  );
};

export default SearchBox;
