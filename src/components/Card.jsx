export default function Card({result=[],DeleteData = () => {},EditData = () => {},StatusHolder = () => {}}) {


    return (
        <div className="mt-3"> 
            <div className="col-3">
            <div className="card" style={{width: "20rem"}}>
            <div className="card-body">
                <h5 className="card-title">Name: {result.Name}</h5>
                <h6 className="card-subtitle mb-2 text-muted Description">Description: {result.Description} </h6>
                <div className="row">
                    <div className="col-4">
                <p className="card-text Inner-Dropdown">Status:</p>
                    </div>
                        <select id="dropdown"   onChange={(e) => StatusHolder(e,result)}>
                            <option value="Not-Completed">Not-Completed</option>
                            <option value="Completed">Completed</option>
                        </select>   
                </div> 
                </div>
                <div className="Bottom mb-3">
                <button type="button" className="btn mx-3 btn-primary btn-sm" style={{width: 70}} onClick={() => EditData(result)} >Edit</button>
                <button type="button" className="btn btn-secondary btn-sm" style={{width: 70}} onClick={() => DeleteData(result)} >Delete</button>
                </div>
            </div>
            </div>
            </div>
    )
}
