import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Nav.css";
function Navbar() {
    const [Search,setSearch]=useState("");
    const [getApi,setgetApi]=useState([]);
    const [searchData, setSearchData] = useState([])
    const [visible, setVisible] = useState("false")

    //get api
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then((resp) => { 
                setgetApi(resp) 
                // setSearchData(resp)
                
            });
    }, [])
    console.log(getApi, "getApi");
    console.log(Search, "Search");

    
    useEffect(()=>{
       let filterData = getApi.filter((val)=>{
            return val.product_name.toLowerCase().includes(Search.toLowerCase()) || val.category.toLowerCase().includes(Search.toLowerCase())
        })
    
        console.log(filterData,"filterData")
        setSearchData(filterData)
    },[Search])
    console.log(searchData,"searchData")

    function setDropdown(val){
        setSearch(val);

        if(val.length == ""){
            setVisible("false")
        }else{

            setVisible("true")
        }

    }

    let styleDiv = {
                    width:'300px', 
                    backgroundColor:'white',
                    position:'absolute',
                    padding:'5px',
                    top:'44px',
                    borderRadius:'10px',
                    zIndex:'2',
                    display:'block'
                }
        
    let styleDiv2 = {
        display: 'none'
    }

    return (
        <>
            <div class="navbar" style={{ display: "flex", justifyContent: "space-between",boxSizing:"border-box"}}>

                <div>
                    <Link to='/'>Home</Link>
                    <div class="dropdown">
                        <Link to='/products'>Products</Link>
                        <div class="dropdown-content">
                            <Link to='/products/mens'>Mens</Link>
                            <Link to='/products/womens'>Womens</Link>
                            <Link to='/products/kids'>Kids</Link>
                        </div>
                    </div>
                    <Link to='/carts'>Cart<i class="fa-solid fa-cart-shopping"></i></Link>
                    <div className='validation'>
                        <Link to='/login'>Login</Link>
                        <Link to='/signUp'>Signup</Link>
                    </div>

                </div>
                <div className='searchBar' style={{position:'relative'}}>
                    <input type='text' placeholder='search' style={{width:'300px',marginRight:'5px',position:'relative'}} onChange={(e)=>{setDropdown(e.target.value)}}/>
                    <div id='searchDrop'style={visible == "true" ? styleDiv : styleDiv2}>
                        {
                            searchData?.map((val)=>{
                                return(
                                    <>
                                        <p>{val.product_name}</p><hr/>
                                        
                                    </>
                                )
                            })
                        }
                   </div>
                    
                </div>

            </div>

        </>
    )
}
export default Navbar;