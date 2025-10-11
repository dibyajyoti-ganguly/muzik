"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Appbar() {
  const session = useSession();

  return (
    <div className="flex justify-around mt-4">
      <p>Hello Next!</p>
      {session.data?.user && (
        <button
          className="w-24 h-10 bg-blue-600 text-white cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      )}
      {!session.data?.user && (
        <button
          className="w-24 h-10 bg-red-600 text-white cursor-pointer"
          onClick={() => {
            signIn();
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
