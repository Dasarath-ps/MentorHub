const Input = ({data, setData, ofType}) => {

    return <div>

        <input
            type={ofType}
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border rounded-md border-blue-400 text-white"/>
    </div>
}

export default Input