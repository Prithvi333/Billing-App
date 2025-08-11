import { useState } from "react";
import { addUser } from "../../service/UserService";
import { toast } from "react-toastify";
const initialData = {
  name: "",
  email: "",
  password: "",
  role: "ROLE_USER",
};
const UserForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addUser(data);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("Users added successfully");
      setData(initialData);
    } catch (error) {
      console.log(error);
      toast.error("Unable to save user");
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Jhon Doe"
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="yourname@example.com"
                  onChange={onChangeHandler}
                  value={data.email}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="*************"
                  onChange={onChangeHandler}
                  value={data.password}
                />
              </div>
              <button
                type="submit"
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Save User"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
