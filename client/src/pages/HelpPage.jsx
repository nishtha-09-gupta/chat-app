import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const HelpPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1533] via-[#0F0D1F] to-[#0B0A14] text-white flex flex-col items-center justify-center p-8 relative">

      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
      >
        <img src={assets.arrow_icon} alt="Back" className="w-5" />
      </button>

      <h1 className="text-3xl font-bold mb-3 text-center">
        Need Some Help?
      </h1>

      <p className="text-gray-400 text-center max-w-md mb-8">
        We’re here for you, anytime you feel stuck or need guidance.
        Our support team is always ready to listen and assist you.
      </p>

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg w-full max-w-md space-y-6 text-center border border-white/10">

        <div>
          <h2 className="text-xl font-semibold mb-1">Live Support</h2>
          <p className="text-gray-300">Call us on: +91 87987 65784</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Email Support</h2>
          <a 
            href="mailto:support@yapster.com" 
            className="text-violet-400 hover:underline"
          >
            support@yapster.com
          </a>

          <p className="text-gray-500 text-sm mt-1">
            We usually reply within 24 hours.
          </p>
        </div>

      </div>

      <p className="text-gray-500 text-sm mt-10 text-center">
        Your comfort and safety matter the most.<br/>
        You’re never alone — we’re just one message away.
      </p>
    </div>
  )
}

export default HelpPage
