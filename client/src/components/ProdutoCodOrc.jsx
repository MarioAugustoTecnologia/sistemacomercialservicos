import React, {useEffect, useState} from "react";
import {Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import useScanDetecion from 'use-scan-detection-react18';


const ProdutoCodOrc = () => { 


   const [produtocod, setProdutoCod] = useState([]);
   const [buscarap, setBuscaRap] = useState('');  
    
   var table = produtocod.filter(item => item.codigo.includes(buscarap))
 
 
   const navigate = useNavigate();

   //const [value, setValue] = useState("");
   useScanDetecion({
    onComplete: setBuscaRap,
    minLength: 13 
   })


   useEffect(() => {

     fetch("https://sistemacomercialservicos.onrender.com/produtos").then((res) => {

      return res.json()

     }).then((resp) => {

      setProdutoCod(resp)

     }).catch((err) => {
      console.log(err.message)
    }) 
   
  }, [])  


const handleInsert = (id) => {
    
  navigate("/entradas/cadastrar/orc/" + id);  

} 



const logout = () => {
  localStorage.clear()
  console.clear();
  
}

    
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{fontFamily:'arial', fontSize:'19px'}}>
           <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <Link
              to=""
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
              >
               <span className='fs-5 fw-bolder d-none d-sm-inline'>
               Opções:
             </span>
             </Link>
             <ul
             className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
             id="menu"
           >
             <li className="w-100">
               <Link
                 to="/home"
                 className="nav-link text-white px-0 align-middle"
               >
                 <i className="fs-4 bi-speedometer2 ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Home:</span>
               </Link>
             </li>
             <li className="w-100">
               <Link
                 to="/usuarios"
                 className="nav-link px-0 align-middle text-white"
               >
                 <i className="fs-4 bi-people ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">
                  Usuarios:
                 </span>
               </Link>
             </li> 
             <li className="w-100">
                <Link
                  to="/entradas"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash-coin ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Vendas:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/compras"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-cash ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                   Compras:
                  </span>
                </Link>
              </li> 
              <li className="w-100">
                <Link
                  to="/despesas"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-coin ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                   Despesas:
                  </span>
                </Link>
              </li>             
              <li className="w-100">
                <Link
                  to="/produtos"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-box-fill ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                     Produtos e Serviços:
                  </span>
                </Link>
              </li>
               <li className="w-100">
                <Link
                  to="/servicos"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-tools" style={{margin:'0 8px'}}></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Cadastro de Serviços:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/fornecedores"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-truck ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                 Fornecedores:
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/clientes"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-person-square ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Clientes:
                  </span>
                </Link>
              </li> 
              <li className="w-100">
                <Link
                  to="/resultado"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi bi-bank ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                     Resultados:
                  </span>
                </Link>
              </li>             
             
             <li className="w-100" onClick={logout}>
                <Link to='/'
                 className="nav-link px-0 align-middle text-white"
                 >
                 <i className="fs-4 bi-power ms-2"></i>
                 <span className="ms-2 d-none d-sm-inline">Logout</span>
               </Link>
             </li>
           </ul>
         </div>
       </div>
       <div className="col p-0 m-0">
           <div className="p-2 d-flex justify-content-center shadow text-white" style={{backgroundColor:'blue', fontFamily:'arial', width:'140%'}}>
               <h4><strong>Sistema de Gestão Comercial</strong></h4>
           </div>
           <Outlet />
           <div className="px-5 mt-5">             
             <div>
                <div className="mb3">
                  <label htmlFor="Id" className="Id" style={{fontFamily: 'arial', fontSize:'22px', fontWeight:'bold'}}>Busca por codigo de venda:</label><br />                  
                  <input style={{fontFamily: 'arial', fontSize:'22px', width:'200px', fontWeight:'bold', color:'navy'}} type="search" className="consultaid" value={buscarap} onChange={(e) => setBuscaRap(e.target.value)} id="busca" autoFocus='true'/>                  
                  <Link to="/orcvendas" className="btn" style={{color: 'white', backgroundColor:'orange', margin: '0 58px', fontSize:'18px', fontFamily:'arial', width:'240px'}}>Orçamento de Venda:</Link>
                                                       
                </div><br /><br /><br />
                     <div className="mt-3">
                      <h4 style={{color:'red', fontSize:'25px'}}><strong><center>Produtos e Serviços:</center></strong></h4><br /><br />
                         <table className="table" style={{margin:'0 -30px', fontFamily:'arial', fontSize:'20px', width:'136%'}} id="table">
                              <thead>
                                  <tr>
                                  <th scope="col" className="th">Id:</th>
                                  <th scope="col" className="th">Nome:</th>
                                  <th scope="col" className="th">Custo:</th>
                                  <th scope="col" className="th">Preço:</th>
                                  <th scope="col" className="th">Categoria:</th> 
                                  <th scope="col" className="th">Data de Cadastro:</th>
                                  <th scope="col" className="th">Quantidade:</th> 
                                  <th scope="col" className="th">Codigo de Venda:</th>                                                                                                                                    
                                  <th scope="col" className="th">Ação:</th>                            
                                  </tr> 
                              </thead>
                              <tbody>                                
                                {
                                  table.map(item => (
                                    <tr key={item.id}>
                                           <td className="td">{item.id}</td>
                                           <td className="td">{item.nome}</td>
                                           <td className="td">{item.custo}</td> 
                                           <td className="td">{item.preco}</td> 
                                           <td className="td">{item.categoria}</td> 
                                           <td className="td">{item.data_cadastro}</td>
                                           <td className="td">{item.qtd}</td>                                                                                                        
                                           <td className="td">{item.codigo}</td>                                                                                                                                                                                                                                                                                                               
                                           <td className="td"  > 
                                           
                                           <button className="vender"  onClick={() => {handleInsert(item.id)}} style={{color:'white', backgroundColor:'green', border:'none', borderRadius:'5px'}}>Orc Venda:</button>
                                                                                                   
                                           </td> 

                                    </tr>
                                  ))
                                                                                                     
                                }   
                                                                       
                              </tbody>
                
                          </table> 
                  </div>   
                                                     
               
               

              </div>    
              
                                       
          </div>                          
                                   
       </div> 
                 
    </div>
 </div>
  )
}

export default ProdutoCodOrc
