const Button = ({onClick,data})=>{

    return <div>
        <button
            onClick={onClick}
        className={`h-12 w-26 bg-black text-white border rounded-sm
        transition-all duration-300 
        hover:bg-blue-400
        hover:text-white
        hover:rounded-2xl
        hover:font-semibold`}
        >{data}</button>
    </div>
}

export default Button