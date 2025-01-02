import { Link } from "react-router-dom"
import ButtonCustom from "../ui/buttons";
function SearchBar(){
    return (
        <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex px-12 py-3 rounded-full border-2 border-blue-800 overflow-hidden max-w-md mx-auto font-protest">
        <input type="email" placeholder="Search"
          className="w-full outline-none bg-transparent text-gray-600 text-sm" />
      </div>
      <div className="mt-2">
        <Link to={`/chat`}><ButtonCustom text={"Chat"}/></Link>
        <Link to={`/chat`}><ButtonCustom text={"Video"}/></Link>
      </div>
      {/* <div><button type="button" className="text-stone-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 rounded-full text-sm px-6 py-2.5 text-center me-2 mb-2 mt-2 dark:focus:ring-yellow-900 font-protest border-2 border-blue-800">Join Room</button></div> */}
    </div>
    )
}

export default SearchBar;