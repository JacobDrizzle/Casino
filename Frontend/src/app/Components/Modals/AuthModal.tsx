
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLogin: boolean;
    setIsLogin: (value: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isLogin, setIsLogin }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit triggered");
    const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        login(data); // data contains both the token and the user
        onClose();
      } else {
        console.error('Error:', data.message);
        // Handle errors
      }
    } catch (error) {
      console.error('Network error:', error);
      // Handle network errors
    }
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  if (!isOpen) return null;

  return (
    <>
    <div className="fixed inset-0 z-10 bg-b-black" onClick={onClose}></div>
    <div className="fixed mt-12 top-1/3 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1a2635] border border-[#799fbe] rounded-xl p-5 w-[420px] h-auto text-white">
        <span className="absolute top-4 right-4 text-white cursor-pointer hover:text-black" onClick={onClose}>&times;</span>
        <div className="mb-4">
          <div className="text-center font-bold text-lg">
                  {isLogin ? 'Sign In': 'Create an Account'}
          </div>
          <div className="text-center font-normal text-sm text-white/70 mt-2">
                  {isLogin ? '': 'Step 1/2: Fill out your details'}
          </div>
        </div>
        <div className="bg-[#1a2635] p-4 text-white rounded-lg">
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="block w-full rounded-md border border-white/20 bg-gray-700 p-2 mb-3 outline-none focus:border-[#799fbe] transition-colors"
                    />
                )}
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="block w-full rounded-md border border-white/20 bg-gray-700 p-2 mb-3 outline-none focus:border-[#799fbe] transition-colors"
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="block w-full rounded-md border border-white/20 bg-gray-700 p-2 mb-3 outline-none focus:border-[#799fbe] transition-colors"
                />


                <div className='flex justify-center mt-4'>
                    <button type="submit" className="bg-green-500 text-black rounded-md border border-b-gold px-4 py-2 font-semibold w-full hover:bg-green-600">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </div>
            </form>
          <div className="text-center font-medium text-xs text-white/70 mt-4">
            {isLogin ? "Need an account?" : "Already have an account?"}
            <button className="text-white font-semibold ml-1 hover:text-green-300" onClick={toggleAuthMode}>
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
      </div>
    </div>
    </>
  );
};

export default AuthModal;