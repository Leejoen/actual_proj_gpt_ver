import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function AuthLoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/map"); // если уже залогинен, уходим на карту
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const fakeToken = "fake-jwt-token";
    login({ email, token: fakeToken });
    navigate("/map");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AuthLoginPage;
