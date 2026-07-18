const Button = ({onClick, data}) => {

    return <div>
        <button
            onClick={onClick}
            className={`h-12 w-26 bg-blue-600 text-white border rounded-xl
        transition-all duration-300 
        hover:bg-blue-400
        hover:text-white
        hover:rounded-2xl
        hover:font-semibold
        hover:border-none`}
        >{data}</button>
    </div>
}

export default Button