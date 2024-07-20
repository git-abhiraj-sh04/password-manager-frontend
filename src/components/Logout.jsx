import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    return (
  <button
    onClick={() => {
      localStorage.clear();
      navigate("/login");
    }}
  >
    Logout
  </button>
);}

export default Logout