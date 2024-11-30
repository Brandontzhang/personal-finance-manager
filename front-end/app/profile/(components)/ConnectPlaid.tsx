import PlaidLink from "@/app/components/plaid/PlaidLink";

const ConnectPlaid = () => {
  return (
    <button className="shadow shadow-slate-500 py-2 px-16 rounded bg-gray-900 hover:bg-gray-800 text-white">
      <PlaidLink />
    </button>
  )
};

export default ConnectPlaid;
