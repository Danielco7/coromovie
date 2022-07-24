import React, { useEffect, useState } from 'react';
import { getAll} from '../utils';
import MoviesPage from '../mainpage/moviechild/moviespage';
import UsersPage from './userschild/usersmangpage';
import SubsPage from './subschild/subsmainpage';
import '../css/menu.css';
const urlusers = "https://coromovies.herokuapp.com/api/Users"

function MainRouter({ match ,history}) {
    const [name] = useState(match.params.name)
    const [user, setUser] = useState({})
    const [movies, setMovies] = useState(false)
    const [subs, setSubs] = useState(false)
    const [users, setUsers] = useState(false)
    const [Check_View_Movie_Permission, setCheck_View_Movie_Permission] = useState('')
    const [Check_View_Subs_Permission, setCheck_View_Subs_Permission] = useState('')
    const [User_To_Show, setUser_To_Show] = useState({})
    const [Movie_To_Show, setMovie_To_Show] = useState({})

    useEffect(() => {
        async function getmovies() {
             const { data } = await getAll(urlusers)
             const found = data.find(function (element) {
                return element.username === name;
            });
            setUser(found)
            const moviebutton = found.premissions.find(function (element) {
                return element === "View Movies";
            });
            setCheck_View_Movie_Permission(moviebutton)
            const subsbutton = found.premissions.find(function (element) {
                return element === "View Subscriptions";
            })
            setCheck_View_Subs_Permission(subsbutton)
            if (moviebutton==="View Movies") setMovies(true);
            if (moviebutton!=="View Movies") {
                if (subsbutton==="View Subscriptions") setSubs(true);
            }
     }
         getmovies()
     }, [])
    const Movies= async()=> {
    await setMovies(false)
    await setMovie_To_Show({})
    await setMovies(true)
    await setSubs(false)
    await setUsers(false)
        
    }
    const Subs= async()=> {
    setMovies(false)
    setSubs(true)
    setUsers(false)
        
    }
    const Users= async()=> {
    setMovies(false)
    setSubs(false)
    setUsers(true)
        
    } 
     const logout= async()=> history.push(`/`);

    const showuser=async(e)=> {
    setUser_To_Show(e)
    setMovies(false)
    setSubs(true)
    } 

    const showmovie=async(e)=> {
        setMovie_To_Show(e)
         setMovies(true)
         setSubs(false)
    } 
    function refreshPage() {
        window.location.reload(false);
      }

    return <div className='MainPage'>


        
        <div className='menu' >
        <div className='logo' onClick={refreshPage}>coromovies</div>
        <div id='nav'>
        <a>{user.admin? <button onClick={Movies} className="ul">Movies</button>:Check_View_Movie_Permission==="View Movies"? <button onClick={Movies} className="ul">Movies</button>:null}</a>
         <a>{user.admin? <button onClick={Subs} className="ul">Subscriptions</button>:Check_View_Subs_Permission==="View Subscriptions"? <button onClick={Subs} className="ul">Subscriptions</button>:null}</a>
          <a>{user.admin? <button onClick={Users} className="ul">Users</button>:null}</a>
         <a> <button onClick={logout} className="ul">Log Out</button></a>
        </div>
            </div>
            
            

            {movies ? <MoviesPage user={user} subs={Check_View_Subs_Permission} showmember={showuser} moviedisplay={Movie_To_Show}/> : null}

            {subs ? <SubsPage user={user} Movie_To_Show={showmovie} userdisplay={User_To_Show}/>: null}

            {users ? <UsersPage /> : null}
    </div>;
}

export default MainRouter;
