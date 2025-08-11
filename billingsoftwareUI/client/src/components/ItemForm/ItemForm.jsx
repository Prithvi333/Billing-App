import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContextProvider";
import { toast } from "react-toastify";
import { addItem } from "../../service/ItemService";

const initialData = {
  name: "",
  categoryId: "",
  price: "",
  description: "",
};

const ItemForm = () => {
  const { categories, setItems, setCategories } = useContext(AppContext);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("item", JSON.stringify(data));
    formData.append("file", image);

    try {
      if (!image) {
        toast.error("Select a Image");
        return;
      }
      const response = await addItem(formData);
      if (response.status == 201) {
        setItems((prevItem) => [...prevItem, response.data]);
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.categoryId == response.data.categoryId
              ? { ...category, items: category.items + 1 }
              : category
          )
        );
        toast.success("item added");
        setData(initialData);
        setImage(false);
      } else {
        toast.error("Unable to add item");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to add item");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="item-form-container"
      style={{ height: "100vh", overflowY: "auto", overflowX: "hidden" }}
    >
      <div className="mx-2 mt-2">
        <div className="row">
          <div className="card col-md-8 form-container">
            <div className="card-body">
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload}
                      alt=""
                      width={48}
                    />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Item Name"
                    value={data.name}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    id="categoryId"
                    className="form-control"
                    onChange={onChangeHandler}
                    value={data.categoryId}
                  >
                    <option value="">--SELECT CATEGROY--</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="form-control"
                    placeholder="&#8377;200.00"
                    onChange={onChangeHandler}
                    value={data.price}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Write content here..."
                    onChange={onChangeHandler}
                    value={data.description}
                  ></textarea>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-warning w-100 "
                >
                  {loading ? "Loading..." : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
