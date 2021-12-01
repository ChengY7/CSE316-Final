import { Link } from 'react-router-dom'
export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <button class="button1" type="button"><Link to='/register/' style={{ textDecoration: 'none', color: 'black' }}>Create <br/> Account</Link></button>
            <button class="button2" type="button"><Link to='/login/' style={{ textDecoration: 'none', color: "black" }}>Login</Link></button>
            <button class="button3" type="button">Continue <br/>as Guest</button>
            <br/>
           <span class="font1">Welcome to the Top 5 Lister</span> 
           <br/>
           <br/>
           <div class="font2">Create your own top 5 list or you can view
           <br/>
           and vote on existing top 5 lists!</div> 
           <br/>
           <span class="font3">Student Developer: Cheng Yang</span>
        </div>
    )
}