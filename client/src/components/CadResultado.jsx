import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadResultado = () => {

  const [mes, meschange] = useState("")
  const [entradadata, setEntradadata] = useState([]);
  const [saidadata, setSaidadata] = useState([]);
  const [buscaentrada, setBuscaEntrada] = React.useState("")
  const [buscasaida, setBuscaSaida] = React.useState("")

  const buscarap = buscaentrada.toLowerCase()
  const buscarap2 = buscasaida.toLowerCase()

  var table = entradadata.filter(item => item.nome.toLowerCase().includes(buscarap))
  var table2 = saidadata.filter(item => item.nome.toLowerCase().includes(buscarap2))

  const API_ENTRADAS = 'https://sistemacomercialservicos.onrender.com/entradas';
  const API_SAIDAS = 'https://sistemacomercialservicos.onrender.com/saidas';
   
     useEffect(() => {
   
       fetch(API_ENTRADAS)
         .then(response => response.json())
         .then(data => setEntradadata(data))
         .catch(error => console.error('Erro ao buscar os dados:', error));
   
     }, [])

    useEffect(() => {
   
       fetch(API_SAIDAS)
         .then(response => response.json())
         .then(data => setSaidadata(data))
         .catch(error => console.error('Erro ao buscar os dados:', error));
   
     }, [])


  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"
 
    if (mes === null || mes === '') {
      document.getElementById('mes').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Email:' 
    }
    if (document.getElementById('resultado').value === null || document.getElementById('resultado').value === '') {
      document.getElementById('resultado').style.borderColor = 'red'
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  function MostraEntradas() {
    document.getElementById('entradas').style.borderColor = 'GainsBoro'
  }
  function MostraSaidas() {
    document.getElementById('saidas').style.borderColor = 'GainsBoro'
  }


    function somar() { 
  
  
        let valores = [];
  
        table2.map(item => {
          valores.push(item.total)
        })
  
        let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
          return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
        }) 

        document.getElementById('saidas').value = soma;
              
    }


  const cadastrar = (e) => {

    e.preventDefault();

    const data = new Date();
    const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const saidas = document.getElementById('saidas').value;
    const entradas = document.getElementById('entradas').value;

    var resultado = document.getElementById('resultado').value;

    const cadobj = { resultado, entradas, saidas, data_cad, mes }

    if (isValidate()) {

      Swal.fire({
        title: "Deseja salvar ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Não salvar`
      }).then((result) => {

        if (result.isConfirmed) {

          fetch("https://sistemacomercialservicos.onrender.com/resultados", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cadobj)
          }).then((res) => {
            toast.success('Cadastrado com Sucesso !')                 

          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })

        }
        else if (result.isDenied) {
          Swal.fire("Nada salvo", "", "info");
        }
      })
    }

  }


  function calcResult() {

    const saidas = document.getElementById('saidas').value;
    const entradas = document.getElementById('entradas').value;
    const resultado = (entradas - saidas).toFixed(2);
    console.log(resultado)
    document.getElementById('resultado').value = resultado;

  }

  const DeleteEntradas = (id) => {
  
      Swal.fire({
        title: "Deseja Excluir ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: `Não Excluir`
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          fetch("https://sistemacomercialservicos.onrender.com/entradas/" + id, {
  
            method: "DELETE"
  
          }).then((res) => {
  
            window.location.reload();
            //toast.success('Excluido com sucesso !')     
  
          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })
        } else if (result.isDenied) {
          Swal.fire("Nada excluido", "", "info");
        }
      });
  
    }


      const DeleteSaidas = (id) => {
  
      Swal.fire({
        title: "Deseja Excluir ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: `Não Excluir`
      }).then((result) => {
  
        if (result.isConfirmed) {
  
          fetch("https://sistemacomercialservicos.onrender.com/saidas/" + id, {
  
            method: "DELETE"
  
          }).then((res) => {
  
            window.location.reload();
            //toast.success('Excluido com sucesso !')     
  
          }).catch((err) => {
            toast.error('Erro ! :' + err.message)
          })
        } else if (result.isDenied) {
          Swal.fire("Nada excluido", "", "info");
        }
      });
  
    }

