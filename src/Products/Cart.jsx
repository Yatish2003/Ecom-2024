import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cart() {
    let [getValue, setgetValue] = useState([]);
    const[Counter,setCounter]=useState(1);

    //Counter Add
    function add(productID){
        console.log(productID,"productID");
        fetch(`http://localhost:5000/product/${productID}`)
        .then(response => response.json())
        .then((resp) => {setCounter(Counter => Counter + 1) })
        .catch((err)=>{console.log(err)})

    }

    //Counter Sub
    function sub(productID){
        console.log(productID,"productID");
        fetch(`http://localhost:5000/product/${productID}`)
        .then(response => response.json())
        .then((resp) => {setCounter(Counter => Counter > 1 ? Counter- 1 :1 ) })
        .catch((err)=>{console.log(err)})

    }
    console.log(Counter,"counter");
    //Get Api
    function gettingData(){
        fetch('http://localhost:5000/product')
        .then(response => response.json())
        .then((resp) => { setgetValue(resp) });
    }
    useEffect(() => {
        gettingData();
    }, [])
    console.log(getValue,"getvalue");


    //Update Cart
    function updateCartID(product) {

        fetch(`http://localhost:5000/product/${product.id}`)
            .then(resp => resp.json())
            .then(response => {

                updateCart(response);
            })
            .catch((err) => { console.log(err) })

        console.log("value send to function")
    }


    function updateCart(obj) {
        let cartVal = {...obj,cart:false }
        console.log(cartVal,"cartVal")
        fetch(`http://localhost:5000/product/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(cartVal)
        })
            .then(resp => resp.json())
            .then((response) => { console.log(response, "updated");
                gettingData(); })
            .catch((err) => { console.log(err) });
            
            
    }



    return (
        <>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>
                {
                    getValue.map((cartProduct)=>{
                        if (cartProduct.cart === true) {
                            return (
                                <Card key={cartProduct.id} style={{ width: '18rem',marginRight:"10px" }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                        <Card.Title>{cartProduct.product_name}</Card.Title>
                                        <Card.Text>
                                           {cartProduct.description}<br/>
                                           price:{cartProduct.price}<br/>
                                           Quantity:{Counter}
                                        </Card.Text>
                                        <Button variant="primary" style={{margin:"5px 5px",width:"100px",height:"25px",padding:"0px",borderRadius:"50px"}} onClick={()=>{add(cartProduct.id) }}>+</Button>
                                        <Button variant="primary" style={{margin:"5px 0px",width:"100px",height:"25px",padding:"0px",borderRadius:"50px"}} onClick={()=>{sub(cartProduct.id) }}>-</Button>
                                        <Button variant="warning" style={{margin:"5px 0px"}}>Buy Now</Button>
                                        <Button variant="danger" style={{ margin: "5px 0px",width:"255px" }} onClick={() => { updateCartID(cartProduct) }}>Remove</Button>
                                    </Card.Body>
                                </Card>
                        
                            )
                        }
                        return null;
                        
                    })
                }
            </div>
        </>
    )
}

export default Cart


