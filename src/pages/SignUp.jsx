import {
  Label,
  Button,
  TextInput,
  Spinner,
  Alert
} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import OAuth from '../components/OAuth'


export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  
  // useEffect(() => {
  //   console.log(errorMessage);
  // },[])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setErrorMessage(null)

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.')
    }
    setLoading(true)
    try {
      const res = await fetch(
        "https://blog-louay-api.onrender.com/api/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await res.json()
      
      if (data.message.includes("email")) setErrorMessage('Your email is alrady taken!')
      if (res.ok) navigate('/sign-in')
    }
    catch (error) {
      setErrorMessage(error.message)
      console.log('error sign-up');
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Louay's
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor='username' value='Your username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor='email' value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor='password' value='Your password' />
              <TextInput
                type='password'
                placeholder='********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                  'sign up'
              )}
            </Button>
            <OAuth />
          </form>

          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
