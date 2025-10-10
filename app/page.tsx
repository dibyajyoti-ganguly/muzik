"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="flex justify-around mt-4">
      <p>Hello Next!</p>
      <button
        className="w-24 h-10 bg-red-600 text-white cursor-pointer"
        onClick={() => {
          signIn();
        }}
      >
        Signin
      </button>
    </div>
  );
}
