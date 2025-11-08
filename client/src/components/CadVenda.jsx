import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadVenda = () => {

  const { pcod } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod).then((res) => {
      return res.json();
    }).then((resp) => {
      Idchange(resp.id);
      nomechange(resp.nome);
      precochange(resp.preco);
      qtdchange(resp.qtd);

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, Idchange] = useState("")
  const [nome, nomechange] = useState("")
  const [preco, precochange] = useState("")
  const [formapag, formapagchange] = useState("")
  const [estoque, qtdchange] = useState("")
  const [quant, quantchange] = useState("")
  const [parcelamento, parcelamentochange] = useState("")
  const [parcela, parcelachange] = useState("")
  const [parcelan, parcelanchange] = useState("")
  const [entradadata, setEntradadata] = useState([])
  const [mesatual, setMesAtual] = useState([])
  const [categoria, setCategoria] = useState('')

  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/atual").then((res) => {

      return res.json()

    }).then((resp) => {

      setEntradadata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])



  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/mesatual").then((res) => {

      return res.json()

    }).then((resp) => {

      setMesAtual(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  const isValidate2 = () => {

    let isproceed = true
    let errormessage = "Campo(s) não pode(m) estar vazio  !"

    if (document.getElementById('desconto').value === null || document.getElementById('desconto').value === '') {
      document.getElementById('desconto').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (document.getElementById('total').value === null || document.getElementById('total').value === '') {
      document.getElementById('total').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      document.getElementById('preco').style.borderColor = 'red';
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
    
    if (categoria ===  "" || categoria === null) {

      document.getElementById('categoria').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }

  const isValidate3 = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (preco === null || preco === '') {
      document.getElementById('preco').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (quant === null || quant === '') {
      document.getElementById('quant').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }


  function calcular() {

    if (isValidate3()) {

      const total = (quant * preco).toFixed(2);
      console.log(total)
      document.getElementById('total').value = total;
       document.getElementById('total').style.borderColor = 'GainsBoro';

    }



  }

  function desconto() {

    if (isValidate2()) {

      var total = document.getElementById('total').value;
      var desc = document.getElementById('desconto').value;

      const desconto = parseFloat(desc * total).toFixed(2);
      console.log(desconto)
      const novototal = total - desconto;
      document.getElementById('totaldesc').value = novototal;
      document.getElementById('valordesc').value = desconto;
      document.getElementById('desconto').value = (desc * 100) + '%';
      document.getElementById('valorpago').value = 0;

    }

  }

  function formataData() {
    let data = new Date(),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function MudaCorDesc() {
    document.getElementById('desconto').style.borderColor = 'GainsBoro'
  } 

    function MudaCorCat() {
    document.getElementById('categoria').style.borderColor = 'GainsBoro'
  } 


  const cadastrar = (e) => {

    e.preventDefault();  
    

    if (isValidate()) {

      if (parcelamento === "" || parcelamento === null && parcela === "" || parcela === null && parcelan === "" || parcelan === null) {

        if (document.getElementById('desconto').value !== "" && document.getElementById('totaldesc').value !== '' && document.getElementById('valorpago').value !== '' && document.getElementById('valordesc').value !== '') {

          const data_cad = formataData();
          var total = parseFloat(document.getElementById('total').value).toFixed(2);
          var totaldesc = parseFloat(document.getElementById('totaldesc').value).toFixed(2)
          var vendan = document.getElementById('vendan').innerHTML;
          var mes = document.getElementById('mesatual').innerHTML;
          var valorpagto = parseFloat(document.getElementById('valorpago').value).toFixed(2);
          var desconto = document.getElementById('desconto').value;
          var valordesc = parseFloat(document.getElementById('valordesc').value).toFixed(2);
          var vp = valorpagto;

          if (valorpagto > totaldesc) {

            const t = parseFloat((valorpagto - totaldesc).toFixed(2));
            const troco = (t).toFixed(2)
            valorpagto = parseFloat(valorpagto).toFixed(2);

            const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, troco, valorpagto, totaldesc, desconto, valordesc, vp, categoria }

            Swal.fire({
              title: "Deseja salvar ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              denyButtonText: `Não salvar`
            }).then((result) => {

              if (result.isConfirmed) {

                fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(cadobj)

                }).then((res) => {
                 
                   if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                        toast.success('Cadastrado com Sucesso !')

                    }else{
                       toast.success('Cadastrado com Sucesso !') 
                    }                   

                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })

              } else if (result.isDenied) {
                Swal.fire("Nada salvo", "", "info");
              }
            });

          } else
            if (valorpagto == 0) {

              vp = totaldesc;

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, totaldesc, desconto, valordesc, vp, categoria }

              if (isValidate()) {

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não salvar`
                }).then((result) => {

                  if (result.isConfirmed) {

                    fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                      method: "POST",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(cadobj)
                    }).then((res) => {
                      if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                         navigate('/produtos/codigo')

                    }else{
                   
                        navigate('/produtos/codigo')
                    }                   
                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                    

                  } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                  }
                });

              }

            } else if(valorpagto === totaldesc){


              vp = totaldesc;

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, totaldesc, desconto, valordesc, vp, categoria }

              if (isValidate()) {

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não salvar`
                }).then((result) => {

                  if (result.isConfirmed) {

                    fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                      method: "POST",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(cadobj)
                    }).then((res) => {
                      if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })                      
                       toast.success('Cadastrado com Sucesso !')

                    }else{

                       toast.success('Cadastrado com Sucesso !')
                   
                    }                   
                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                    

                  } else if (result.isDenied) {
                    Swal.fire("Nada salvo", "", "info");
                  }
                });

              }
            }

        } else
          if (document.getElementById('desconto').value === "" && document.getElementById('totaldesc').value === '' && document.getElementById('valorpago').value !== '' && document.getElementById('valordesc').value === '') {


            const data_cad = formataData();
            var total = parseFloat(document.getElementById('total').value).toFixed(2);
            var vendan = document.getElementById('vendan').innerHTML;
            var mes = document.getElementById('mesatual').innerHTML;
            var valorpagto = parseFloat(document.getElementById('valorpago').value).toFixed(2);
            vp = valorpagto;            

            if (valorpagto > total) {

              const t = parseFloat((valorpagto - total).toFixed(2));
              const troco = (t).toFixed(2)
              valorpagto = parseFloat(valorpagto).toFixed(2);

              const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, troco, valorpagto, vp, categoria }

              Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
              }).then((result) => {

                if (result.isConfirmed) {

                  fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cadobj)
                  }).then((res) => {

                     if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                        toast.success('Cadastrado com Sucesso !')

                    }else{
                       toast.success('Cadastrado com Sucesso !') 
                    }                   

                  }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                  })

                } else if (result.isDenied) {
                  Swal.fire("Nada salvo", "", "info");
                }
              });

            } else
              if (valorpagto === total) {

                const cadobj = { vendan, nome, quant, preco, total, data_cad, formapag, mes, valorpagto, vp, categoria }

                if (isValidate()) {

                  Swal.fire({
                    title: "Deseja salvar ?",
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: "Salvar",
                    denyButtonText: `Não salvar`
                  }).then((result) => {

                    if (result.isConfirmed) {

                      fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                        method: "POST",
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify(cadobj)
                      }).then((res) => {
                         if(categoria === "Produtos"){

                            function Subtract() {
                              return estoque - quant;
                            }
                             const qtd = Subtract();
                             const edtobj = { id, qtd }

                       fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                         method: "PATCH",
                         headers: { 'content-type': 'application/json' },
                         body: JSON.stringify(edtobj)
                       }).then((res) => {
                         console.log(qtd);

                        }).catch((err) => {
                           toast.error('Erro ! :' + err.message)
                         })
                           toast.success('Cadastrado com Sucesso !')

                        }else{
                           toast.success('Cadastrado com Sucesso !') 
                        }                   
                        }).catch((err) => {
                            toast.error('Erro ! :' + err.message)
                        })

                    } else if (result.isDenied) {
                        Swal.fire("Nada salvo", "", "info");
                  }
                 });
                 }
              }

          } else if (document.getElementById('desconto').value === "" && document.getElementById('totaldesc').value === '' && document.getElementById('valorpago').value === '' && document.getElementById('valordesc').value === '') {


            var total = parseFloat(document.getElementById('total').value).toFixed(2);
            var vendan = document.getElementById('vendan').innerHTML;
            var mes = document.getElementById('mesatual').innerHTML;
            const data_cad = formataData();
            const valorpagto = 0;
            vp = total;

            const cadobj = { vendan, nome, quant, preco, total, data_cad, mes, valorpagto, vp, categoria }

            if (isValidate()) {

              Swal.fire({
                title: "Deseja salvar ?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`
              }).then((result) => {

                if (result.isConfirmed) {

                  fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                    method: "POST",
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(cadobj)
                  }).then((res) => {
                     
                    if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                    navigate('/produtos/codigo')

                    }else{
                    navigate('/produtos/codigo')  
                    }                   

                  }).catch((err) => {
                    toast.error('Erro ! :' + err.message)
                  })

                } else if (result.isDenied) {
                  Swal.fire("Nada salvo", "", "info");
                }
              });
            }
          }

      } else {

        var vendan = document.getElementById('vendan').innerHTML;    
        var data_cad = formataData()
        var total = parseFloat(document.getElementById('total').value).toFixed(2);
        var parcelas = parcela;       
        var valorpagto = (total / parcelas).toFixed(2);
        vp = valorpagto;
        var mes = document.getElementById('mesatual').innerHTML;

        const cadobj = { vendan, nome, quant, preco, total, valorpagto, parcelamento, parcelan, formapag, mes, data_cad, vp, categoria }

        if (isValidate()) {

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/vendas", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {

                  if(categoria === "Produtos"){

                       function Subtract() {
                      return estoque - quant;
                    }
                    const qtd = Subtract();
                    const edtobj = { id, qtd }

                    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod, {
                      method: "PATCH",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(edtobj)
                    }).then((res) => {
                      console.log(qtd);

                    }).catch((err) => {
                      toast.error('Erro ! :' + err.message)
                    })
                        toast.success('Cadastrado com Sucesso !')

                    }else{
                       toast.success('Cadastrado com Sucesso !') 
                    }                   
                
              }).catch((err) => {
                toast.error('Erro ! :' + err.message)
              })

            } else if (result.isDenied) {
              Swal.fire("Nada salvo", "", "info");
            }
          });

        }
      }

    }

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
            <div className='bg-white p-4 rounded border' style={{ width: '80%' }}>
              <h4><center><strong>Cadastrar Venda:</strong></center></h4><br />
              <form action='' onSubmit={cadastrar}>
                <div className='mb-3'>
                  <label htmlFor='compran' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Venda nº:</label>
                  <table className="table" style={{ fontFamily: 'arial', fontSize: '20px', width: '5%', margin: '0 120px' }}>
                    <thead hidden='true'>
                      <tr>
                        <th className="th" scope="col" >Id:</th>
                        <th className="th" scope="col">Venda nº:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        entradadata.map(item => (
                          <tr key={item.id}>
                            <td className="td" hidden='true'>{item.id}</td>
                            <td className="td" style={{ fontSize: '20px', fontWeight:'bold', color:'navy'}} id='vendan'>{item.numero}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className='d-flex'>
                   <label htmlFor='nome' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Nome:</label>
                   <label htmlFor='categoria' style={{ fontSize: '20px', margin: '0 380px', fontWeight:'bold'}}>Categoria:</label>
                </div>
                <div className='d-flex'>
                  <input type='text' placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '20px', width: 510, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='nome' />
                  <select onMouseDown={MudaCorCat} style={{ fontSize: '20px', width: 166, fontWeight:'bold', color:'navy', margin:'0 -69px' }} className='form-select' value={categoria} onChange={e => setCategoria(e.target.value) } id='categoria'>
                     <option value=""></option>
                      <option value="Produtos">Produtos</option>  
                     <option value="Serviços">Serviços</option>                   
                  </select>
                </div><br />           
               <div className='mb-3'>
                  <label htmlFor='qtd' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Quantidade:</label>
                  <label htmlFor='total' style={{ fontSize: '20px', margin: '0 -50px', fontWeight:'bold' }}>Total:</label>
                  <label htmlFor='totaldesc' style={{ fontSize: '20px', margin: '0 200px', fontWeight:'bold' }}>Total c/Desconto:</label>
                  <label htmlFor='desconto' style={{ fontSize: '20px', margin: '0 -160px', fontWeight:'bold' }}>Desconto:</label>
                  <input type='number' autoFocus={true} onSelect={mudacorquant} value={quant} onChange={e => quantchange(e.target.value)} style={{ fontSize: '20px', width: 85, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='qtd' id='quant' />
                  <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 300px', marginTop: '-43px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='total' id='total' />
                  <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 500px', marginTop: '-43px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='totaldesc' id='totaldesc' />
                  <input type='text' onKeyDown={MudaCorDesc} style={{ fontSize: '20px', width: 150, margin: '0 700px', marginTop: '-43px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='desconto' id='desconto' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='preco' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Preço/ Custo:</label>
                  <label htmlFor='valorpag' style={{ fontSize: '20px', margin: '0 25px', fontWeight:'bold'}}>Valor Pago:</label>
                  <label htmlFor='valordesc' style={{ fontSize: '20px', margin: '0 50px', fontWeight:'bold'}}>Valor Desconto:</label>
                  <input type="decimal" value={preco} onChange={e => precochange(e.target.value)} style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight:'bold', color:'navy'}} placeholder='Entre com o custo:' className='form-control rounded-0' name='custo' />
                  <input type="decimal" style={{ fontSize: '20px', width: 150, margin: '0 380px', marginTop: '-42px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='valorpago' id='valorpago' />
                  <input type="decimal" style={{ fontSize: '20px', width: 150, margin: '0 570px', marginTop: '-42px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='valordesc' id='valordesc' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='formapag' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Forma de Pagamento:</label>
                  <label htmlFor='parcelamento' style={{ fontSize: '20px', margin: '0 -47px', fontWeight:'bold'}}>Parcelamento:</label>
                  <label htmlFor='parcelan' style={{ fontSize: '20px', margin: '0 80px', fontWeight:'bold'}}>Parcela n°:</label>
                  <label htmlFor='parcelas' style={{ fontSize: '20px', margin: '0 -10px', fontWeight:'bold' }}>Parcelas:</label>
                  <select style={{ fontSize: '20px', width: 130, margin: '0 115px', marginTop: '0px', fontWeight:'bold', color:'navy' }} name='formapag' id='formapag' className='form-select' value={formapag} onChange={e => formapagchange(e.target.value)}>
                    <option value=""></option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">Pix</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Boleto">Boleto</option>
                  </select>
                  <select value={parcelamento} onChange={e => parcelamentochange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 392px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-select' name='parcela' id='parcela'>
                    <option value=""></option>
                    <option value="2x">2x</option>
                    <option value="3x">3x</option>
                    <option value="4x">4x</option>
                    <option value="5x">5x</option>
                    <option value="6x">6x</option>
                    <option value="7x">7x</option>
                    <option value="8x">8x</option>
                    <option value="9x">9x</option>
                    <option value="10x">10x</option>
                    <option value="11x">11x</option>
                    <option value="12x">12x</option>
                  </select>
                  <select value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 550px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-select' name='parcelan' id='parcela'>
                    <option value=""></option>
                    <option value="1ª">1ª</option>
                    <option value="2ª">2ª</option>
                    <option value="3ª">3ª</option>
                    <option value="4ª">4ª</option>
                    <option value="5ª">5ª</option>
                    <option value="6ª">6ª</option>
                    <option value="7ª">7ª</option>
                    <option value="8ª">8ª</option>
                    <option value="9ª">9ª</option>
                    <option value="10ª">10ª</option>
                    <option value="11ª">11ª</option>
                    <option value="12ª">12ª</option>
                  </select>
                  <select value={parcela} onChange={e => parcelachange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 730px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-select' name='parcela' id='parcela'>
                    <option value=""></option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label htmlFor='mes' style={{ fontSize: '20px', margin: '0 120px', fontWeight:'bold' }}>Mes:</label>
                  <table className="table" style={{ fontFamily: 'arial', fontSize: '20px', width: '5%', margin: '0 120px', fontWeight:'bold', color:'navy' }}>
                    <thead hidden='true'>
                      <tr>
                        <th className="th" scope="col" >Id:</th>
                        <th className="th" scope="col">Venda nº:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        mesatual.map(item => (
                          <tr key={item.id}>
                            <td className="td" hidden='true'>{item.id}</td>
                            <td className="td" style={{ fontSize: '20px', fontWeight:'bold', color:'navy' }} id='mesatual'>{item.mes}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div><br /><br />

                <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 120px', marginTop: '-19px', fontSize: '16px' }}>Cadastrar:</button>
                <ToastContainer />
              </form>
              <div className='mb3' style={{ margin: '0 242px', marginTop: '-40px' }}>
                <button className='btn btn-primary border rounded-0' onClick={calcular} style={{ width: 100, margin: '0 0px', fontSize: '16px' }}>Total:</button>
                <Link onClick={desconto} className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'Indigo', margin: '0 20px', fontSize: '16px', width: 100 }}>Desconto:</Link>
                <Link to='/produtos/codigo' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 2px', fontSize: '16px', width: 100 }}>Voltar:</Link>

              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

  )
}

export default CadVenda