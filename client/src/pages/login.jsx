import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { Link } from 'react-router-dom'

export default function login() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { singIn, errors: singError , isAuntheticated} = useAuth()

    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        singIn(data)
    })
    useEffect(()=>{
        if(isAuntheticated){
            navigate('/tasks')
        }
    },[isAuntheticated])

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
            {
                singError.map((error, i) => (
                    <p key={i} className=' text-red-600'>{error}</p>
                ))
            }
            <form onSubmit={onSubmit}>
                <h1 className='text-white text-2xl font-bold text-center'>Login</h1>
                <input
                    className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    type="email"
                    placeholder='Email'
                    {...register('email', { require: true })} />
                {
                    errors.email && <p className=' text-red-600'>El email es requerido</p>

                }
                <input
                    className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    type="password"
                    placeholder='Password'
                    {...register('password', { require: true })} />
                {
                    errors.password && <p className=' text-red-600'>La contraseña es requerida</p>
                }
                <button type='submit'>Login</button>
            </form>

            <p className='text-center mt-5'>No tienes cuenta? <Link to='/register' className='text-sky-600'>Registrate</Link></p>
        </div>
    )
}
