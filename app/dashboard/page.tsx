"use client";

import Navbar from "@/components/Navbar";
import Redirect from "@/components/Redirect";

const page = () => {
  Redirect();
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default page;
