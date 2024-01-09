import React from 'react'

export const TextInput = React.forwardRef((

    {
        label,
        type,
        placeholder,
        styles,
        register,
        name,
        error,
        labelStyles,
    },
    ref

) => {

    return (

        <div className='w-full flex flex-col mt-2 '>
            {
                label && (<p className={`text-sm mb-1 ${labelStyles}`}>{label}</p>)
            }

            <div>
                <input
                    className={`rounded border border-[#66666690] outline-none px- py-2 placeholder:text-[#66666690] ${styles}`}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    ref={ref}
                    {...register}
                    aria-invalid={error ? 'ture' : 'false'}
                />
            </div>
            {
                error && (
                    <span className='text-sx text-red-500 mt-0.5'>{error}</span>
                )
            }
        </div>
    )
})


