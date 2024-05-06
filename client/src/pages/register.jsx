import React , {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useAuth} from '../context/authContext.jsx'
import { useNavigate , Link } from 'react-router-dom'

export default function register() {

    const { register, handleSubmit , formState: { errors }} = useForm()
    const {singUp , isAuntheticated , errors : registerErrors} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if(isAuntheticated) {
            navigate('/tasks')
        }
    }, [isAuntheticated])

    const onSubmit = handleSubmit(async(values) => {
        singUp(values)
    })

    useEffect(()=>{
        if(isAuntheticated){
            navigate('/tasks')
        }
    },[])

    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md '>
          {/*   {
                registerErrors.map((error, i)=>(
                    <p key={i} className=' text-red-600'>{error}</p>
                ))
            } */}
            <form onSubmit={onSubmit}>
                <input
                    className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    type="text"
                    placeholder='Nombre'
                    {...register('username', { require: true })} />
                    {
                        errors.username && <p className=' text-red-600'>El nombre es requerido</p>
                    }

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
                <button type='submit'>Enviar</button>
            </form>
            <p className='text-center mt-5'>Ya tienes cuenta? <Link to='/login' className='text-sky-600'>Login</Link></p>
        </div>
    )
}
