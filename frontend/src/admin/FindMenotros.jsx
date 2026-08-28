import React, { useEffect } from 'react'
import api from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FindMenotros = () => {
    const navigate = useNavigate();
    const [mentors, setMentors] = useState([]);
    const fetchMentors = async () => {
        try {
            const response = await api.get('/mentors');

            setMentors(response.data.data);
        } catch (error) {
            console.error('Error fetching mentors:', error);
        }
    };
    console.log(mentors)
    useEffect(() => {
        fetchMentors();
    }, []);
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
            {mentors?.map((mentor) => (
                <div
                    key={mentor._id}
                    className="
                group
                overflow-hidden
                rounded-2xl
                border border-gray-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
            "
                >
                    {/* Profile Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        {mentor.profilePic ? (
                            <img
                                src={`data:${mentor.profilePicType};base64,${mentor.profilePic}`}
                                alt={`${mentor.firstName} ${mentor.lastName}`}
                                className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                        "
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <span className="text-5xl font-bold text-gray-300">
                                    {mentor.firstName?.charAt(0)}
                                </span>
                            </div>
                        )}

                        {/* Category badge */}
                        {mentor.category && (
                            <span
                                className="
                            absolute
                            left-3
                            top-3
                            rounded-full
                            bg-white/90
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-green-600
                            shadow-sm
                            backdrop-blur
                        "
                            >
                                {mentor.category}
                            </span>
                        )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">

                        {/* Name */}
                        <h3 className="truncate text-xl font-bold text-gray-900">
                            {mentor.firstName} {mentor.lastName}
                        </h3>

                        {/* Job */}
                        <p className="mt-1 text-sm font-medium text-green-600">
                            {mentor.jobTitle}
                        </p>

                        {/* Company */}
                        {mentor.company && (
                            <p className="mt-1 text-sm text-gray-500">
                                {mentor.company}
                            </p>
                        )}

                        {/* Location */}
                        {mentor.location && (
                            <p className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                                📍 {mentor.location}
                            </p>
                        )}

                        {/* Bio */}
                        {mentor.bio && (
                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                                {mentor.bio}
                            </p>
                        )}

                        {/* Skills */}
                        {mentor.skills && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {mentor.skills
                                    .split(",")
                                    .slice(0, 3)
                                    .map((skill, index) => (
                                        <span
                                            key={index}
                                            className="
                                        rounded-full
                                        bg-green-50
                                        px-2.5
                                        py-1
                                        text-xs
                                        font-medium
                                        text-green-700
                                    "
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                            </div>
                        )}

                        {/* Button */}
                        <button
                            onClick={() => navigate(`/admin/find-mentors/${mentor._id}`)}
                            className="
                        mt-5
                        w-full
                        rounded-xl
                        bg-green-600
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        transition
                        duration-300
                        hover:bg-green-700
                        active:scale-95
                    "
                        >
                            View Profile
                        </button>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default FindMenotros
