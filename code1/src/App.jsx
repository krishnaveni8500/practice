import React, { useState } from "react";
import logo1 from './assets/1.png'
import logo2 from './assets/2.png'
import logo3 from './assets/3.png'
import logo4 from './assets/4.png'
import logo5 from './assets/5.png'

const Crud=()=>{
    const[car,setcar]=useState([
        {id:1,brand:"Jaguar",image:logo1,price:2000,qty:3},
        {id:2,brand:"Odee",image:logo2,price:2000,qty:5},
        {id:3,brand:"Benz",image:logo3,price:2000,qty:2},
        {id:4,brand:"BMW",image:logo4,price:2000,qty:7},
        {id:5,brand:"Polo",image:logo5,price:2000,qty:4},

    ])
    const incrqty=(insc)=>{
        setcar((toinsc)=>{
            return toinsc.map((e)=>{
                if(e.id===insc){
                    return{
                        ...e,
                        qty:e.qty+1
                    }
                }else{
                        return e
                    }
                
            })
        })
    }
    const decqty=(insc)=>{
        setcar((toinsc)=>{
            return toinsc.map((e)=>{
                if(e.id===insc){
                    return{
                        ...e,
                        qty:e.qty-1>0?e.qty-1:0
                    }
                }else{
                        return e
                    }
                
            })
        })
    }
    const deletecars=(insc)=>{
        setcar((todel)=>{
            return todel.filter(e=>e.id!==insc)
        })
    }
    const[search,setSearch]=useState('')
    const filterCars=car.filter((e)=>e.brand.toLowerCase().includes(search.toLowerCase()))

    const calGrandTotal=(filterCars)=>{
        let total=0
        for(let Cars of filterCars){
            total+=((Cars.qty)*(Cars.price))   
             }
             return total
    }

    const[newCar,setNewCar]=useState({
        brand:'',
        image:'',
        price:'',
        qty:''

    })
    const[formData,setFormData]=useState(false)

    const updateCar=(e)=>{
        e.preventDefault()
        const newCardata={
            ...newCar,
            id:car.length+1,
            price:parseFloat(newCar.price),
            qty:parseInt(newCar.qty)
        }
        setcar([...car,newCardata])


    }

    const[edit,setEdit]=useState(false)

    const updateChanges=(e)=>{
        e.preventDefault()
        setcar(prevCars=>prevCars.map(i=>i.id===edit.id?edit:car))
    }


    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col">
                <h1 className="text-success">Crud Application</h1>
                <input className="form-control" placeholder="Search brand name..." value={search} 
                onChange={(e)=>{setSearch(e.target.value)}}/>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <button className="btn btn-success" onClick={()=>setFormData(!formData)}>
                            {
                               formData ? 'Cancel':"Add" 
                            }
                        </button>
                        {
                            formData &&(
                                <form className="w-25" onSubmit={updateCar}>
                                    <input type="text" placeholder="brand" 
                                    className="form-control"
                                    value={newCar.Product_Name}
                                    onChange={(e)=>setNewCar({...newCar,Product_Name:e.target.value})}/><br></br><br></br>
                                    <input type="text" placeholder="image" className="form-control"
                                    value={newCar.image}
                                    onChange={(e)=>setNewCar({...newCar,image:e.target.value})}/><br></br><br></br>
                                    <input type="text" placeholder="price" className="form-control"
                                    value={newCar.price}
                                    onChange={(e)=>setNewCar({...newCar,price:e.target.value})}/><br></br><br></br>
                                    <input type="text" placeholder="qty" className="form-control"
                                    value={newCar.qty}
                                    onChange={(e)=>setNewCar({...newCar,qty:e.target.value})}/><br></br><br></br> 
                                    <button className="btn btn-primary">submit</button>
                                </form>
                            )
                        }
                        {
                           edit&&(
                            <form className="w-25" onSubmit={updateChanges}>
                            <input type="text" placeholder="barnd" 
                            className="form-control"
                            value={edit.brand}
                            onChange={(e)=>setEdit({...edit,brand:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="image" className="form-control"
                            value={edit.image}
                            onChange={(e)=>setEdit({...edit,image:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="price" className="form-control"
                            value={edit.price}
                            onChange={(e)=>setEdit({...edit,price:e.target.value})}/><br></br><br></br>
                            <input type="text" placeholder="qty" className="form-control"
                            value={edit.qty}
                            onChange={(e)=>setEdit({...edit,qty:e.target.value})}/><br></br><br></br> 
                            <button className="btn btn-primary">save changes</button>
                        </form>

                           )
                        }
                    </div>
                </div>




            </div>
            <div className="row mt4">
                <div className="col">
                    <table className="table table-hover text-center table-striped">
                        <thead>
                            <tr>
                                <th>Sno:</th>
                                <th>brand</th>
                                <th>image</th>
                                <th>qty</th>
                                <th>price</th>
                                <th>total</th>
                                <th>Delete</th>
                                <th>Edit</th>
                </tr>
                        </thead>
                        <tbody>
                            {
                            filterCars.map((cars,index)=>{
                                return(
                                    <tr>
                                        <td>{cars.id}</td>
                                        <td>{cars.brand}</td>
                                        <td><img src={cars.image} width={70} height={70}/></td>
                                        <td>
                                        <i class="fa-solid fa-minus" onClick={()=>decqty(cars.id)}></i>
                                            {cars.qty}
                                            <i class="fa-solid fa-plus" onClick={()=>incrqty(cars.id)}></i>
                                            </td>
                                        <td>&#8377;{(cars.price)}</td>
                                        <td>&#8377;{(cars.price*cars.qty).toFixed(2)}</td>
                                        <td>
                                        <i class="fa-solid fa-trash text-danger"onClick={()=>deletecars(cars.id)}></i>
                                        </td>
                                        <td>
                                        <i class="fa-solid fa-pen-to-square" onClick={()=>setEdit(cars)}></i>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            <tr>
                                <td colSpan={4}></td>
                                <td>GrandTotal</td>
                                <td>&#8377;{calGrandTotal(filterCars).toFixed(2)}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>    

    )
    
}
export default Crud