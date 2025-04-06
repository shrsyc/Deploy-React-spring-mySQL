import Navbar from "../Navbar/Navbar";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import dashboardBg from "../assets/dashboard-bg.png";
import seed from "../assets/seed.png";
import plant from "../assets/plant.png";
const UserDashboard = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar></Navbar>
        <div
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardBg})` }}
        >
          <div className="flex p-5 gap-28 pt-44">
            <div className="flex-1">
              <div className="w-56 p-5 rounded-md ml-auto mr-0 border-2 border-slate-300 bg-white opacity-90">
                <p className="font-bold text-xl text-yellow-800">Seeds</p>
                <img src={seed} className="h-32 m-auto"></img>
                <NavLink to="/viewSeeds">
                  <Button className="block  my-5 w-full bg-yellow-950 hover:bg-yellow-800">
                    Buy Seeds
                  </Button>
                </NavLink>
              </div>
            </div>
            <div className="flex-1">
              <div className="w-56 p-5 rounded-md ml-0 mr-auto border-2 border-slate-300 bg-white opacity-90">
                <p className="font-bold text-xl text-lime-700">Plants</p>
                <img src={plant} className="h-32 m-auto"></img>
                <NavLink to="/viewPlants">
                  <Button className="block  my-5 w-full bg-lime-900 hover:bg-lime-700">
                    Buy Plants
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
