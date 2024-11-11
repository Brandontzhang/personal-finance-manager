'use client';

import Navbar from "../components/nav/Navbar";
import Content from "./components/Content";

export default function Home() {

  return (
    <div className="w-full h-full">
      <Navbar />
      <Content />
    </div>
  );
}
