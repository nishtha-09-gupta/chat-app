import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

  const { authUser, updateProfile } = useContext(AuthContext)

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg) {
      await updateProfile({ fullName: name, bio });
      navigate('/');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate('/');
    }
  }

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center p-4'>
      <div className='w-full max-w-md backdrop-blur-2xl text-gray-300 border border-gray-600 flex flex-col gap-6 p-6 rounded-lg'>
        
        <h3 className="text-xl text-center font-semibold">Profile Details</h3>

        <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
          <input 
            onChange={(e) => setSelectedImg(e.target.files[0])} 
            type="file" 
            id='avatar' 
            accept='.png, .jpg, .jpeg' 
            hidden 
          />
          <img 
            src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
            alt="" 
            className='w-16 h-16 rounded-full object-cover'
          />
          <span className='text-sm text-gray-200'>Upload Profile Image</span>
        </label>

        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name}
          type="text" 
          required 
          placeholder='Your name' 
          className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm'
        />

        <textarea 
          onChange={(e) => setBio(e.target.value)} 
          value={bio} 
          placeholder="Write profile bio" 
          required 
          className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm" 
          rows={4}
        ></textarea>

        <button 
          type="submit" 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
        >
          Save
        </button>

      </div>
    </div>
  )
}

export default ProfilePage
