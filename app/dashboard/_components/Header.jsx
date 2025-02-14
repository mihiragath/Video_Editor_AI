import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="flex p-5 shadow-md justify-end ">
      <UserButton />
    </div>
  );
}

export default Header;
