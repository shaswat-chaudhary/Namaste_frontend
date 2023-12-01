import React from 'react';

export const CustomBtn = ({ title, containerStyles, iconRight, type, onClick }) => {


  return (
    <div>

      <button
        onClick={onClick}
        type={type || "button"}
        className={`inline-flex items-center text-base ${containerStyles}`}>
          
        {title}
        {iconRight && <span className='mt-2'>{iconRight}</span>}

      </button>
    </div>
  )
}
