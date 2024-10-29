import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Description() {
    const [getValue, setgetValue] = useState([]);
    const location = useLocation();
    const navigateId = location.state.id;
    console.log(navigateId)

    // Get Api
    useEffect(() => {
        fetch('http://localhost:5000/product')
            .then(response => response.json())
            .then((resp) => { setgetValue(resp) });
    }, []);

    return (
        <div className='container-fluid d-flex justify-content-center flex-wrap m-3'>
            {
                getValue.map((val) => {

                    if (navigateId == val.id) {

                        return (
                            <Card key={val.id} style={{ width: '40rem', height: '550px' }} className="shadow-sm border-light d-flex ">
                            <div className="flex-shrink-0" style={{ width: '100%', height: '350px' }}>
                                <Card.Img
                                    variant="top"
                                    src={val.img}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-between" style={{ padding: '15px', flexGrow: 1 }}>
                                <div>
                                    <Card.Title>{val.product_name}</Card.Title>
                                    <Card.Text>
                                        <strong>Description:</strong> {val.description}
                                    </Card.Text>
                                    <Card.Subtitle className="mb-2 text-muted">Price: ₹{val.price}</Card.Subtitle>
                                </div>
                                <div className="d-flex justify-content-between mt-auto">
                                    <Button variant="success" style={{marginRight:"3px"}}>Add to Cart</Button>
                                    <Button variant="warning">Buy Now</Button>
                                </div>
                            </div>
                        </Card>



                        );
                    }

                })
            }
        </div>
    );
}

export default Description;
