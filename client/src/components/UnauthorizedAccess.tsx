import React from "react";
import { Link } from "react-router-dom";

export const UnauthorizedAccess: React.FC = () => {
  return (
    <div>
      <h1>You are not authorized to access this page. Please log in.</h1>
      <Link className="link" to="/"><button className="ui button">Login</button></Link>
    </div>
  )
}

export default UnauthorizedAccess