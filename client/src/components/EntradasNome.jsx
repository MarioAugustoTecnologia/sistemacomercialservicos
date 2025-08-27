import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasNome = () => {


  const [vendadata, setVendadata] = useState([]);
  const [buscanome, setBuscaNome] = React.useState("")

  const buscarap = buscanome.toLowerCase();

  var table = vendadata.filter(item => item.nome.toLowerCase().includes(buscarap))


  useEffect(() => {

    fetch("http://localhost:3000/vendas").then((res) => {

      return res.json()

    }).then((resp) => {

      setVendadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  const [mes, setMes] = React.useState("")
  const [categoria, setCategoria] = React.useState("")


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


  function somar() {

    if(buscanome === '' || buscanome === null){
      toast.warning('Campo busca por nome vazio ! ...')
    } else {
      
    const tabela = document.getElementById("table")
    const linhas = tabela.getElementsByTagName("tr")

    let somaTotal = 0;

    if(mes !== '' && categoria === ''){

      for (let i = 0; i < linhas.length; i++) {

            const celulas1 = linhas[i].getElementsByTagName("td");

            for (let k = 15; k < celulas1.length; k++) {

              const valorMes = celulas1[k].innerHTML;

              if (valorMes.toLowerCase() === mes.toLowerCase()) {

                const celulas = linhas[i].getElementsByTagName("td");

                for (let j = 12; j < celulas.length; j++) {

                      const valorCelula = celulas[j].innerHTML;
                      // Converte o valor para número, tratando erros com try/catch
                      try {
                        const numero = Number(valorCelula);

                        if (!isNaN(numero)) { // Verifica se é um número válido
                          somaTotal += numero;
                        } else {
                          console.warn(`Valor não numérico encontrado na célula: ${valorCelula}`);
                        }
                         } catch (error) {
                        console.error("Erro ao converter valor para número:", error);
                        }
                    }                  

                }
            }

        }
         document.getElementById("total").innerText = "R$" + (somaTotal).toFixed(2);

    } else if(mes === '' && categoria !== ''){

      for (let i = 0; i < linhas.length; i++) {

            const celulas1 = linhas[i].getElementsByTagName("td");

            for (let k = 17; k < celulas1.length; k++) {

              const valorCat = celulas1[k].innerHTML;

              if (valorCat.toLowerCase() === categoria.toLowerCase()) {

                const celulas = linhas[i].getElementsByTagName("td");

                for (let j = 12; j < celulas.length; j++) {

                      const valorCelula = celulas[j].innerHTML;
                      // Converte o valor para número, tratando erros com try/catch
                      try {
                        const numero = Number(valorCelula);

                        if (!isNaN(numero)) { // Verifica se é um número válido
                          somaTotal += numero;
                        } else {
                          console.warn(`Valor não numérico encontrado na célula: ${valorCelula}`);
                        }
                      } catch (error) {
                        console.error("Erro ao converter valor para número:", error);
                      }
                    }                  

              }}
            }
              document.getElementById("total").innerText = "R$" + (somaTotal).toFixed(2);

    }
      else if(mes !== '' && categoria !== ''){

       for (let i = 0; i < linhas.length; i++) {

            const celulas1 = linhas[i].getElementsByTagName("td");

            for (let k = 15; k < celulas1.length; k++) {

              const valorMes = celulas1[k].innerHTML;

              if (valorMes.toLowerCase() === mes.toLowerCase()) {

                const celulas = linhas[i].getElementsByTagName("td");

                  for (let l = 17; l < celulas.length; l++) {
                      
                    const valorCat = celulas[l].innerHTML;
                    
                        if (valorCat.toLowerCase() === categoria.toLowerCase()) {

                           for (let j = 12; j < celulas.length; j++) {

                      const valorCelula = celulas[j].innerHTML;
                      // Converte o valor para número, tratando erros com try/catch
                      try {
                        const numero = Number(valorCelula);

                        if (!isNaN(numero)) { // Verifica se é um número válido
                          somaTotal += numero;
                        } else {
                          console.warn(`Valor não numérico encontrado na célula: ${valorCelula}`);
                        }
                      } catch (error) {
                        console.error("Erro ao converter valor para número:", error);
                      }
                    }                  

                 }
               }
            }
                   document.getElementById("total").innerText = "R$" + (somaTotal).toFixed(2);

          }
        }                      

  

      }
    
    }  

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
                  <i class="bi bi-tools" style={{ margin: '0 8px' }}></i>
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
          <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', width: "160%" }}>
            <h4><strong>Sistema de Gestão Comercial</strong></h4>
          </div>
          <Outlet />
          <div className="px-5 mt-5">
            <div className="mb3">
              <label htmlFor="Nome" className="Nome" style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold' }}>Busca por nome:</label><br />
              <input type="search" autoFocus='true' className="consultanome" value={buscanome} onChange={(e) => setBuscaNome(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold', color: 'navy' }} />
              <Link to="/entradas" className="btn btn-success" style={{ fontSize: '18px', width: '140px', margin: '0 20px' }}>Voltar:</Link>
              <Link onClick={somar} className="btn" style={{ color: 'white', backgroundColor: 'gray', margin: '0 25px', fontSize: '18px' }}>Total Entradas:</Link>
              <strong style={{ fontSize: '30px' }}>Total:</strong>
              <strong><span id="total" style={{ color: 'green', fontSize: '32px', margin: '0 10px' }}></span></strong><br />
              <label htmlFor="Mes" className="mes" style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold' }}>Mes:</label>              
              <label htmlFor="categoria" className="categoria" style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold', margin: '0 150px' }}>Categoria:</label>
              <br />
              <input type="text" className="consultames" value={mes} onChange={(e) => setMes(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold', color: 'navy', width: '150px' }} />
              
              <input type="text" className="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold', color: 'navy', width: '150px', margin: '0 43px' }} />
            </div><br />
            <h4 style={{ textAlign: 'center', color: 'Red', fontSize: '25px', marginRight: '-225px' }}><strong>Entradas:</strong></h4>
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
                    <th className="th" scope="col">Faturamento:</th>
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
                        <td className="td" id="vp">{item.vp}</td>
                        <td className="td">{item.parcelamento}</td>
                        <td className="td">{item.parcelan}</td>
                        <td className="td" id="mes">{item.mes}</td>
                        <td className="td">{item.data_cad}</td>
                        <td className="td">{item.categoria}</td>
                        <td className="td" >
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

export default EntradasNome