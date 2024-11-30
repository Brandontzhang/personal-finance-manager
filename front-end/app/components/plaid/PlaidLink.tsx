'use client';

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

const PlaidLink = () => {
  const [loading, setLoading] = useState(false);
  const [linkToken, setLinkToken] = useState("");

  const onSuccess = useCallback(async (public_token: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/set_access_token', {
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

  useEffect(() => {
    const getLinkToken = async () => {
      try {
        setLoading(true);
        const { data } = await axios.post('http://localhost:8000/api/create_link_token');
        setLinkToken(data.link_token);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getLinkToken();
  }, []);

  return (
    <button className="w-fit shadow shadow-slate-500 py-2 px-16 rounded bg-gray-900 hover:bg-gray-800 text-white" onClick={() => open()} disabled={!ready}>
      Link through Plaid
    </button>
  )
};

export default PlaidLink;
