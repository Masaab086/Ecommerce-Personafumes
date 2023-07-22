import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { adminActions } from "store/slices/admin.slice";
import { authActions } from "store/slices/auth.slice";
import { userActions } from "store/slices/user.slice";

const SignOut = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(authActions.setJWT("logged_out"));
    dispatch(
      userActions.setUserState({
        currentUser: null,
        userLoading: "idle",
      })
    );
    dispatch(
      adminActions.setUserState({
        currentAdmin: null,
        userLoading: "idle",
      })
    );

    router.push("/");
  }, [router, dispatch]);

  return (
    <div className="flex h-screen bg-black container mx-auto">
      <div className="m-auto">
        <Spinner className="h-12 w-12 text-white" />
      </div>
    </div>
  );
};

export default SignOut;
