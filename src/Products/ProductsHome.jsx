import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ProductsHome() {
    let [getdata, setgetdata] = useState([]);

    //Get Api
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then((resp) => { setgetdata(resp) });
    }, [])
    console.log(getdata, "getdata")

    // View Data
    const navigate = useNavigate();
    function viewData(id) {
        navigate('/products/description', { state: { id } })
    }

    // Update Api

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
        let cartVal = {...obj,cart:true }
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
            .then((response) => { console.log(response, "updated");alert("Product Added to cart ") })
            .catch((err) => { console.log(err) })
    }



    return (
        <>

            <div className='sale container-fluid bg-dark text-center'>
                <h4 className='text-light'>Sale 20%off</h4>

            </div>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>

                {
                    getdata.map((products) => {
                        return (
                            <Card style={{ width: '18rem', margin: "5px" }}>
                                <Card.Img variant="top" src={products.img} />
                                <Card.Body>
                                    <Card.Title className='text-danger'>{products.product_name}</Card.Title>
                                    <Card.Text >
                                        {products.description}<br />
                                    </Card.Text>
                                    <Card.Text style={{ color: "orange" }}>
                                        price:₹{products.price}
                                    </Card.Text>
                                    <Button  style={{ marginRight: "25px",width:"200px",backgroundColor:"navy" }} onClick={() => { viewData(products.id) }}>View</Button>

                                    <Button variant="primary" style={{ margin: "10px 0px",width:"200px",backgroundColor:"navy" }} onClick={() => { updateCartID(products) }}>Add to Cart</Button>
                                </Card.Body>
                            </Card>
                        )

                    })
                }
            </div>
        </>
    )
}

export default ProductsHome
