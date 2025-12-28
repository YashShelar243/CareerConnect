import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 py-3 border-t">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo / Brand */}
        <h2 className="text-lg font-semibold">
          Career<span className="text-[#02a2f8]">Connect</span>
        </h2>

        {/* Social Links */}
        <div className="flex space-x-4 mt-2 md:mt-0 text-sm">
          <a href="https://www.facebook.com/" className="hover:text-[#02a2f8]">Facebook</a>
          <a href="#" className="hover:text-[#02a2f8]">LinkedIn</a>
          <a href="#" className="hover:text-[#02a2f8]">Twitter</a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-xs text-gray-500 mt-2">
        © {new Date().getFullYear()} CareerConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
