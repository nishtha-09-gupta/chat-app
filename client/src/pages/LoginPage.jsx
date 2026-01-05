import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }

    login(
      currState === "Sign up" ? "signup" : "login",
      { fullName, email, password, bio }
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/70 via-black to-black px-6 text-white">

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <img src={assets.logo_big} alt="Yapster" className="w-16" />
            <h1 className="text-3xl font-semibold">Yapster</h1>
          </div>

          <span className="w-fit px-4 py-1 rounded-full text-sm bg-white/10 border border-white/20">
            Real time Chat App
          </span>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Conversations that
            <span className="block text-violet-400">feel alive</span>
          </h2>

          <p className="text-gray-400 max-w-md">
            Chat instantly, share moments and stay connected with the people who matter 
            all in one secure place.
          </p>
        </div>

        
        <form
          onSubmit={onSubmitHandler}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_0_60px_-20px_rgba(139,92,246,0.5)]"
        >
          <h2 className="text-2xl font-semibold flex justify-between items-center">
            {currState}
            {isDataSubmitted && (
              <img
                src={assets.arrow_icon}
                alt=""
                className="w-5 cursor-pointer"
                onClick={() => setIsDataSubmitted(false)}
              />
            )}
          </h2>

          {currState === "Sign up" && !isDataSubmitted && (
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
              className="bg-black/40 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}

          {!isDataSubmitted && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
                className="bg-black/40 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="bg-black/40 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </>
          )}

          {currState === "Sign up" && isDataSubmitted && (
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write a short bio..."
              required
              className="bg-black/40 border border-white/20 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 font-medium hover:opacity-90 transition"
          >
            {currState === "Sign up" ? "Join Yapster" : "Enter Yapster"}
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" required />
            <span>Agree to terms & privacy policy</span>
          </div>

          <p className="text-sm text-center text-gray-300">
            {currState === "Sign up" ? (
              <>Already have an account?{" "}
                <span
                  className="text-violet-400 cursor-pointer"
                  onClick={() => {
                    setCurrState("Login")
                    setIsDataSubmitted(false)
                  }}
                >
                  Login
                </span>
              </>
            ) : (
              <>New to Yapster?{" "}
                <span
                  className="text-violet-400 cursor-pointer"
                  onClick={() => setCurrState("Sign up")}
                >
                  Create account
                </span>
              </>
            )}
          </p>
        </form>

      </div>
    </div>
  )
}

export default LoginPage
