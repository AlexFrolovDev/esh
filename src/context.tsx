import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getRoot } from "./api";

export const SwapiContext = createContext<{
  api: { [key: string]: string } | null;
}>({
  api: null,
});

const SwapiProvider = ({ children }: PropsWithChildren) => {
  const [api, setApi] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    console.log("Loading API endpoints");
    getRoot().then((data) => {
      console.log("API endpoints received");
      setApi(data);
    });
  }, []);

  const value = {
    api,
  };

  return (
    <SwapiContext.Provider value={value}>{children}</SwapiContext.Provider>
  );
};

export default SwapiProvider;
