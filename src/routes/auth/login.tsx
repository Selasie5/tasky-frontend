import { createFileRoute } from '@tanstack/react-router';
import { InputField } from '../../components/core/Input';
import { FormWrapper } from '../../components/Form';
import * as Yup from "yup";

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    console.log('Form values:', values);
    
    // login logic here
  };

  return (
    <main className="max-h-screen h-screen w-full flex flex-col items-center justify-center 
      bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/login-bg.jpg')] bg-cover bg-no-repeat bg-center"
    >
      <div className="w-1/4 h-auto flex flex-col justify-center items-start bg-white rounded-md shadow-lg p-8">
        <div className="flex flex-col justify-center items-start mb-4">
          <h1 className="text-[22px] font-medium">Login</h1>
          <p className="text-sm font-normal text-gray-500">Please enter your credentials</p>
        </div>

        <FormWrapper
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          submitButtonText="Login"
        >
          <InputField label="Email" name="email" type="email" placeholder="e.g.seps@gmail.com" />
          <InputField label="Password" name="password" type="password" placeholder="******" />
        </FormWrapper>
        <div className="flex flex-col justify-center items-start mt-4">
          <p className="text-sm font-normal text-gray-500">Don't have an account? <a href="/auth/register" className="text-purple-500">Register</a></p>
          </div>
      </div>
    </main>
  );
}
