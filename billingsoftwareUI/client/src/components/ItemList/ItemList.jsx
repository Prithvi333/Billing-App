import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { deleteItem } from "../../service/ItemService";
import { toast } from "react-toastify";
import "./ItemList.css";
const ItemList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { items, setItems, setCategories } = useContext(AppContext);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const removeItem = async (itemId, categoryId) => {
    try {
      const response = await deleteItem(itemId);
      if (response.status == 204) {
        setItems(items.filter((item) => item.itemId != itemId));
        toast.success("Item deleted");
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId == categoryId
              ? { ...category, items: category.items - 1 }
              : category
          )
        );
      } else {
        toast.error("Unable to delete item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to delete item");
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
            value={searchKeyword}
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
        {filteredItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items center">
                <div style={{ marginRight: "15px" }}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">
                    Category : {item.categoryName}
                  </p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    &#8377;{item.price}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.itemId, item.categoryId)}
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

export default ItemList;
