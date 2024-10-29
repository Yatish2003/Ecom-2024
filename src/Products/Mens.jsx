import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
function Mens() {
    // Get Api
    const [mensProduct, setmensProduct] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then((resp) => { setmensProduct(resp) })
            .catch((err) => { console.log(err) });
    }, []);
    console.log(mensProduct, "mens")

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
            .then((response) => { console.log(response, "updated");
                Swal.fire({
                    title: "Product added to cart",
                    showClass: {
                        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                    },
                    hideClass: {
                        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                    }
                }); })
            .catch((err) => { console.log(err) })
    }

    return (
        <>
            <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>

                {
                    mensProduct.map((val) => {
                        if(val.category =="mens"){
                            return (
                                <Card style={{ width: '18rem', margin: "15px" }}>
                                    <Card.Img variant="top" src={val.img} />
                                    <Card.Body>
                                        <Card.Title className='text-danger'>{val.product_name}</Card.Title>
                                        <Card.Text >
                                            {val.description}<br />
                                        </Card.Text>
                                        <Card.Text style={{ color: "orange" }}>
                                            price:₹{val.price}
                                        </Card.Text>
                                        
                                        <Button variant="primary" style={{ margin: "10px 0px",width:"200px",backgroundColor:"navy" }} onClick={() => { updateCartID(val) }}>Add to Cart</Button>
                                    </Card.Body>
                                </Card>
                            )
                        }

                    })
                }
            </div>
        </>
    )
}

export default Mens
