import React from "react";

const CustomNavbar = (props) => {
    return (
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
      
    <a class="navbar-brand " href="#">
      {/* <img src="/docs/5.1/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top" /> */}
       NEX
    </a>
    <form class="d-flex">
        {

           !props.isAuthenticated && <button class="btn btn-primary" type="button" onClick={()=>{props.login();console.log(props.isAuthenticated)}}>Connect Wallet</button>
           
        }
        {
            props.user && <p style={{paddingTop:"3%", paddingRight:"10px", fontFamily:"sans-serif" , color:"green"}}>{props.user.get("ethAddress")}</p>
        }
         {
            
            props.isAuthenticated && <button class="btn btn-danger" type="button" onClick={()=>props.logout()}>Logout</button>
        }
        
      </form>
  </div>
  

</nav>
    )
    
}

export default CustomNavbar;