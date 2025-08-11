import { useContext, useState } from "react";
import "./DisplayItem.css";
import { AppContext } from "../../context/AppContextProvider";
import Item from "../Item/Item";
import SearchBox from "../Searchbox/SearchBox";

const DisplayItem = ({ selectedCategory }) => {
  const { items } = useContext(AppContext);
  const [searchText, setSearchText] = useState("");

  const filteredItems = items.filter((item) => {
    if (selectedCategory && item.categoryId != selectedCategory) {
      return false;
    }
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div></div>
        <div>
          <SearchBox onSearch={setSearchText} text={searchText} />
        </div>
      </div>
      <div className="row g-3">
        {filteredItems.map((item, index) => (
          <div className="col-mid-4 col-sm-6" key={index}>
            <Item
              itemName={item.name}
              itemPrice={item.price}
              itemImage={item.imgUrl}
              itemId={item.itemId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayItem;
