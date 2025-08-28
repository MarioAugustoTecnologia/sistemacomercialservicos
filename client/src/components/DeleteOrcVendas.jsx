import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const OrcVendas = () => {

  const [orcvendas, setOrcVendas] = useState([])


  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/orcvenda").then((res) => {

      return res.json()

    }).then((resp) => {

      setOrcVendas(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


   const deleteall = (id) => {

      Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
          }).then((result) => {
      
            if (result.isConfirmed) {
      
              for (id = 0; id <= orcvendas.length; id++) {
      
                fetch("https://sistemacomercialservicos.onrender.com/orcvenda/" + id, {
          
                  method: "DELETE" 

                }).then((res) => {   

                  window.location.reload();               
          
                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })
          
              }
      
            } else if (result.isDenied) {
              Swal.fire("Nada excluido", "", "info");
            }
          });      
    
    } 
    
     const handleDelete = (id) => {
    
        Swal.fire({
          title: "Deseja Excluir ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Excluir",
          denyButtonText: `Não Excluir`
        }).then((result) => {
    
          if (result.isConfirmed) {
    
            fetch("https://sistemacomercialservicos.onrender.com/orcvenda/" + id, {
    
              method: "DELETE"
    
            }).then((res) => {
    
              window.location.reload();    
    
            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })
    
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
        });
  }

  const navigate = useNavigate()

  const Return = () => {
    navigate('/orcvendas')

  }   


  return (

    <div className="col p-0 m-0">
   
    
      <div className="px-5 mt-5" style={{fontFamily:'arial'}}>       
          <div className='mt-3'>
            <table className="table" id="table" style={{ margin: '0 70px', fontFamily: 'arial', fontSize: '20px', width: '100%' }}>
              <thead>
                <tr>        
                  <th className="th" scope="col">Orçamento nº:</th>
                  <th className="th" scope="col">Produto/ Serviço:</th>
                  <th className="th" scope="col">Qtd:</th>
                  <th className="th" scope="col">Preço:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Total c/Desconto:</th>
                   <th className="th" scope="col">Desc/ Calc:</th>
                  <th className="th" scope="col">Desconto:</th>
                  <th className="th" scope="col">Valor Desconto:</th>
                  <th className="th" scope="col">Ação:</th>       
                                                                            
                </tr>
              </thead>
              <tbody>
                {
                  orcvendas.map(item => (
                    <tr key={item.id}>               
                      <td className="td">{item.orcn}</td>
                      <td className="td">{item.nome}</td>
                      <td className="td">{item.quant}</td>
                      <td className="td">{item.preco}</td>
                      <td className="td">{item.total}</td>
                      <td className="td" style={{fontWeight:'bold', color:'green'}}>{item.totaldesc}</td>
                      <td className="td">{item.descap}</td>
                      <td className="td">{item.desc}</td>
                      <td className="td">{item.valordesc}</td>
                      <td className="td">
                         <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                      </td>                                                          
                                         
                    </tr>
                  ))
                }
              </tbody>         

            </table>
         </div>
            
       </div>       
                 
 
          <br /><br /><br />
         
          <button type="button" className="btn border" onClick={deleteall} style={{ width: 100, margin: '0 20px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'red', color:'white'}}>Excluir</button>
          <button type="button" className="btn border" onClick={Return} style={{ width: 100, margin: '0 0px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'orange', color:'white'}}>Voltar</button>
                    
         <ToastContainer />  
     
    </div>
  )
}

export default OrcVendas