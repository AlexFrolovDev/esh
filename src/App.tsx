import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Center, Heading } from "@chakra-ui/react";
import { SwapiContext } from "./context";
import SearchPage from "./routes/SearchPage";
function App() {
  const { api } = useContext(SwapiContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!api) return;

    navigate("/search");
  }, [api]);

  return (
    <Center mt="50%">
      <Heading>Loading API...</Heading>
    </Center>
  );
}

export default App;
