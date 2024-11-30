"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ConnectPlaid from "./(components)/ConnectPlaid";

const Profile = () => {
  const { user } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl">Hi {user?.name}</h1>
      <ConnectPlaid />
    </div>
  )
};

export default Profile;
