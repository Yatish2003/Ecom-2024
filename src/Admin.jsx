import React, { useState } from 'react'
import './AdminProduct.css';
import axios from 'axios';
function Admin() {
    let [Img,setImg]=useState("");
    let [Img1,setImg1]=useState("");
    let [Img2,setImg2]=useState("");
    let [Img3,setImg3]=useState("");
    let [ProdcutName,setProdcutName]=useState("");
    let [ProdcutCategory,setProdcutCategory]=useState("");
    let [ProdcutDes,setProdcutDes]=useState("");
    let [ProdcutPrice,setProdcutPrice]=useState(Number);
    let [deleteProductID,setdeleteProductID]=useState("");


    function AddProduct(e){
        e.preventDefault(); 
        // console.log(Img,'Img')
        // console.log(Img1,'Img1')
        // console.log(Img2,'Img2');
        // console.log(Img3,'Img3');
        axios.post('http://localhost:5000/product',{
            img :`${Img}`,
            product_name:`${ProdcutName}`,
            category : `${ProdcutCategory}`,
            wishlist: false,
            cart: false,
            description: `${ProdcutDes}`,
            price: `${ProdcutPrice}`,
            img1 : `${Img1}`,
            img2 : `${Img2}`,
            img3 : `${Img3}`
        })
        .then(resp=> console.log(resp))
        .catch(err=> console.log(err))
        alert('Product Added');
        emptyInput();

    }

    function DeletProduct(id){
        console.log(id);
        axios.delete(`http://localhost:5000/product/${id}`)
        .then(res=>console.log(res))
        .catch(err => console.log(err));
        setdeleteProductID("");
        alert(`Product with Id:${id} is deleted`);

    }
    function emptyInput(){
        setImg("");
        setImg1("");
        setImg2("");
        setImg3("");
        setProdcutName("");
        setProdcutCategory("");
        setProdcutDes("");
        setProdcutPrice("");
    }
    return (
        <>
            <div>
                <h1>Admin</h1>
            </div>
            <div style={{ width: '20%' }}>
                <button style={{ margin: '10px 0px' }}>Add product</button>
                <a href='#delete'><button style={{ margin: '10px 0px' }}>DeletProduct</button></a>

                
            </div>
            <div className='product-container'>
                <div className='product-details-conatiner'>
                    <h1 style={{ textAlign: 'center' }}>Add Product Details</h1>
                    <form >
                        <input type='text' value={Img} placeholder='Img path' onChange={(e)=>{setImg(e.target.value)}} />
                        <input type='text' value={Img1} placeholder='Img path1' onChange={(e)=>{setImg1(e.target.value)}} />
                        <input type='text' value={Img2} placeholder='Img path2' onChange={(e)=>{setImg2(e.target.value)}} />
                        <input type='text' value={Img3} placeholder='Img path3' onChange={(e)=>{setImg3(e.target.value)}} />
                        <input type='text' value={ProdcutName} placeholder='Product-Name' onChange={(e)=>{setProdcutName(e.target.value)}} />
                        <input type='text' value={ProdcutCategory} placeholder='Product-Category' onChange={(e)=>{setProdcutCategory(e.target.value)}} />
                        <input type='text' value={ProdcutDes} placeholder='Product-description' onChange={(e)=>{setProdcutDes(e.target.value)}} />
                        <input type='text' value={ProdcutPrice} placeholder='Product-price' onChange={(e)=>{setProdcutPrice(e.target.value)}} />
                        <button onClick={(e)=>{AddProduct(e)}}>Add</button>
                       
                    </form>
                </div>
            </div>

            <div class="p-5 d-flex justify-content-center align-items-center" id='delete' style={{width:'100%'}}>
                <div class='border p-3'style={{width:'30%'}}>
                    <h1>Delete Product</h1>
                        <input type='text' value={deleteProductID} placeholder='Product-id' onChange={(e)=>{setdeleteProductID(e.target.value)}} />
                        <button onClick={()=>{DeletProduct(deleteProductID)}}>delet Product</button>
                </div>
            </div>
        </>
    )
}

export default Admin
