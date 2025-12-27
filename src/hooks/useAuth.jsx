import { useEffect, useState } from "react";
import { useLazyGetUserQuery } from "../features/users/userApi";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../features/users/userSlice";

const useAuth = () => {
  const [userDataFetched, setUserDataFetched] = useState(false);
  const [getUser, results] = useLazyGetUserQuery();
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      await getUser();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (results?.data?.success) {
      dispatch(login(results?.data));
    } else {
      dispatch(logout());
    }

    return () => {
      dispatch(login(null));
    };
  }, [dispatch, getUser, results?.data]);

  useEffect(() => {
    if (!userDataFetched && userData === null) {
      fetchUserData();
      setUserDataFetched(true);
    }
  }, [userData, userDataFetched]);

  return { userData, fetchUserData };
};

export default useAuth;
