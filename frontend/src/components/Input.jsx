const Input = ({data, setData}) => {

    return <div>

        <input
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border rounded-md border-blue-400"/>
    </div>
}

export default Input