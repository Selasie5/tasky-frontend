import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../../context/authContext'

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
})
function RouteComponent() {
  const {isAuthenticated,username,setUsername, setEmail, checkAuth} = useAuth();

  return (
    isAuthenticated ? (
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-3xl font-bold'>Welcome to Tasky</h1>
        <p className='text-lg mt-4'>Hello {username}, you are logged in!</p>
        <button onClick={() => {
          localStorage.removeItem('tasky:auth:token');
          localStorage.removeItem('tasky:auth:user');
          setUsername(null);
          setEmail(null);
          checkAuth();
        }} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
      </div>
    ) : (
      <Navigate
        to="/auth/login"
        replace
      />
    )
  )
}
