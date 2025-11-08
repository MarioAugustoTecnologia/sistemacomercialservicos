import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadOrcVenda = () => {


  const { pcod } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod).then((res) => {
      return res.json();
    }).then((resp) => {
      Idchange(resp.id);
      nomechange(resp.nome);
      precochange(resp.preco);    
      

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, Idchange] = useState("")  
  const [nome, nomechange] = useState("")
  const [preco, precochange] = useState("") 
  const [quant, quantchange] = useState("")
  const [orcn, orcnchange] = useState("")
  const [desc, descchange] = useState("") 
 

  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"


    if (nome === null || nome === '') {
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (quant === null || quant === '') {
      document.getElementById('quant').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (document.getElementById('total').value === null || document.getElementById('total').value === '') {

      document.getElementById('total').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }


    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }


  function calcular() {

    const total = (quant * preco).toFixed(2);
    console.log(total)
    document.getElementById('total').value = total;
    document.getElementById('total').style.borderColor = 'GainsBoro';


  }

  function desconto() {

    var total = document.getElementById('total').value;

    const desconto = (desc * total).toFixed(2);
    console.log(desconto)
    document.getElementById('valordesc').value = desconto;

    const novototal = total - desconto;
    document.getElementById('totaldesc').value = (novototal).toFixed(2);

  }


  const cadastrar = (e) => {

    e.preventDefault();

    var total = document.getElementById('total').value;

    if (orcn !== null || orcn !== "") {

      if (desc === null || desc === "") {

        const valordesc = 0;
        const totaldesc = total;

        if (isValidate()) {

          const cadobj = { orcn, nome, quant, preco, total, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                orcnchange('');
                navigate('/produto/codorc');
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }

      } else {

        if (isValidate()) {

          const valordesc = document.getElementById('valordesc').value;
          const desconto = (desc * 100) + '%';
          const totaldesc = document.getElementById('totaldesc').value;
          const cadobj = { orcn, nome, quant, preco, total, desconto, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                navigate('/produto/codorc');

              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }
      }
    } else {

      if (desc === null || desc === "") {

         const valordesc = 0;
         const totaldesc = total;

        if (isValidate()) {

          const cadobj = { orcn, nome, quant, preco, total, totaldesc, valordesc }

           Swal.fire({
             title: "Deseja salvar ?",
             showDenyButton: true,
             showCancelButton: true,
             confirmButtonText: "Salvar",
             denyButtonText: `Não salvar`
           }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                orcnchange('');
                navigate('/produto/codorc');
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }

      } else {

        if (isValidate()) {

          const valordesc = document.getElementById('valordesc').value;
          const desconto = (desc * 100) + '%';
          const totaldesc = document.getElementById('totaldesc').value;
          const cadobj = { orcn, nome, quant, preco, total, desconto, valordesc, totaldesc }

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                navigate('/produto/codorc');

              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })
            }
          });
        }
      }
     
    };
  }      
    


  function mudacorquant() {

    document.getElementById('quant').style.borderColor = 'Gainsboro';

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
          <Outlet /><br /><br />
          <div className='d-flex justify-content-center align-items-center vh-90'>
            <div className='bg-white p-4 rounded border' style={{ width: '61%' }}>
              <h4><center><strong>Cadastrar Orçamento de Venda:</strong></center></h4><br />
              <form action='' onSubmit={cadastrar}>
               <div className='mb-3'>
                 <label htmlFor="orcn" style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Orçamento n°:</label>
                 <input type='number' value={orcn} onChange={e => orcnchange(e.target.value)} style={{ fontSize: '20px', width: 85, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='ordem' id='ordem' />                
               </div>
                <div className='mb-3'>
                  <label htmlFor='nome' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Nome:</label>
                  <input type='text' placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '20px', width: 560, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='nome' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='qtd' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Quantidade:</label>
                  <label htmlFor='total' style={{ fontSize: '20px', margin: '0 75px', fontWeight:'bold'}}>Total:</label>
                  <label htmlFor='total' style={{ fontSize: '20px', margin:'0 80px', fontWeight:'bold'}}>Desconto:</label>
                  <input type='number' autoFocus={true} onSelect={mudacorquant} value={quant} onChange={e => quantchange(e.target.value)} style={{ fontSize: '20px', width: 85, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='qtd' id='quant' />
                  <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 415px', marginTop: '-42px', color:'navy', fontWeight:'bold'}} className='form-control rounded-0' name='total' id='total' />
                  <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 620px', marginTop: '-42px', color:'navy', fontWeight:'bold'}} className='form-control rounded-0' name='desconto' id='desconto' value={desc} onChange={e => descchange(e.target.value)} />
                </div>
                <div className='mb-3'>
                  <label htmlFor='custo' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Preço/Custo:</label>
                  <label htmlFor='valorpag' style={{ fontSize: '20px', margin: '0 68px', fontWeight:'bold'}}>Valor Desconto:</label>
                  <input type="decimal" value={preco} onChange={e => precochange(e.target.value)} style={{ fontSize: '20px', width: 200, margin: '0 115px' , fontWeight:'bold', color:'navy'}} placeholder='Entre com o custo:' className='form-control rounded-0' name='custo' />
                  <input type="decimal" style={{ fontSize: '20px', width: 150, margin: '0 415px', marginTop: '-42px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='valordesc' id='valordesc' />
                </div>
                <div className='mb-3'>
                <label htmlFor='totaldesc' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Total c/Desconto:</label>
                <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='totaldesc' id='totaldesc' /> 
                </div><br /><br />     
                 
                <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 120px', marginTop: '-19px', fontSize: '16px' }}>Cadastrar:</button>
                <ToastContainer />
              </form>
              <div className='mb3' style={{ margin: '0 242px', marginTop: '-40px' }}>
                <button className='btn btn-primary border rounded-0' onClick={calcular} style={{ width: 100, margin: '0 0px', fontSize: '16px' }}>Total:</button>
                <Link onClick={desconto} className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'Indigo', margin: '0 20px', fontSize: '16px', width: 100 }}>Desconto:</Link>
                <Link to='/produto/codorc' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 2px', fontSize: '16px', width: 100 }}>Voltar:</Link>

              </div>


            </div>
          </div>


        </div>
      </div>
    </div>

  )
}

export default CadOrcVenda