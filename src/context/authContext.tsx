import React, 
{
  createContext,
  useContext,
  useState,
  useEffect
}
from 'react'


interface AuthContextType{
  isAuthenticated: boolean;
  username:string|null;
  email:string | null;
  setUsername:(username:string| null)=>void;
  setEmail:(email:string| null)=>void;
  checkAuth:()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider : React.FC<{ children: React.ReactNode }> = ({children}) => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string |null>(null);
  const [email, setEmail] = useState<string |null>(null);


  const checkAuth=()=>
  {
    const token = localStorage.getItem('tasky:auth:token');
    if(token)
    {
      setIsAuthenticated(true)
      const user = JSON.parse(localStorage.getItem('tasky:auth:user') || '{}');
      if(user)
        {
          setUsername(user.name);
          setEmail(user.email);
        }      
    }
    else{
      setIsAuthenticated(false)
      setUsername(null);
      setEmail(null);
    }
  };

  useEffect(()=>
  {
    checkAuth();
  },[])
  return (
    <AuthContext.Provider value={{ isAuthenticated, username, email,setUsername, setEmail, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth=():AuthContextType =>
{
  const context = useContext(AuthContext);
  if(!context)
  {
    throw new Error("useAuth must be within an AuthProvider")
  }
  return context;
}



