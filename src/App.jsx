import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useStripeApiKey } from "./hooks/useStripeApiKey";
import AppRoutes from "./router";
import { Toaster } from "sonner";

function App() {
  const { userData, fetchUserData } = useAuth();
  const stripeApiKey = useStripeApiKey();

  useEffect(() => {
    fetchUserData();
  }, [userData]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <AppRoutes stripeApiKey={stripeApiKey} />
    </>
  );
}

export default App;
