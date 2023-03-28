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

  return (
    <div>
      {users.loading && <p>Loading...</p>}
      {users.error && <p>{users.error}</p>}
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={fetchUsers}>Fetch Users</button>
    </div>
  );
}

export default Users;
