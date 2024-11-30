"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlaidLink from "../components/plaid/PlaidLink";

const Profile = () => {
  const { user } = useAuth0();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!user) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    }, 0);
  }, []);

  if (isLoading) {
    return (
      <div>
        Loading state...
      </div>
    )
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl">Hi {user?.name}</h1>
      <PlaidLink />
    </div>
  )
};

export default Profile;
