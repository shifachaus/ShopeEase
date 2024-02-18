import { useState, useEffect } from "react";

export const useStripeApiKey = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [apiKeyFetched, setApiKeyFetched] = useState(false);

  useEffect(() => {
    if (!(apiKeyFetched || stripeApiKey)) {
      getStripeApiKey();
    }
  }, [apiKeyFetched, stripeApiKey]);

  async function getStripeApiKey() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}stripeapikey`, {
        credentials: "include",
      });
      const data = await res.json();

      setStripeApiKey(data.stripeApiKey);
      setApiKeyFetched(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return stripeApiKey;
};
