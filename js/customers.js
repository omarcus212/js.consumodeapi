'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes';

const readcustomers = async (id= '') =>{

   const reponse = await fetch(`${url}/${id}`);

   return await reponse.json();

}

const creatcustom = async (client) =>{
    const option ={
        method : 'POST',
        body: JSON.stringify(client),
        headers:{
            'content-type':'application/json'
        }
    }

    const reponse = await fetch(url,option);
    console.log(reponse.ok);
}


const deletetarcustomer = async(codigoid) =>{
 const option = {
    method : 'DELETE',
 }
 const reponse = await fetch(`${url}/${codigoid}`,option);

 
}

const uptadeClient = async(client) => {
    const option ={
        method : 'PUT',
        body: JSON.stringify(client),
        headers:{
            'content-type':'application/json'
        }
    }
    const response = await fetch (`${url}/${client.id}`, option);
    console.log('UPDATE', response.ok);
  
}

export{
    readcustomers,
    creatcustom,
    deletetarcustomer,
    uptadeClient
    
}

