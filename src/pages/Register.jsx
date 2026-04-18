import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/api/auth/register', form);

    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input placeholder="Name" className="w-full mb-2 p-2 border" 
          onChange={(e) => setForm({...form, name: e.target.value})} />

        <input placeholder="Email" className="w-full mb-2 p-2 border" 
          onChange={(e) => setForm({...form, email: e.target.value})} />

        <input type="password" placeholder="Password" className="w-full mb-2 p-2 border" 
          onChange={(e) => setForm({...form, password: e.target.value})} />

        <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
