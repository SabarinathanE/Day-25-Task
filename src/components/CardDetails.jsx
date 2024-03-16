import { useState } from "react";
import Card from "./Card";

export default function CardDetails() {

let [id,setId] = useState(0);
let [editindex,setEditindex] = useState(null);
const [editid, setEditid] = useState();
let [data, setData] = useState("");
let [description, setDescription] = useState("");
var [CopiedData,setCopieddata] = useState([]);
const [isEditing,setIsEditing] = useState(false);
const [status, setStatus] = useState("Not-Completed");
const [filters,setFilters] = useState('All');
const [filteredData,setFilteredData] = useState([]);
const [indexDatavalue,setIndexDatavalue] = useState(null);

function AddDataInitial() {
    function IdList() {
        setId(id + 1)
    }
    IdList()
    let newList = {
        id: id, 
        Name: data,
        Description: description,
        Completed: false,
    }
    let copydata = [...CopiedData];
    copydata.push(newList);
    setCopieddata(copydata);
    setData("");
    setDescription("");
    setIsEditing(false);
}

function InputDataName(e) {
    setData(e.target.value)
 }

function InputDataDesc(e) {
    setDescription(e.target.value)
 }

 function EditData(result) {
    setEditid(result.id)
    setData(result.Name);
    setDescription(result.Description);
    let indexvalue = CopiedData.findIndex(obj => obj.id == result.id)
    setEditindex(indexvalue)
    setIsEditing(true)
 }

 function DeleteData(result) {
    setCopieddata(CopiedData.filter((details) => details.id !== result.id ));
 }
 function EditedData() {
    let newEditedList = {
        id: editid, 
        Name: data,
        Description: description,
        Completed: false
    }
    let UpDatedList = [...CopiedData];
    console.log(UpDatedList)
    UpDatedList[editindex] = newEditedList;
    setCopieddata(UpDatedList)
    setData("");
    setDescription(""); 
    setIsEditing(false)
 }

 function Placedata() {
    if (isEditing) {
        EditedData();
    }else{
        AddDataInitial();
    }
 }

 function StatusHolder(e,result) {
    setStatus(e.target.value)
    const datas = filteredData.find((array) => array.id == result.id);
    if(datas){
        let indexData = filteredData.findIndex(obj => obj.id == datas.id);
        setIndexDatavalue(indexData);
        if(datas.Completed == true){
            datas.Completed = false;
        }else{
            datas.Completed = true;
        }
    }else{
        const copiesFilteredData = [...filteredData];
        copiesFilteredData.push(result);
        setFilteredData(copiesFilteredData);
    }
 }

 function FilterArray(e) {
    setFilters(e.target.value)
 }

//  const filteredData = filters === "All"
//     ? CopiedData
//     : CopiedData.filter((item) => item.Completed === (filters === "Completed"));

    return (
        <section>
            <div className="header">
                <h3>My ToDo</h3>
            </div>
            <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-4">
                        <input type="text" aria-label="First name" value={data} placeholder="Name" style={{width:"320px"}} onChange={InputDataName} />
                    </div>
                    <div className="col-4">
                        <input type="text" aria-label="First name" value={description}  placeholder="Description" style={{width:"320px"}} onChange={InputDataDesc}  />
                    </div>
                    <div className="col-2">
                        <button onClick={Placedata}>{isEditing ? 'UpData Todo' : 'Add todo'}</button>
                    </div>
                </div> 
            </div>
            <div className="container Dropdown mt-5">
                <div className="row">
                    <div className="col-9">
                        My Todo Updates List:
                    </div>
                    <div className="col-3">
                    <div className="row">
                    <div className="col-6">Status Filter:</div>
                    <div className="col-6">
                        <select id="dropdown" onChange={FilterArray}>
                            <option value="All">All</option>
                            <option value="Completed">Completed</option>
                            <option value="Not-Completed">Not-Completed</option>
                        </select>
                        </div>
                     </div>
                    </div>
                </div>
            </div>
            </div>
                <div className="container">
                    <div className="row" style={{width: "100%"}}>
                      {
                        filters == 'All' ?
                        CopiedData.map((result,index) => (
                        <Card key={index} result={result} DeleteData={DeleteData} EditData={EditData} StatusHolder={StatusHolder} />
                           )): 
                           filteredData.map((result,index) => (
                          <Card key={index} result={result} DeleteData={DeleteData} EditData={EditData} StatusHolder={StatusHolder} />
                           ))
                      }               
                    </div>
                </div>
        </section>
    )
}