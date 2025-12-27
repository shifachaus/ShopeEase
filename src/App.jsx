import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useStripeApiKey } from "./hooks/useStripeApiKey";
import AppRoutes from "./router";

function App() {
  const { userData, fetchUserData } = useAuth();
  const stripeApiKey = useStripeApiKey();

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return <AppRoutes stripeApiKey={stripeApiKey} />;
}

export default App;
