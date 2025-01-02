function ButtonTransparent({text,type}){
    return (
        <button type={type} className="mr-4 text-yellow-400 hover:bg-yellow-100 hover:text-stone-900 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 font-protest border-2 border-yellow-400">{text}</button>
    )
}
export default ButtonTransparent;