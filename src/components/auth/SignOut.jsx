import { doSignOut } from "@/app/actions";
import React from "react";

export const SignOut = () => {
  return (
    <form action={doSignOut}>
      <button type="submit">LogOut</button>
    </form>
  );
};

// export default SignOut;
