import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import store from "./store";


export default function App() {

  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<AuthPage />} />

          </Routes>

        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )

}
