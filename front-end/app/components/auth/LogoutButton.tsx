import { getAuthConfig } from "@/app/config/config";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {

  const { logout } = useAuth0();
  const config = getAuthConfig();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: config.redirecUri } })}>
      Log Out
    </button>
  )
};

export default LogoutButton;
