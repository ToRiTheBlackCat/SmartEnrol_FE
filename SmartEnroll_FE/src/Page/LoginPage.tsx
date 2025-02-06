import Background from '../assets/EduBr2.jpg';

const Login: React.FC = () => {
    return (
      <div className="h-screen w-full flex">
        {/* Phần hình nền bên trái */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${Background})` }}
        ></div>
  
        {/* Phần form đăng nhập bên phải */}
        <div className=" rounded-4xl w-1/2 h-full flex items-center justify-center bg-white">
          <div className="w-96 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>
  
            {/* Input Fields */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                placeholder="Enter your username"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg bg-gray-200"
                placeholder="Enter your password"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <a href='/set-new-password' className="cursor-pointer hover:underline">Forgot your password</a>
                <p className="cursor-pointer hover:underline">Create new account</p>
              </div>
            </div>
  
            {/* Login Button */}
            <button className="w-full py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500">
              Login
            </button>
  
            {/* Google Login */}
            <div className="text-center mt-4">
              <button className="flex items-center justify-center w-full py-2 border rounded-lg hover:bg-gray-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  alt="Google Logo"
                  className="w-5 h-5 mr-2"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;