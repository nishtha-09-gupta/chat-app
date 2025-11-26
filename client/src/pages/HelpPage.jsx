import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-800/80 to-black/70 text-white flex flex-col items-center justify-center p-8 relative">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 bg-white/8 hover:bg-white/20 p-2 rounded-full transition"
      >
        <img src={assets.arrow_icon} alt="Back" className="w-5" />
      </button>

      {/* <img src={assets.help_icon} alt="Help" className="w-16 mb-5 animate-pulse" /> */}
      <h1 className="text-3xl font-bold mb-3 text-center">Need Some Help?</h1>
      <p className="text-gray-300 text-center max-w-md mb-8">
        We’re here for you, anytime you feel stuck or just need a bit of guidance.
        Our support team is always ready to listen and assist you.
      </p>

      <div className="bg-white/8 backdrop-blur-lg rounded-2xl p-6 shadow-lg w-full max-w-md space-y-6 text-center">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-white">Live Support</h2>
          <p className="text-gray-400">Call us on: +91 87987 65784</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1 text-white">Email Support</h2>
          <a 
            href="mailto:nishthagupta209@gmail.com" 
            className="text-violet-400 hover:underline"
          >
            support@yapster.com
          </a>
          <p className="text-gray-400 text-sm mt-1">We usually reply within 24 hours.</p>
        </div>
      </div>

      <p className="text-gray-400 text-sm mt-10 text-center">
        Your comfort and safety matter the most.<br/>
        You’re never alone, we’re just one message away.
      </p>
    </div>
  )
}

export default HelpPage