const DeleteAllInputs = async () => {
      
     const result = await Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
          })
      
          if (result.isConfirmed) {
      
            try {          
              const deletePromises = entradadata.map(item =>
                fetch(`${API_ENTRADAS}/${item.id}`, {
                  method: 'DELETE',
                })
              );      
              await Promise.all(deletePromises);   
              setEntradadata([]);         
              window.location.reload();  
      
            } catch (error) {
      
              console.error('Erro ao excluir todos os dados:', error);
            }     
           
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
      
      
}; 


const DeleteAllOutputs = async () => {
      
     const result = await Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
          })
      
          if (result.isConfirmed) {
      
            try {          
              const deletePromises = saidadata.map(item =>
                fetch(`${API_SAIDAS}/${item.id}`, {
                  method: 'DELETE',
                })
              );      
              await Promise.all(deletePromises);   
              setSaidadata([]);         
              window.location.reload();  
      
            } catch (error) {
      
              console.error('Erro ao excluir todos os dados:', error);
            }     
           
          } else if (result.isDenied) {
            Swal.fire("Nada excluido", "", "info");
          }
      
      
};  
      
      
 const handleInsert = () => {
    
    document.getElementById('entradas').value = document.getElementById('total').innerHTML;  

}
  

  const logout = () => {
    localStorage.clear()
    console.clear();

  }


  return (
    <div className="container-fluid" style={{ fontFamily: 'arial' }}>
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-secondary" style={{ fontFamily: 'arial', fontSize: '19px' }}>
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
                  <span className="ms-2 d-none d-sm-inline">Painel:</span>
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
                    Serviços:
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
              <li className="w-100" style={{ margin: "0 7px" }}>
                <Link
                  to="/produto/codorc"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i class="bi bi-file-earmark-pdf" style={{ fontSize: '26px' }}></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Orçamentos:
                  </span>
                </Link>
              </li>

              <li className="w-100" onClick={logout}>
                <Link to="/"
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
          <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue' }}>
            <h4><strong>Sistema de Gestão Comercial:</strong></h4>
          </div>
          <Outlet /><br />
          <div className='justify-content-center align-items-center'><br /><br /><br />
            <div className='bg-white p-4 rounded border' style={{ width: '45%', margin: '0 400px' }}>
              <h4><center><strong>Cadastrar novo Resultado:</strong></center></h4><br />
              <form action='' onSubmit={cadastrar}>
                <div className='mb-3'>
                  <label htmlFor='entradas' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Total de Entradas:</label>
                  <input type='decimal' onKeyUp={MostraEntradas} placeholder='Entre com o total:' style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='entradas' id='entradas' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='saidas' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Total de Saídas:</label>
                  <label htmlFor='resultado' style={{ fontSize: '20px', margin: '0 42px', fontWeight: 'bold' }}>Resultado:</label>
                  <input type='decimal' onKeyUp={MostraSaidas} placeholder='Entre com o total:' style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='saidas' id='saidas' />
                  <input type='decimal' style={{ fontSize: '20px', width: 200, margin: '0 415px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='resultado' id='resultado' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='mes' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Mês:</label>
                  <select style={{ fontSize: '20px', width: 150, margin: '0 115px', color: 'navy', fontWeight: 'bold' }} name='mes' id='mes' className='form-select' value={mes} onChange={e => meschange(e.target.value)}>
                    <option value=""></option>
                    <option value="Janeiro">Janeiro</option>
                    <option value="Fevereiro">Fevereiro</option>
                    <option value="Março">Março</option>
                    <option value="Abril">Abril</option>
                    <option value="Maio">Maio</option>
                    <option value="Junho">Junho</option>
                    <option value="Julho">Julho</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Setembro">Setembro</option>
                    <option value="Outubro">Outubro</option>
                    <option value="Novembro">Novembro</option>
                    <option value="Dezembro">Dezembro</option>
                  </select>
                </div>

                <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 120px', fontSize: '16px' }}>Cadastrar:</button>

                <ToastContainer />
              </form>
                   <button className='btn btn-primary border rounded-0' onClick={calcResult} style={{ width: 100, margin: '0 230px', marginTop: '-63px', fontSize: '16px' }}>Total:</button>
              <Link to='/resultado' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 -215px', marginTop: '-65px', fontSize: '16px', width: 100 }}>Voltar:</Link><br />

            </div>
            <div><br />
              <div style={{ margin: '0 500px' }}>
                <label htmlFor="buscaentradas" className="Entradas" style={{ fontFamily: 'arial', fontSize: '20px', fontWeight: 'bold', margin: '0 -80px' }}>Busca por entradas:</label>
                <label htmlFor="buscasaidas" className="Saidas" style={{ fontFamily: 'arial', fontSize: '20px', fontWeight: 'bold', margin: '0 300px' }}>Busca por saidas:</label><br />
                <input type="search" value={buscaentrada} onChange={e => setBuscaEntrada(e.target.value)} className="form-control rounded-0" style={{ fontFamily: 'arial', fontSize: '20px', fontWeight: 'bold', color: 'navy', margin: '0 -78px', width: '40%' }} />
                <input type="search" value={buscasaida} onChange={e => setBuscaSaida(e.target.value)} className="form-control rounded-0" style={{ fontFamily: 'arial', fontSize: '20px', fontWeight: 'bold', color: 'navy', margin: '0 329px', width: '40%', marginTop: '-44px' }} /> <br />
                <button className='btn order rounded-0' style={{ width: 100, fontSize: '16px', backgroundColor:'red', color:'white', margin:'0 330px'}} onClick={somar}>Total:</button><br /><br /><br /><br />
                <h4 style={{color:'navy', fontWeight:'bold'}}>Entradas:</h4> 
                <h4 style={{color:'navy', fontWeight:'bold', margin:'0 750px', marginTop:'-40px'}}>Saidas:</h4>

              </div><br />
              <div style={{ display: 'flex' }}>
                <table className="table" id="table" style={{fontFamily: 'arial', fontSize: '20px', width:'35%', margin:'0 300px'}} >
                  <thead>
                    <tr>
                      <th className="th" scope="col">Nome:</th>
                      <th className="th" scope="col">Total:</th>
                      <th className="th" scope="col">Ação:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table.map(item => (
                        <tr key={item.id}>
                           <td className="td" style={{color:'green', fontWeight:'bold'}}>{item.nome}</td>
                           <td className="td" style={{color:'green', fontWeight:'bold'}} id='total'>{item.total}</td> 
                           <td className="td">
                            <button className="inserir"  onClick={() => {handleInsert(item.total)}} style={{color:'white', backgroundColor:'orange', border:'none', borderRadius:'5px'}}>Inserir:</button>
                            <button className="excluir" onClick={() => { DeleteEntradas(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                          </td> 
                        </tr>
                      ))
                    }           
                             

                  </tbody>                  
                
                </table>
                <table className="table" id="table" style={{fontFamily: 'arial', fontSize: '20px', width:'30%', margin:'0 -220px'}} >
                  <thead>
                    <tr>
                      <th className="th" scope="col">Nome:</th>
                      <th className="th" scope="col">Total:</th>
                      <th className="th" scope="col">Ação:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table2.map(item => (
                        <tr key={item.id}>
                           <td className="td" style={{color:'red', fontWeight:'bold'}}>{item.nome}</td>
                           <td className="td" style={{color:'red', fontWeight:'bold'}}>{item.total}</td> 
                            <td className="td">
                            <button className="excluir" onClick={() => { DeleteSaidas(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                          </td> 
                        </tr>
                      ))
                    }       
                          

                  </tbody>                  
             
                </table>

              </div><br /><br />
               <div style={{ display: 'flex' }}>                 
                 <button className='btn order rounded-0' onClick={DeleteAllInputs} style={{ width: 120, fontSize: '16px', backgroundColor:'red', color:'white', margin:'0 310px'}} >Excluir Tudo:</button>
                 <button className='btn order rounded-0' onClick={DeleteAllOutputs} style={{ width: 120, fontSize: '16px', backgroundColor:'red', color:'white', margin:'0 305px'}} >Excluir Tudo:</button>
               </div>

            </div><br />


          </div>


        </div>
      </div>
    </div>

  )
}

export default CadResultado