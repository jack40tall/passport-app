import React from "react";
import { Link } from "react-router-dom";

export const LogoutPage: React.FC = () => {
  return (
    <div>
      <h1>Logout successful</h1>
      <h2>Have a nice day</h2>
      <Link className="link" to="/"><button className="ui button">Login</button></Link>
    </div>
  )
}

export default LogoutPage