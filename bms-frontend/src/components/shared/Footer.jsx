import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
  FaLinkedinIn,
} from "react-icons/fa";
import mainLogo from "../../assets/main-icon-white.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-400 text-sm">
      <div className="border-t border-gray-700/50 w-full" />

      <div className="flex flex-col items-center py-8">
        {/* Logo */}
        <img
          src={mainLogo}
          alt="BookMyScreen Logo"
          className="w-28 mb-4 opacity-90 hover:opacity-100 transition-opacity"
        />

        {/* Social Icons */}
        <div className="flex space-x-4 mb-4">
          <FaFacebookF className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
          <FaTwitter className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
          <FaInstagram className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
          <FaYoutube className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
          <FaPinterest className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
          <FaLinkedinIn className="w-8 h-8 p-2 rounded-full bg-gray-700/60 text-white hover:bg-purple-600 transition-colors cursor-pointer" />
        </div>

        {/* Copyright */}
        <p className="text-center text-xs px-4 max-w-4xl leading-relaxed">
          Copyright 2026 CineBook Pvt Ltd. All Rights Reserved.
          <br />
          <small className="text-gray-500">
            The content and images used on this site are copyright protected and
            copyrights vests with the respective owners. The usage of the content
            and images on this website is intended to promote the works and no
            endorsement of the artist shall be implied.
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
