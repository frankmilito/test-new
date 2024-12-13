import { RouterProvider } from "react-router-dom";
import { useAppDispatch } from "@/store";
import { router } from "./app/routes";

function App() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(appActions.hydrate());
  // }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
