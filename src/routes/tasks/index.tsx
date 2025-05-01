import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../../context/authContext'
import { useLocation } from '@tanstack/react-router';
import { ClipboardList,LogOut } from 'lucide-react';

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
})
function RouteComponent() {
  const {isAuthenticated,username,email,setUsername, setEmail, checkAuth} = useAuth();
  const location = useLocation();
  const pathName= location.pathname;
  const isActive = pathName === "/tasks";
  return (
    isAuthenticated ? (
      <div className='flex flex-row items-center justify-center min-h-screen'>
        {/* Responsive Sidebar */}
        <div className='hidden md:flex flex-col justify-between items-start w-1/5 bg-white border-r border-r-gray-200 h-screen'>
        <div className='flex flex-col justify-start items-start w-full gap-5'>
          <div className='w-full border-b border-b-gray-100'>
            <div className='p-4'>
            <h1 className=' text-black font-semibold text-2xl logo'>tasky_</h1>
            </div>
               
          </div>
          <div className='flex flex-col justify-start items-start w-full gap-5 p-2'>
            <div className={`flex flex-row justify-start items-center gap-2 w-full p-3  rounded-sm rounded-tl-none rounded-bl-none ${isActive ? 'text-purple-800 bg-purple-300 border-l-3 border-l-pruple-800' : 'text-gray-500'}`}>
             <ClipboardList className='text-purple-800' />
              <span className='text-lg font-medium'>Tasks</span>
            </div>
          </div>
          
          </div>
          
          <div className='mt-auto mb-4 gap-10'>
            <div className='flex flex-row justify-start items-center gap-2 w-full p-3 rounded-sm rounded-tl-none rounded-bl-none text-black'>
              <button className='text-md  text-red-500 font-medium flex justify-center items-start gap-2 bg-red-100/50 hover:bg-red-200/50 rounded-md p-2 w-full'
              onClick={()=>
              {
                localStorage.removeItem('tasky:auth:token');
                localStorage.removeItem('tasky:auth:user');
                setUsername(null);
                setEmail(null);
                checkAuth();
              }
              }
              >
                <LogOut className='text-red-500' />
                <span className='font-medium '>Log Out</span>
                </button>
            </div>
            <div className='flex justify-center items-center gap-2 w-full p-4'>
                <img src="/user_5000.jpg" alt="profile-image" className='w-10 h-10 rounded-full' />
                <span className='text-sm font-medium text-gray-700'>{email}</span>
            </div>
          </div>
        </div>
        {/* Main View */}
        <div className='flex flex-col justify-center items-center w-full h-screen bg-gray-100/50'>
          </div>
        {/* <h1 className='text-3xl font-bold'>Welcome to Tasky</h1>
        <p className='text-lg mt-4'>Hello {username}, you are logged in!</p>
        <button onClick={() => {
          localStorage.removeItem('tasky:auth:token');
          localStorage.removeItem('tasky:auth:user');
          setUsername(null);
          setEmail(null);
          checkAuth();
        }} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>Logout</button> */}
      </div>
    ) : (
      <Navigate
        to="/auth/login"
        replace
      />
    )
  )
}
