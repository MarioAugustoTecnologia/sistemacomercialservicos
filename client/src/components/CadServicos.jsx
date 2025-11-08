import React, { useState } from 'react';//5=> Criação do arquivo de Cadastro de Usuarios:
import { Link, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadServicos = () => {

    const [nome, nomechange] = useState("")
    const [custo, custochange] = useState("")  
    const [categoria, categoriachange] = useState("")
    const [qtd, qtdchange] = useState("")
    const [codigo, codigochange] = useState("")    


      function calcular() {

          if (isOk()) {

               const total = (qtd * custo).toFixed(2);
               console.log(total)
               document.getElementById('total').value = total;              

         }
        
        }

    const isValidate = () => {

        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"


        if (nome === null || nome === '') {
            document.getElementById('nome').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Nome Completo:' 
        }
            if (codigo === null || codigo === '') {
            document.getElementById('codigo').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Nome Completo:' 
        }
          if (qtd === null || qtd === '') {
            document.getElementById('qtd').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Nome Completo:' 
        }

        if (custo === null || custo === '') {
            document.getElementById('custo').style.borderColor = 'red';
            isproceed = false
            // errormessage += 'Email:' 
        }
           
            if (categoria === null || categoria === '') {
            document.getElementById('categoria').style.borderColor = 'red';
            isproceed = false
            // errormessage += 'Email:' 
        }  
            
        if (!isproceed) {
            toast.warning(errormessage)

        }

        return isproceed
    }

     const isOk = () => {

        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"
        
        
          if (qtd === null || qtd === '') {
            document.getElementById('qtd').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Nome Completo:' 
         }

        if (custo === null || custo === '') {
            document.getElementById('custo').style.borderColor = 'red';
            isproceed = false
            // errormessage += 'Email:' 
        }
           
        if (!isproceed) {
            toast.warning(errormessage)

        }

        return isproceed
    }

    //console.log(data_cadastro);

    function MudaCorCusto() {
        document.getElementById('custo').style.borderColor = 'Gainsboro'
    }


    function MudaCorNome() {
        document.getElementById('nome').style.borderColor = 'Gainsboro'
    }

    
    function MudaCorCat() {
        document.getElementById('categoria').style.borderColor = 'Gainsboro'
    }

      
    function MudaCorQtd() {
        document.getElementById('qtd').style.borderColor = 'Gainsboro'
    }

    function MudaCorCod() {
        document.getElementById('codigo').style.borderColor = 'Gainsboro'
    }

    function formataData() {
           let data = new Date(),
           dia = data.getDate().toString().padStart(2, '0'),
           mes = (data.getMonth() + 1).toString().padStart(2, '0'),
           ano = data.getFullYear();
          return `${dia}/${mes}/${ano}`;
    }

     const data_cadastro = formataData();

      

    const cadastrar = (e) => {

        e.preventDefault();

        const preco = document.getElementById('total').value;
        const custo = document.getElementById('total').value;      

        const cadobj = { nome, custo, categoria, preco, qtd, codigo, data_cadastro }    

        if (isValidate()) {

            Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
            }).then((result) => {

                if (result.isConfirmed) {             

                    fetch("https://sistemacomercialservicos.onrender.com/produtos", {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(cadobj)
                    }).then((res) => {
                        toast.success('Cadastrado com Sucesso !')
                        nomechange('')
                        custochange('')
                        categoriachange('')
                        qtdchange('');
                        codigochange('')
                        document.getElementById('total').value = null;

                    }).catch((err) => {
                        toast.error('Erro ! :' + err.message)
                    })

                } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                }
            });


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
                    <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', fontFamily: 'arial' }}>
                        <h4><strong>Sistema de Gestão Comercial:</strong></h4>
                    </div>
                    <Outlet /><br />
                    <div className='d-flex justify-content-center align-items-center vh-100'>
                        <div className='bg-white p-4 rounded w-50 border'>
                            <h4><center><strong>Cadastrar Serviço:</strong></center></h4><br />

                            <form action='' onSubmit={cadastrar}>
                                <div className='mb-3'>
                                    <label htmlFor='cod' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Ordem nº:</label>
                                    <input type='text' onKeyUp={MudaCorCod} value={codigo} onChange={e => codigochange(e.target.value)} style={{ fontSize: '20px', width: 100, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='codigo' id='codigo' />
                                </div>

                                <div className='mb-3'>
                                    <label htmlFor='nome' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Nome:</label>
                                    <input type='text' onKeyUp={MudaCorNome} placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '20px', width: 580, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='nome' id='nome' />
                                </div>
                                  <div className='mb-3'>
                                    <label htmlFor='qtd' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Qtd:</label>
                                     <label htmlFor='total' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Total:</label>
                                    <input type='number' onKeyUp={MudaCorQtd} value={qtd} onChange={e => qtdchange(e.target.value)} style={{ fontSize: '20px', width: 100, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='qtd' id='qtd' />
                                    <input type='decimal' style={{ fontSize: '20px', width: 100, margin: '0 380px', marginTop:'-42px' ,fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='total' id='total' />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='custo' style={{ fontSize: '20px', margin: '0 115px', fontWeight: 'bold' }}>Custo:</label>
                                     <label htmlFor='custo' style={{ fontSize: '20px', margin: '0 90px', fontWeight: 'bold' }}>Categoria:</label>
                                    <input type="decimal" onKeyUp={MudaCorCusto} value={custo} onChange={e => custochange(e.target.value)} style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight: 'bold', color: 'navy' }} className='form-control rounded-0' name='custo' id='custo' />
                                      <select onKeyUp={MudaCorCat} style={{ width: 270, margin: '0 380px', marginTop: '-42px', fontSize: '20px', fontWeight:'bold', color:'navy'}} className='form-select' name='categoria' id='categoria' value={categoria} onChange={e => categoriachange(e.target.value)}>
                                         <option value=""></option>
                                         <option value="Serviços">Serviços</option>
                  
                                      </select>
                                </div>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px', fontSize: '16px' }} >Cadastrar:</button>
                                    

                                </div>
                                <ToastContainer />
                            </form>
                                    <button onClick={calcular} className='btn btn-primary border rounded-0' style={{ width: 100, margin: '0 250px', marginTop:'-90px', fontSize: '16px' }} >Total:</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CadServicos