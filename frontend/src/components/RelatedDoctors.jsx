import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

            {/* ✅ Responsive Grid Layout */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                        key={index}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300'
                    >
                        <img className='bg-blue-50 w-full h-auto object-cover' src={item.image} alt={item.name} />
                        <div className='p-4'>
                            <div className='flex gap-2 items-center text-sm text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                                <p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-900 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
                className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:bg-blue-100 transition'
            >
                more
            </button>
        </div>
    )
}

export default RelatedDoctors
