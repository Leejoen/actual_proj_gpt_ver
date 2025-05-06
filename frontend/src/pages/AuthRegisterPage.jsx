import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function AuthRegisterPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/map"); // если уже залогинен, уходим на карту
    }
  }, [user, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    const fakeToken = "fake-jwt-token";
    login({ email, token: fakeToken });
    navigate("/map");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg"
          />
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
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg">
            Зарегистрироваться
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
export default AuthRegisterPage;
