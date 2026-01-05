// import React, { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import assets from '../assets/assets';
// import { AuthContext } from '../../context/AuthContext';

// const ProfilePage = () => {

//   const { authUser, updateProfile } = useContext(AuthContext)

//   const [selectedImg, setSelectedImg] = useState(null)
//   const navigate = useNavigate();
//   const [name, setName] = useState(authUser.fullName)
//   const [bio, setBio] = useState(authUser.bio)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedImg) {
//       await updateProfile({ fullName: name, bio });
//       navigate('/');
//       return;
//     }

//     const reader = new FileReader();
//     reader.readAsDataURL(selectedImg);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       await updateProfile({ profilePic: base64Image, fullName: name, bio });
//       navigate('/');
//     }
//   }

//   return (
//     <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4'>
//       <div className='w-full max-w-md backdrop-blur-2xl text-gray-300 border border-gray-600 flex flex-col gap-6 p-6 rounded-lg'>
        
//         <h3 className="text-xl text-center font-semibold">Profile Details</h3>

//         <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
//           <input 
//             onChange={(e) => setSelectedImg(e.target.files[0])} 
//             type="file" 
//             id='avatar' 
//             accept='.png, .jpg, .jpeg' 
//             hidden 
//           />
//           <img 
//             src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
//             alt="" 
//             className='w-16 h-16 rounded-full object-cover'
//           />
//           <span className='text-sm text-gray-200'>Upload Profile Image</span>
//         </label>

//         <input 
//           onChange={(e) => setName(e.target.value)} 
//           value={name}
//           type="text" 
//           required 
//           placeholder='Your name' 
//           className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm'
//         />

//         <textarea 
//           onChange={(e) => setBio(e.target.value)} 
//           value={bio} 
//           placeholder="Write profile bio" 
//           required 
//           className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" 
//           rows={4}
//         ></textarea>

//         <button 
//           type="submit" 
//           onClick={handleSubmit}
//           className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
//         >
//           Save
//         </button>

//       </div>
//     </div>
//   )
// }

// export default ProfilePage
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio })
      navigate('/')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload = async () => {
      await updateProfile({
        profilePic: reader.result,
        fullName: name,
        bio
      })
      navigate('/')
    }
  }

  return (
    <div
      style={{ backgroundColor: '#0d0b1a' }} // ⚡ fallback dark bg to prevent purple flash
      className="min-h-screen flex items-center justify-center p-4 
                 bg-[radial-gradient(circle_at_top,_#1a1a2e,_#0f0f1a)] animate-fadeScale"
    >
      <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 p-6 rounded-xl 
                   border border-gray-600 backdrop-blur-2xl bg-white/5"
      >
        <h2 className="text-xl font-semibold text-center">Profile Details</h2>

        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            hidden
            onChange={(e) => setSelectedImg(e.target.files[0])}
          />
          <img
            src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border border-gray-500"
          />
          <span className="text-sm text-gray-300">Upload profile image</span>
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent text-sm"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write profile bio"
          rows={4}
          required
          className="p-2 rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent text-sm resize-none"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-full p-2 text-lg cursor-pointer hover:opacity-95 transition"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
