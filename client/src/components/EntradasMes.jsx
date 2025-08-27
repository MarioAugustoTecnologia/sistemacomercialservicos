import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import "bootstrap-icons/font/bootstrap-icons.css";


const EntradasMes = () => {


  const [vendasmes, setVendasmes] = useState([]);
  const [buscames, setBuscaMes] = React.useState("")
  const [mes, setMes] = useState("");

  const buscarap = buscames.toLowerCase()

  var table = vendasmes.filter(item => item.mes.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("http://localhost:3000/vendas").then((res) => {

      return res.json()

    }).then((resp) => {

      setVendasmes(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  const handleDelete = (id) => {

    Swal.fire({
      title: "Deseja Excluir ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Excluir",
      denyButtonText: `Não Excluir`
    }).then((result) => {

      if (result.isConfirmed) {


        fetch("http://localhost:3000/vendas/" + id, {

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

  function formataData() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function somar() {

    if (buscames === "" || buscames === null) {
      toast.warning('Campo busca por mês vazio !')

    } else {

      let valores = [];

      table.map(item => {
        valores.push(item.valorpagto)
      })

      let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
        return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
      })

      const nome = 'Total das entradas no mes de  '  +   buscames;
      const total = soma.toFixed(2);
      const data_cad = formataData();
      const preco = 0;
      const vendan = "0";
      const mes = buscames;
      const troco = 0;
      const valorpagto = 0;
 

      const cadobj = { nome, total, preco, mes, vendan, troco, valorpagto, data_cad }
    

      fetch("http://localhost:3000/vendas", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cadobj)
      }).then((res) => {
        //toast.success('Cadastrado com Sucesso !') 
        window.location.reload();

      }).catch((err) => {
        toast.error('Erro ! :' + err.message)
      })

        const cadobj2 = { nome, total }

        fetch("http://localhost:3000/entradas", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(cadobj2)
      }).then((res) => {
        //toast.success('Cadastrado com Sucesso !') 
        window.location.reload();

      }).catch((err) => {
        toast.error('Erro ! :' + err.message)
      })

    }
  }

  const cadastrar = (e) => {
  
      e.preventDefault();
  
      const cadobj = { mes }    
  
        Swal.fire({
          title: "Deseja salvar ?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          denyButtonText: `Não salvar`
        }).then((result) => {
  
          if (result.isConfirmed) {
  
            fetch("http://localhost:3000/mesatual", {
              method: "POST",
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(cadobj)
            }).then((res) => {
              toast.success('Cadastrado com sucesso !')              
  
            }).catch((err) => {
              toast.error('Erro ! :' + err.message)
            })
          }
          else if (result.isDenied) {
            Swal.fire("Nada salvo", "", "info");
          }
        })
      
    }  

  const logout = () => {
    localStorage.clear()
    console.clear();

  }

  const navigate = useNavigate()

  const handleEdit = (id) => {
    
   navigate('/entradas/numero/editar/' + id) 
    
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
          <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', width: '160%' }}>
            <h4><strong>Sistema de Gestão Comercial</strong></h4>
          </div>
          <Outlet />
          <div className="px-5 mt-5">
            <form action="" onSubmit={cadastrar} >
              <div className="mb3">
              <label htmlFor="Mes" className="Mes" style={{ fontFamily: 'arial', fontSize: '22px', fontWeight:'bold'}}>Busca por mes:</label>
              <label htmlFor="Mes" className="Mes" style={{ fontFamily: 'arial', fontSize: '22px', margin: '0 500px', fontWeight:'bold' }}>Mes atual:</label><br />
              <input type="search" autoFocus='true' className="consultames" value={buscames} onChange={(e) => setBuscaMes(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', fontWeight:'bold', color:'navy' }} />
              <Link to="/entradas" className="btn btn-success" style={{ fontSize: '18px', width: '140px', margin: '0 20px' }}>Voltar:</Link>
              <Link onClick={somar} className="btn" style={{ color: 'white', backgroundColor: 'gray', margin: '0 5px', fontSize: '18px' }}>Total Entradas:</Link>
              <select value={mes} onChange={e => setMes(e.target.value)} style={{ fontSize: '20px', width: 160, margin:'0 650px', marginTop:'-40px', fontWeight:'bold', color:'navy' }} name='mes' id='mes' className='form-select'>
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
               <button type="submit" className="btn btn-success" style={{margin:'0 840px', fontSize:'18px', marginTop:'-69px'}}>Cadastrar:</button>
              <Link to="/mesatual" className="btn btn-primary" style={{ fontSize: '18px', width: '140px', margin: '0 980px', marginTop:'-114px' }}>Mes atual:</Link>
              </div>
             </form>
             <br />
             <h4 style={{ textAlign: 'center', color: 'Red', fontSize: '25px', margin: '0 980px' }}><strong>Entradas:</strong></h4>
             <br />
             <div className="mt-3">
              <table className="table" id="table" style={{ margin: '0 -30px', fontFamily: 'arial', fontSize: '20px', width: 3000 }}>
               <thead>
                    <tr>
                      <th className="th" scope="col">Id:</th>
                      <th className="th" scope="col">Venda nº:</th>
                      <th className="th" scope="col">Nome:</th>
                      <th className="th" scope="col">Qtd:</th>
                      <th className="th" scope="col">Preço:</th>
                      <th className="th" scope="col">Total:</th>
                      <th className="th" scope="col">Desconto:</th>
                      <th className="th" scope="col">Valor Desconto:</th>
                      <th className="th" scope="col">Total c/Desconto:</th>
                      <th className="th" scope="col">Forma Paga:</th>
                      <th className="th" scope="col">Entradas:</th>
                      <th className="th" scope="col">Troco:</th>                    
                      <th className="th" scope="col">Parcelamento:</th>
                      <th className="th" scope="col">Parcela:</th>
                      <th className="th" scope="col">Mês:</th>          
                      <th className="th" scope="col">Data de Cadastro:</th>
                       <th className="th" scope="col">Categoria:</th>
                      <th className="th" scope="col">Ação:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      table.map(item => (
                        <tr key={item.id}>
                          <td className="td">{item.id}</td>
                          <td className="td">{item.vendan}</td>
                          <td className="td">{item.nome}</td>
                          <td className="td">{item.quant}</td>
                          <td className="td">{item.preco}</td>
                          <td className="td">{item.total}</td>
                          <td className="td">{item.desconto}</td>
                          <td className="td">{item.valordesc}</td>
                          <td className="td">{item.totaldesc}</td>
                          <td className="td">{item.formapag}</td>
                          <td className="td">{item.valorpagto}</td>
                          <td className="td">{item.troco}</td>              
                          <td className="td">{item.parcelamento}</td>
                          <td className="td">{item.parcelan}</td>
                          <td className="td">{item.mes}</td>                  
                          <td className="td">{item.data_cad}</td>
                          <td className="td">{item.categoria}</td>
                          <td className="td" >
                          <button className="editar" onClick={() => { handleEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Editar:</button>  
                          <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                          </td>
                        </tr>
                      ))

                    }

                  </tbody>
                    <ToastContainer />
              </table>
            </div>
            <br />

          </div>

        </div>

      </div>
    </div>
  )
}

export default EntradasMes