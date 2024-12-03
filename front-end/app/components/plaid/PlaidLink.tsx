'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

const serverLink = "http://localhost:8000/plaid/api";

const PlaidLink = () => {
  const [loading, setLoading] = useState(false);
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        setLoading(true);
        // 1. Temporary token to activate Plaid link
        const { data } = await axios.post(`${serverLink}/create_link_token`);
        setLinkToken(data.link_token);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: string) => {
    try {
      // 2. Using the link token to exchange for a permanent access token for the User's item
      const response = await fetch(`${serverLink}/set_access_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }, [linkToken])

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess
  }

  const { open, ready } = usePlaidLink(config);

  return (
    <button className="w-fit shadow shadow-slate-500 py-2 px-16 rounded bg-gray-900 hover:bg-gray-800 text-white" onClick={() => open()} disabled={!ready}>
      Connect with Plaid
    </button>
  )
};

export default PlaidLink;
