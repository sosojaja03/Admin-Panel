import { useEffect, useState } from "react";
import "./App.css";
import { UseAuthContext } from "./assets/components/context/hooks/AuthContextHook";
import { supabase } from "./assets/components/supabase";
import { AppRoutes } from "./assets/components/Routes";

function App() {
  const { handleSetUser } = UseAuthContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleSetUser(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleSetUser(session);
    });

    return () => subscription.unsubscribe();
  }, [handleSetUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AppRoutes />;
}

export default App;
