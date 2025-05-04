import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useAuth } from '../../context/authContext'
import { useLocation } from '@tanstack/react-router';
import { ClipboardList,LogOut,PlusIcon} from 'lucide-react';
import { greeting } from '../../utils/greeting';
import Search from '../../components/core/Search';
import FilterSelect from '../../components/core/FilterSelect';
import Table from '../../components/Table';

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
})
function RouteComponent() {
  const {isAuthenticated,username,email,setUsername, setEmail, checkAuth} = useAuth();
  const location = useLocation();
  const pathName= location.pathname;
  const isActive = pathName === "/tasks";

  const [searchParams, setSearchParams] = useState<string>("");
  const [filterParams, setFilterParams] = useState<string>("");
  // const [sortParams, setSortParams] = useState<string>("");
  // const [sortOrder, setSortOrder] = useState<string>("asc");

  greeting();
  return (
    isAuthenticated ? (
      <div className='flex flex-row items-center justify-center min-h-screen'>
        {/* Responsive Sidebar */}
        <div className='hidden md:flex flex-col justify-between items-start w-1/5 bg-white border-r border-r-gray-200 h-screen'>
        <div className='flex flex-col justify-start items-start w-full gap-5'>
          <div className='w-full border-b border-b-gray-200'>
            <div className='p-7 max-h-lg min-h-lg'>
            <h1 className=' text-black font-semibold text-2xl logo'>tasky_</h1>
            </div>
               
          </div>
          <div className='flex flex-col justify-start items-start w-full gap-5 p-2'>
            <div className={`flex flex-row justify-start items-center gap-2 w-full p-3  rounded-xs rounded-tl-none rounded-bl-none ${isActive ? 'text-purple-800 bg-purple-300 border-l-3 border-l-pruple-800' : 'text-gray-500'}`}>
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
                <div className="flex flex-col justify-center items-start">
                <span className='text-sm font-medium text-gray-700'>{email}</span>
                <span className='text-sm font-medium text-gray-500'>{username}</span>
                </div>
            </div>
          </div>
        </div>
        {/* Main View */}
        <div className='flex flex-col justify-start items-center w-full h-screen bg-gray-100/50'>
        <div className='flex justify-between items-center w-full p-5 bg-white border-b border-b-gray-200'>
        <div className='flex flex-col justify-start items-start '>
          <h1 className='text-xl font-semibold text-black uppercase'>{greeting()}, {username}</h1>
          <p className='text-sm text-gray-400'>These are your tasks, get them done</p>
        </div>
        <div>
          <button className='text-md text-white font-medium flex justify-center items-start gap-2 bg-purple-600/50 hover:bg-purple-800  hover:text-white hover:cursor-pointer hover:font-semibold rounded-xs p-3 group'>
            <PlusIcon className='text-white '  />
            <span className='font-medium'>Create Task</span>
          </button>
        </div>
          </div>
       
        <div className='flex flex-col justify-start items-start w-full mt-4 p-4 gap-8'>
              <div className='flex justify-start items-start w-full'>
                <div className='flex justify-between items-center w-full'>
                <Search 
                  searchParams={searchParams} 
                  onSearch={(query: string) => setSearchParams(query)} 
                />
                <div className='flex justify-between items-center w-auto'>
                <FilterSelect options={["Active", "Pending", "Completed"]} value={filterParams} placeholder='Filter By Status' onChange={(filterParams)=>setFilterParams(filterParams)}/>
                </div>
                </div>
              </div>
              <Table/>
        </div>
          </div>
          
      </div>
    ) : (
      <Navigate
        to="/auth/login"
        replace
      />
    )
  )
}
