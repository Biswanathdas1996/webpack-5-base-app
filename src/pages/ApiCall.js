import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} from "../redux/slices/api/usersSlice";
import { get } from "../helper/apiHelper";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(getUsers());

    try {
      const response = await get("/users");
      console.log(response);
      dispatch(getUsersSuccess(response));
    } catch (error) {
      dispatch(getUsersFailure(error.message));
    }
  };

  const getSingleUser = async (id) => {
    const response = await get(`/users/${id}`);
    console.log(response);
    setUser(response);
  };

  return (
    <div>
      {users.loading && <p>Loading...</p>}
      {users.error && <p>{users.error}</p>}
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => getSingleUser(user.id)}>View</button>
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>Fetch Users</button>

      {user && (
        <>
          <h1>{user?.name}</h1>
          <h5>{user?.email}</h5>
          <h5>{user?.phone}</h5>
        </>
      )}
    </div>
  );
}

export default Users;
