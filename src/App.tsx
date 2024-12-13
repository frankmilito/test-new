import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "@/store";
import { appActions } from "./app/data/app/slice";
import { router } from "./app/routes";

function App() {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(appActions.hydrate());
  // }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
