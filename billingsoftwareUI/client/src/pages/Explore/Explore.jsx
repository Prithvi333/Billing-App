import "./Explore.css";
import CartItems from "../../components/CartItems/CartItems";
import CartSummary from "../../components/CartSummary/CartSummary";
import CustomerForm from "../../components/CustomerForm/CustomerForm";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory";
import DisplayItem from "../../components/DisplayItems/DisplayItem";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";

const Explore = () => {
  const { categories } = useContext(AppContext);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className="explore-container text-light">
      <div className="left-column">
        <div className="first-row" style={{ overflowY: "auto" }}>
          <DisplayCategory
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr className="horizontal-line" />
        <div className="second-row" style={{ overflowY: "auto" }}>
          <DisplayItem selectedCategory={selectedCategory} />
        </div>
      </div>
      <div className="right-column d-flex flex-column">
        <div
          className="customer-form-container"
          style={{
            height: "15%",
          }}
        >
          <CustomerForm
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>
        <hr className="my-3 text-light" />
        <div
          className="cart-items-container"
          style={{ height: "55%", overflowY: "auto" }}
        >
          <CartItems />
        </div>
        <div
          className="cart-summary-container"
          style={{
            height: "30%",
          }}
        >
          <CartSummary
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            customerName={customerName}
            setCustomerName={setCustomerName}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;
