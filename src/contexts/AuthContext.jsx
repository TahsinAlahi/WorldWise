import { useReducer, useContext, createContext } from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...initialState, isAuthenticated: false };
    default:
      throw new Error("unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER.name });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  const FAKE_USER = {
    name: "Jack Sauce",
    email: "jack_sauce@example.com",
    password: "rickroll",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  return (
    <AuthContext.Provider
      value={{ user: FAKE_USER || user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = useContext(AuthContext);
  if (auth === undefined)
    throw new Error("The auth context was used outside of the AuthProvider");
  return auth;
}

export { AuthProvider, useAuth };
