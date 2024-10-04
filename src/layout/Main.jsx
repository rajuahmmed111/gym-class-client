import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";

const Main = () => {
  //   const location = useLocation();

  //   const noHeaderFooter =
  //     location.pathname.includes("login") || location.pathname.includes("signUp");

  return (
    <div>
      {/* {noHeaderFooter || <Navbar />} */}
      <Navbar />
      <Outlet></Outlet>
      {/* {noHeaderFooter || <Footer />} */}
    </div>
  );
};

export default Main;
