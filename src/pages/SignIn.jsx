import {
  Label,
  Button,
  TextInput,
  Spinner,
  Alert
} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'


export default function SignIn() {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    error && setErrorMessage(error.message);
  }, [error]);
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    
    setLoading(false)

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'))
    }

      try {
        setErrorMessage('')
        dispatch(signInStart());
        setLoading(true);
        const res = await fetch(
          `https://blog-louay-api.onrender.com/api/auth/sign-in`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include"
          }
        );
        const data = await res.json()
        if (data.success === false) dispatch(signInFailure(data))
        
        setLoading(false);
        dispatch(signInFailure(res.statusText));

        if (res.ok) {
          setLoading(false);
          dispatch(signInSuccess(data))
          navigate('/')
        }
        if (res.statusText === 'Bad Request') {
          throw new Error("Invalid password!");
        }
        if (res.statusText === "Not Found") {
          throw new Error("User not found");
        }
      } catch (error) {
        setLoading(false);
        dispatch(signInFailure(error));
      }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="hidden">
        <img src="/public/L.png" alt="" />
      </div>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Louay's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "sign in"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
