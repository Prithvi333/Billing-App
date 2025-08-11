import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import "./CategoryList.css";
import { deleteCategory } from "../../service/CategoryService";
import { toast } from "react-toastify";
const CategoryList = () => {
  const [searchKeyWord, setSearchKeyword] = useState("");
  const { categories, setCategories } = useContext(AppContext);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchKeyWord.toLowerCase())
  );

  const deleteCategoryById = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);
      if (response.status == 204) {
        setCategories(
          categories.filter((category) => category.categoryId != categoryId)
        );
        toast.success("Category deleted");
      } else {
        toast.error("Unable to delete category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured while deleting the category");
    }
  };

  return (
    <div
      className="category-list-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input
            type="text"
            name="keyword"
            id="keyword"
            value={searchKeyWord}
            placeholder="Search by keyword"
            className="form-control"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => (
          <div key={index} className="col-12">
            <div
              className="card p-3"
              key={index}
              style={{ backgroundColor: category.bgColor }}
            >
              <div className="d-flex align-items-center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    className="category-image"
                    src={category.imgUrl}
                    alt={category.name}
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 text-white">{category.name}</h5>
                  <p className="mb-0 text-white">{category.items}</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      deleteCategoryById(category.categoryId);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
