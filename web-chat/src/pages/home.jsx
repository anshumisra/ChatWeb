import { Link } from "react-router-dom"
import { useState } from "react";
import ButtonCustom from "../components/ui/buttons";
import SearchBox from "../components/ui/searchBox";

export default function Home() {
  const [userName, setUserName] = useState("");

  const handleInputChange = (value) => {
    setUserName(value);
    console.log(userName);
  };

  return (
    <div>
      <div className="flex justify-around p-3 mb-20 border-b border-amber-200">
        <Link to={`/`}><ButtonCustom text={"Home"} /></Link>
        <Link to={`/chat`}><ButtonCustom text={"Chat"} /></Link>
        <Link to={`/video`}><ButtonCustom text={"Video"} /></Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-35">
        <div className="text-center text-yellow-400 text-7xl max-w-3xl font-protest">
          Join, Connect and Communicate
        </div>
        <div className="text-center text-yellow-400 font-protest tracking-wide text-2xl">Seamless Chat & Video Calls in One Click</div>
      </div>
      <div className="mt-20 flex flex-col justify-center items-center mt-8">
        <SearchBox placeholderText="Enter your name" onInputChange={handleInputChange}/>
        <div className="mt-2">
          <Link to={'/chat'} state={{ userName: userName }}><ButtonCustom text={"Chat"} /></Link>
          <Link to={'/video'} state={{ userName: userName }}><ButtonCustom text={"Video"} /></Link>
        </div>
      </div>
    </div>
  )
}