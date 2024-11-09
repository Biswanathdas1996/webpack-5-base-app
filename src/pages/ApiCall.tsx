import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getUsersSuccess,
  getUsersFailure,
} from "../redux/slices/api/usersSlice";
import { get } from "../helper/apiHelper";
import { RootState } from "../redux/store";

declare global {
  interface Window {
    site_text: (key: string) => string;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Users: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(getUsers());

    try {
      const response = await get<User[]>("/users");
      dispatch(getUsersSuccess(response));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(getUsersFailure(error.message));
      } else {
        dispatch(getUsersFailure("An unknown error occurred"));
      }
    }
  };

  const getSingleUser = async (id: number) => {
    const response = await get<User>(`/users/${id}`);
    console.log(response);
    setUser(response);
  };

  return (
    <div>
      <h1>{window.site_text(`pages.ApiCall.title`)}</h1>
      <h4>{window.site_text(`pages.ApiCall.sub_title`)}</h4>
      {users.loading && <p>{window.site_text(`pages.ApiCall.loading_text`)}</p>}
      {users.error && <p>{users.error}</p>}
      <ul>
        {users.data.map((user: User) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => getSingleUser(user.id)}>
              {window.site_text(`pages.ApiCall.view_button`)}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>
        {window.site_text(`pages.ApiCall.fetch_user_button`)}
      </button>

      {user && (
        <center>
          <div
            style={{
              border: "1px solid",
              width: 300,
            }}
          >
            <h1>{user?.name}</h1>
            <h5>{user?.email}</h5>
            <h5>{user?.phone}</h5>
          </div>
        </center>
      )}
    </div>
  );
};

export default Users;
