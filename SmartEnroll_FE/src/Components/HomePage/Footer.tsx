import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import Logo from "../../assets/LOGO/4-removebg-preview.png"
import "../../tailwind.css";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative bg-black text-white">
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                    250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                    3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="relative block h-[600px] fill-[#202b3d]"></path>
                </svg>
            </div>
            
            <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-50">
                <div className="flex flex-col gap-5">
                    {/* <h2 className="text-3xl text-pink-500">SmartEnrol</h2> */}
                    <img src={Logo} alt="SmartEnrol Logo" className="w-60 h-auto " />
                </div>

                <div>
                    <h3 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">SmartEnrol</h3>
                    <p className="text-lg text-gray-300">A tool to help you shape your future.</p>
                </div>

                <div>
                  {/* <h3 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">Quick Links</h3> */}
                      <ul>
                          <li className="my-4">
                              <a href="/" className="hover:text-pink-400 transition duration-200">Home</a>
                          </li>
                          <li className="my-4">
                              <a href="/chatbot" className="hover:text-pink-400 transition duration-200">Chat with AI</a>
                          </li>
                          <li className="my-4">
                              <a href="/career-guidance" className="hover:text-pink-400 transition duration-200">Career Guidance</a>
                          </li>
                          <li className="my-4">
                              <a href="/about-us" className="hover:text-pink-400 transition duration-200">About Us</a>
                          </li>
                      </ul>
                </div>

                <div>
                    <h3 className="text-[22px] font-semibold text-pink-500 py-2 uppercase">Contact</h3>
                    <p className="text-[16px] my-4">Email: smartEnrol@gmail.com</p>
                    <p className="text-[16px] my-4">Phone: +1 113-456-7890</p>
                    <div className="flex space-x-4">
                        <a className="text-white hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="#">
                            <FaGithub />
                        </a>
                        <a className="text-white hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="#">
                            <FaLinkedinIn />
                        </a>
                        <a className="text-white hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="#">
                            <FaTwitter />
                        </a>
                        <a className="text-white hover:text-pink-500 transform hover:scale-150 transition-all duration-150 ease-in-out" href="#">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
            
            <h6 className="text-center">&copy; SmartEnrol {year}</h6>
        </footer>
    );
};

export default Footer;
