import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', form);

    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input placeholder="Email" className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password" className="w-full mb-2 p-2 border"
          onChange={(e) => setForm({...form, password: e.target.value})} />

        <button className="w-full bg-green-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;