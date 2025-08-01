import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import { ImageOff } from 'lucide-react';

const UserCard = ({ userInfo }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const dispatch = useDispatch();

  const { firstName, lastName, photoUrl, age, gender, about, skills, _id } = userInfo;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      // dispatch an action
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error('Error sending request:', error.message);
    }
  };

  const skillsArray =
    typeof skills === 'string' ? skills.split(',').map((s) => s.trim()) : skills;

  return (
    <div className="card bg-base-300 w-96 shadow-sm mt-5">
      <figure className="w-full h-75 rounded-lg overflow-hidden bg-base-100 flex items-center justify-center">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="user photo"
            className="w-full h-75 object-cover rounded-lg shadow"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageOff size={48} />
            <span className="text-sm mt-2">No Image Available</span>
          </div>
        )}
      </figure>


      <div className="card-body text-white">
        <h2 className="card-title">{firstName + ' ' + lastName}</h2>
        <p className="text-gray-400 text-sm">
          {age && gender && `${age}, ${gender.charAt(0).toUpperCase() + gender.slice(1)}`}
        </p>

        <p className="mt-2">{about}</p>

            {Array.isArray(skillsArray) &&
                skillsArray.filter((skill) => skill.trim() !== '').length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skillsArray
                      .filter((skill) => skill.trim() !== '')
                      .map((skill, idx) => (
                        <span
                          key={idx}
                          className="badge badge-primary badge-outline text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                  </div>
            )}


        {/*  Buttons */}
        <div className="card-actions justify-center my-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSendRequest('ignored', _id)}
          >
            Ignore
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
