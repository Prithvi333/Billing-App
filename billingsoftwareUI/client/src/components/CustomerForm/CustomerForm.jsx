import "./CustomerForm.css";

const CustomerForm = ({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
}) => {
  return (
    <div className="p-3">
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="customerName" className="col-4">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex align-items-center gap-2">
          <label htmlFor="mobileNumber" className="col-4">
            Customer Mobile Number
          </label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
