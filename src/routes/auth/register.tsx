import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { InputField } from '../../components/core/Input';
import { FormWrapper } from '../../components/Form';
import * as Yup from "yup";
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'sonner';

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(4, "Name must be more than 4 characters").required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  });

  const REGISTER_USER = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
      register(name: $name, email: $email, password: $password) {
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
  
  const [registerUser, { data, loading, error, reset }] = useMutation(REGISTER_USER, {
    variables: {
      name: input.name,
      email: input.email,
      password: input.password,
    },
    onCompleted: (data) => {
      console.log('User registered successfully:', data);
      reset();
      localStorage.setItem('tasky:auth:token', data.register.token);
      localStorage.setItem('tasky:auth:user', JSON.stringify(data.register.user));
      navigate({ to: "/tasks" });  
    },
    onError: (error) => {
      console.error('Error registering user:', error);
      toast.error(
        <div className='text-red-500 text-sm font-medium'>
         <span>
         There was an error creating your account.Please try again.
          </span> 
        </div>
      )
        
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Form values:', values);
    registerUser({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <main className="max-h-screen h-screen w-full flex flex-col items-center justify-center 
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/login-bg.jpg')] bg-cover bg-no-repeat bg-center"
    >
      <div className="w-1/4 md:w-1/2 lg:w-1/4 h-auto flex flex-col justify-center items-start bg-white rounded-md shadow-lg p-8">
        <div className="flex flex-col justify-center items-start mb-4">
          <h1 className="text-[22px] font-semibold">Register</h1>
          <p className="text-sm font-normal text-gray-500">Setup your account</p>
        </div>

        <FormWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          submitButtonText={loading ? "Creating..." : "Create Account"}
        >
          <InputField label="Username" name="name" type="text" placeholder="e.g. John Paul" />
          <InputField label="Email" name="email" type="email" placeholder="e.g. seps@gmail.com" />
          <InputField label="Password" name="password" type={!showPassword ? "password" : "text"} placeholder="********" />
          
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

        <div className="flex flex-col justify-center items-start mt-6">
          <p className="text-sm font-normal text-gray-500">
            Already have an account? <a href="/auth/login" className="text-purple-500">Login</a>
          </p>
        </div>
      </div>
    </main>
  );
}
