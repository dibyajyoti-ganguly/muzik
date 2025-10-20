/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) router.push("/dashboard");
    else router.push("/");
  }, [session]);
};

export default Redirect;
