import { createFileRoute } from '@tanstack/react-router'
import { InputField } from '../../components/core/Input';
import { FormWrapper } from '../../components/Form';
import * as Yup from "yup";

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
   const initialValues = {
     email: '',
     password: '',
   };
 
   const validationSchema = Yup.object({
    name: Yup.string().min(4, "Name must be more than 4 characters").required('Required'),
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
           <h1 className="text-[22px] font-medium">Register</h1>
           <p className="text-sm font-normal text-gray-500">Setup your account</p>
         </div>
 
         <FormWrapper
           initialValues={initialValues}
           validationSchema={validationSchema}
           onSubmit={handleSubmit}
           submitButtonText="Create account"
         >
           <InputField label="Username" name="email" type="email" placeholder="e.g.John Paul" />
           <InputField label="Email" name="email" type="email" placeholder="e.g.seps@gmail.com" />
           <InputField label="Password" name="password" type="password" placeholder="********" />
         </FormWrapper>
         <div className="flex flex-col justify-center items-start mt-4">
           <p className="text-sm font-normal text-gray-500">Already have an account? <a href="/auth/login" className="text-purple-500">Login</a></p>
           </div>
       </div>
     </main>
   );
}
