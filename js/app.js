'use strict'

import{openModal,closeModal}from'./modal.js';  
import { readcustomers,creatcustom, deletetarcustomer,uptadeClient } from './customers.js';


const creatRow = ({nome, email, celular, cidade, id}) =>{

const row = document.createElement('tr');

row.innerHTML =`
<td>${nome}</td>
<td>${email}</td>
<td>${celular}</td>
<td>${cidade}</td>
<td>
    <button type="button" class="button green" onClick="editar(${id})">editar</button>
    <button type="button" class="button red" onClick = "delet(${id})">excluir</button>
</td>

`;

return row;

}



async function updatetable(){
    const clientescontainer = document.getElementById('clientes-container');
//ler a api e armazenar o resultado em uma variavel 

const customers = await readcustomers();

//preeencher a tabela com os dados da api 

const rows = customers.map(creatRow);

clientescontainer.replaceChildren(...rows);

}



const isEdit = () => document.getElementById('nome').hasAttribute('data-id');

const salvecustomer = async () => {
// pegar o dados da modal e trasnforma em um json

const form = document.getElementById('modal-for');



const customer = {
"id": "",
"nome": document.getElementById('nome').value,
"email": document.getElementById('email').value,
"celular" : document.getElementById('celular').value,
"cidade"  : document.getElementById('cidade').value,
"foto" : document.getElementById('img-modal').src

}

if(form.reportValidity()){


if(isEdit()){
    customer.id = document.getElementById('nome').dataset.id
    await uptadeClient(customer);
}else{
    creatcustom(customer);
}

// fechar a modal
closeModal();
//atualizar na tabela
updatetable();

}

}

const fillform = (cliente)=>{
  
       
    document.getElementById('nome').value = cliente.nome,
    document.getElementById('email').value= cliente.email,
    document.getElementById('celular').value= cliente.celular,
    document.getElementById('cidade').value= cliente.cidade,
    document.getElementById('img-modal').src = cliente.foto,
    document.getElementById('nome').dataset.id = cliente.id;
        
      

}

globalThis.editar = async (id) =>{
     const customer = await readcustomers(id);
    fillform(customer);
    openModal();
}

globalThis.delet = async (id) =>{

    await deletetarcustomer(id);
    updatetable();

}


updatetable();

// const selectcustomer = async (event) =>{            // uma funcao para o click do usuario nos container
//     if(event.target.type == 'button'){                            // if para saber aonde o usuario clicou, (button,edita,exclur ou container inteiro);
//            const [action,codigo] = event.target.id.split('-');
//            const id = event.target.id;

//            if(action == 'editar'){
//            //aqui exclui cliente
             

//            }else if(action == 'excluir'){
//             //aqui exclui cliente
//             const dele =  await deletetarcustomer(codigo);
//             updatetable();

//            } 
//     }     

// }

const masckcelular = ({target}) =>{
    let text = target.value

    text = text.replace(/[^0-9]/,'');
    text = text.replace(/(.{2})(.{5})(.{4})/,'($1) $2-$3');
    text = text.replace(/(.{17})(.*)/,'$1');

    target.value = text;

}

//eventos

document.getElementById('cadastrarCliente').addEventListener('click', openModal);

document.getElementById('salvar').addEventListener('click', salvecustomer);

// document.getElementById('clientes-container').addEventListener('click' , selectcustomer);

document.getElementById('celular').addEventListener('keyup', masckcelular);