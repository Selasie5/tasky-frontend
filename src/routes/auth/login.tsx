import { createFileRoute , useNavigate} from '@tanstack/react-router';
import { InputField } from '../../components/core/Input';
import { FormWrapper } from '../../components/Form';
import * as Yup from "yup";
import { gql, useMutation } from '@apollo/client';
import {useState} from 'react';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
   const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  });
const LOGIN_USER = gql`
mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    token
    user {
      email
      id
      name
    }
  }
}
`;

const [input] = useState(initialValues);
 const [showPassword, setShowPassword] = useState(false);
 const [loginUser, { data, loading, error, reset }] = useMutation(LOGIN_USER, {
     variables: {
       email: input.email,
       password: input.password,
     },
     onCompleted: (data) => {
       console.log('User registered successfully:', data);
     
       localStorage.setItem('tasky:auth:token',data.login.token)
      localStorage.setItem('tasky:auth:user', JSON.stringify(data.login.user));
      reset();
       navigate({ to: "/tasks" })
     },
     onError: (error) => {
       console.error('Error registering user:', error);
       toast.error(
        <div className='text-red-500 text-sm font-medium'>
         <span>
         Invalid email or password. Please check your credentials and try again
          </span> 
        </div>
        
      )
     },
   });
 const togglePasswordVisibility = () => {
  setShowPassword((prev) => !prev);
};

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Form values:', values);
    loginUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    });
    // login logic here
  };

  return (
    <main className="max-h-screen h-screen w-full flex flex-col items-center justify-center 
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/login-bg.jpg')] bg-cover bg-no-repeat bg-center"
    >
      <div className="w-1/4 md:w-2/5 lg:w-1/4 h-auto flex flex-col justify-center items-start bg-white rounded-md shadow-lg p-8">
        <div className="flex flex-col justify-center items-start mb-4">
          <h1 className="text-[22px] font-semibold">Login</h1>
          <p className="text-sm font-normal text-gray-500">Please enter your credentials</p>
        </div>

        <FormWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
         submitButtonText={loading ? (
          <span className='flex justify-center'>
<LoaderCircle className='animate-spin' />
          </span>
          
         )
        : "Log In"}
        >
          <InputField label="Email" name="email" type="email" placeholder="e.g.seps@gmail.com" />
          <InputField label="Password" name="password" type={!showPassword ? "password" : "text"} placeholder="******" />
          <div className="flex flex-row justify-start items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              name="password-visibility" 
              id="password-visibility" 
              onChange={togglePasswordVisibility}
              className="w-4 h-4 text-purple-500 border-gray-300 rounded-sm transition-all duration-200 ease-in-out checked:bg-purple-500 checked:border-transparent" 
            />
            <label htmlFor="password-visibility" className="text-sm font-normal text-gray-500">
              Show password
            </label>
          </div>
        </FormWrapper>
        <div className="flex flex-col justify-center items-start mt-4">
          <p className="text-sm font-normal text-gray-500">Don't have an account? <a href="/auth/register" className="text-purple-500">Register</a></p>
          </div>
      </div>
    </main>
  );
}
