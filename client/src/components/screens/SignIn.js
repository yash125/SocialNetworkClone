import React,{useState,useContext,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userContext, UserContext} from '../../App'
import M from 'materialize-css'
import AOS from 'aos';
import "aos/dist/aos.css";

const SignIn = () =>{
    useEffect(() => {
        AOS.init();
        AOS.refresh();
      });
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const[password,setPassword] = useState("");
    const[email,setEmail] = useState("");
    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                localStorage.setItem('jwt',data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Logged in Successfuly",classes:"#1e88e5 blue darken-1"})
                history.push("/")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
        <div>
            <h2 className="brand-logo yes" data-aos="zoom-in" style={{textAlign:"center"}}>Welcome to Picturegram</h2>
        </div>

        <div className="mycard" >
            <div className="card mr-auto auth-card input-field">
            <h2>Picturegram</h2>
            <input 
            type='text' 
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type='password' 
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
             onClick={()=>PostData()}
             >
                 Login
            </button>
            <h6>
                <Link to='/signup'> Not on Picturegram? SignUp!</Link>
            </h6>


            
            
        
      </div>
        </div>
        </>
    )
}


export default SignIn;
