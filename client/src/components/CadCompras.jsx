import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const CadCompras = () => {

  const { pcod } = useParams();

  useEffect(() => {
    fetch("https://sistemacomercialservicos.onrender.com/produtos/" + pcod).then((res) => {
      return res.json();
    }).then((resp) => {
      Idchange(resp.id);
      nomechange(resp.nome);
      custochange(resp.custo)
      qtdchange(resp.qtd);

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [id, Idchange] = useState("")
  const [nome, nomechange] = useState("")
  const [estoque, qtdchange] = useState("")
  const [custo, custochange] = useState("")
  const [formapag, formapagchange] = useState("")
  const [forname, fornamechange] = useState([])
  const [datacad, datacadchange] = useState("")
  const [quant, quantchange] = useState("")
  const [parcelamento, parcelamentochange] = useState("")
  const [parcela, parcelachange] = useState("")
  const [parcelan, parcelanchange] = useState("")
  const [compradata, setCompradata] = useState([])
  const [mescompraatual, setMesCompraAtual] = useState([])
  const [vf, vfchange] = useState("")


  const navigate = useNavigate();


  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/compraatual").then((res) => {

      return res.json()

    }).then((resp) => {

      setCompradata(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])

  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/mescompraatual").then((res) => {

      return res.json()

    }).then((resp) => {

      setMesCompraAtual(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, [])


  useEffect(() => {
    fetch("https://sistemacomercialservicos.onrender.com/fornecedor").then((res) => {

      return res.json()

    }).then((resp) => {

      fornamechange(resp)

    }).catch((err) => {
      console.log(err.message)
    })
  }, [])

  const [values, setValues] = useState({
    id: ''
  })


  const isValidate = () => {
    let isproceed = true
    let errormessage = "Campos não podem estar vazio  !"

    if (nome === null || nome === '') {
      document.getElementById('nome').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }
    if (custo === null || custo === '') {
      document.getElementById('custo').style.borderColor = 'red';
      isproceed = false
      // errormessage += 'Email:' 
    }

    if (quant === null || quant === '') {
      document.getElementById('qtd').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }
    if (document.getElementById('total').value === null || document.getElementById('total').value === '') {
      document.getElementById('total').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (document.getElementById('forname').value === null || document.getElementById('forname').value === '') {
      document.getElementById('forname').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (datacad === null || datacad === '') {
      document.getElementById('datacad').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Telefone:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }



  function mudacorNome() {

    document.getElementById('nome').style.borderColor = 'Gainsboro';

  }

  function mudacorqtd() {

    document.getElementById('qtd').style.borderColor = 'Gainsboro';

  }

  function mudacorCusto() {

    document.getElementById('custo').style.borderColor = 'Gainsboro';

  }

  function mudacorData() {

    document.getElementById('datacad').style.borderColor = 'Gainsboro';

  }
  function mudacorFrete() {

    document.getElementById('vf').style.borderColor = 'Gainsboro';

  }

  function MudaCorValorPag() {

    document.getElementById('valorpago').style.borderColor = 'Gainsboro';

  }


  function calcular() {

    if (custo == '') {
      toast.warning('Campo custo em branco !')
      document.getElementById('custo').style.borderColor = 'red';

    } else {

      const custo = parseFloat(document.getElementById('custo').value);
      const total = (quant * custo).toFixed(2);
      console.log(total)
      document.getElementById('total').value = total;
      document.getElementById('total').style.borderColor = 'Gainsboro';

    }


  }

  const IsValidate2 = () => {

    let isproceed = true
    let errormessage = "Campo frete não pode estar vazio  !"

    if (vf === null || vf === '') {
      document.getElementById('vf').style.borderColor = 'red';
      isproceed = false
      //errormessage += 'Nome Completo:' 
    }

    if (!isproceed) {
      toast.warning(errormessage)
    }

    return isproceed
  }


  function totalFrete() {

    if (IsValidate2()) {

      var total = document.getElementById('total').value;
      var tfrete = (parseFloat(total) + parseFloat(vf)).toFixed(2);
      document.getElementById('totalfrete').value = tfrete;
      document.getElementById('valorpago').value = tfrete;
      document.getElementById('total').style.borderColor = 'Gainsboro';

    }

  }

  const cadastrar = (e) => {

    e.preventDefault();

    if (isValidate()) {

      if (parcelamento === "" || parcelamento === null && parcela === "" || parcela === null && parcelan === "" || parcelan === null) {

        if (document.getElementById('vf').value !== "" && document.getElementById('totalfrete').value !== '' && document.getElementById('valorpago').value !== '') {

          const dataInput = datacad;
          const data = new Date(dataInput);
          const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
          var total = parseFloat(document.getElementById('total').value).toFixed(2);
          var totalfrete = parseFloat(document.getElementById('totalfrete').value).toFixed(2)
          var fornecedor = document.getElementById('forname').value;
          var compran = document.getElementById('compran').innerHTML;
          var mes = document.getElementById('mescompraatual').innerHTML;
          var valorpagto = parseFloat(document.getElementById('valorpago').value).toFixed(2);
          var vp = valorpagto;
          var vf = parseFloat(document.getElementById('vf').value).toFixed(2)
          var custo = parseFloat(document.getElementById('custo').value).toFixed(2);
          var qtd = document.getElementById('qtd').value;    

          if (valorpagto > totalfrete) {

            const t = parseFloat((valorpagto - totalfrete).toFixed(2));
            const troco = (t).toFixed(2)
            valorpagto = parseFloat(valorpagto).toFixed(2);

            const cadobj = { compran, nome, qtd, custo, total, data_cad, formapag, mes, fornecedor, troco, valorpagto, totalfrete, vf, vp }

            Swal.fire({
              title: "Deseja salvar ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              denyButtonText: `Não salvar`
            }).then((result) => {

              if (result.isConfirmed) {

                fetch("https://sistemacomercialservicos.onrender.com/compras", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(cadobj)
                }).then((res) => {
                  toast.success('Cadastrado com Sucesso !')
                  function Add() {
                    return parseInt(estoque) + parseInt(quant);
                  }

                  const qtd = Add();

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


                }).catch((err) => {
                  toast.error('Erro ! :' + err.message)
                })

              } else if (result.isDenied) {
                Swal.fire("Nada salvo", "", "info");
              }
            });


          } else
            if (valorpagto === totalfrete) {

              const cadobj = { compran, nome, qtd, custo, total, data_cad, formapag, mes, fornecedor, valorpagto, totalfrete, vf, vp }

              if (isValidate()) {

                Swal.fire({
                  title: "Deseja salvar ?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Salvar",
                  denyButtonText: `Não salvar`
                }).then((result) => {

                  if (result.isConfirmed) {

                    fetch("https://sistemacomercialservicos.onrender.com/compras", {
                      method: "POST",
                      headers: { 'content-type': 'application/json' },
                      body: JSON.stringify(cadobj)
                    }).then((res) => {
                      toast.success('Cadastrado com Sucesso !')
                      function Add() {
                        return parseInt(estoque) + parseInt(quant);
                      }

                      const qtd = Add();

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


                      document.getElementById('qtd').style.borderColor = 'Gainsboro';

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
        else {

          const dataInput = datacad;
          const data = new Date(dataInput);
          const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
          var total = parseFloat(document.getElementById('total').value).toFixed(2);
          var fornecedor = document.getElementById('forname').value;
          var compran = document.getElementById('compran').innerHTML;
          var mes = document.getElementById('mescompraatual').innerHTML;
          var custo = parseFloat(document.getElementById('custo').value).toFixed(2);
          const valorpagto = 0;
          vp = total;
          var qtd = document.getElementById('qtd').value;

          const cadobj = { compran, nome, qtd, custo, total, data_cad, mes, fornecedor, valorpagto, vp }

          if (isValidate()) {

            Swal.fire({
              title: "Deseja salvar ?",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Salvar",
              denyButtonText: `Não salvar`
            }).then((result) => {

              if (result.isConfirmed) {

                fetch("https://sistemacomercialservicos.onrender.com/compras", {
                  method: "POST",
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify(cadobj)
                }).then((res) => {
                                   
                  function Add() {
                    return parseInt(estoque) + parseInt(quant);
                  }
                  const qtd = Add();

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

        var compran = document.getElementById('compran').innerHTML;
        var mes = document.getElementById('mescompraatual').innerHTML;
        const dataInput = datacad;
        const data = new Date(dataInput);
        const data_cad = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        const fornecedor = document.getElementById('forname').value;
        const total = parseFloat(document.getElementById('total').value).toFixed(2);
        const totalfrete = parseFloat(document.getElementById('totalfrete').value).toFixed(2);
        var vf = parseFloat(document.getElementById('vf').value).toFixed(2);
        var custo = parseFloat(document.getElementById('custo').value).toFixed(2);
        var qtd = document.getElementById('qtd').value;

        const valorpagto = (totalfrete / parcela).toFixed(2);
        vp = valorpagto;

        const cadobj = { compran, nome, qtd, custo, total, data_cad, valorpagto, formapag, parcelamento, parcelan, mes, fornecedor, totalfrete, vf, vp }

        if (isValidate()) {

          Swal.fire({
            title: "Deseja salvar ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Salvar",
            denyButtonText: `Não salvar`
          }).then((result) => {

            if (result.isConfirmed) {

              fetch("https://sistemacomercialservicos.onrender.com/compras", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(cadobj)
              }).then((res) => {
                toast.success('Cadastrado com Sucesso !')
                function Add() {
                  return parseInt(estoque) + parseInt(quant);
                }

                const qtd = Add();

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
          <Outlet /><br /><br />
          <div className='d-flex justify-content-center align-items-center vh-90'>
            <div className='bg-white p-4 rounded border' style={{ width: '45%' }}>
              <h4><center><strong>Cadastrar Compra:</strong></center></h4><br />
              <form action='' onSubmit={cadastrar}>
                <div className='mb-3'>
                  <label htmlFor='compran' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Compra nº:</label>
                  <table className="table" style={{ fontFamily: 'arial', fontSize: '20px', width: '5%', margin: '0 120px' }}>
                    <thead hidden='true'>
                      <tr>
                        <th className="th" scope="col" >Id:</th>
                        <th className="th" scope="col">Compra nº:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        compradata.map(item => (
                          <tr key={item.id}>
                            <td className="td" hidden='true'>{item.id}</td>
                            <td className="td" style={{ fontSize: '20px', fontWeight:'bold', color:'navy'}} id='compran'>{item.numero}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className='mb-3'>
                  <label htmlFor='nome' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Nome:</label>
                  <input type='text' onKeyUp={mudacorNome} placeholder='Entre com o nome:' value={nome} onChange={e => nomechange(e.target.value)} style={{ fontSize: '20px', width: 540, margin: '0 115px', fontWeight:'bold', color:'navy'}} className='form-control rounded-0' name='nome' id='nome' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='qtd' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Quantidade:</label>
                  <label htmlFor='total' style={{ fontSize: '20px', margin: '0 75px', fontWeight:'bold' }}>Total:</label>
                  <input type='number' onKeyUp={mudacorqtd} onSelect={mudacorqtd} value={quant} onChange={e => quantchange(e.target.value)} style={{ fontSize: '20px', width: 90, margin: '0 115px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='qtd' id='qtd' />
                  <input type='decimal' style={{ fontSize: '20px', width: 150, margin: '0 415px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='total' id='total' />
                </div>
                <div className='mb-3'>
                  <label htmlFor='custo' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Custo:</label>
                  <label htmlFor='valorpag' style={{ fontSize: '20px', margin: '0 120px', fontWeight:'bold' }}>Total c/Frete:</label>
                  <input type="decimal" value={custo} onChange={e => custochange(e.target.value)} onKeyUp={mudacorCusto} style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight:'bold', color:'navy'}} placeholder='Entre com o custo:' className='form-control rounded-0' name='custo' id='custo' />
                  <input type="decimal" style={{ fontSize: '20px', width: 150, margin: '0 415px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='totalfrete' id='totalfrete' /> <br />
                  <label htmlFor='vf' style={{ fontSize: '20px', margin: '0 124px', fontWeight:'bold' }}>Frete:</label>
                  <label htmlFor='valorpago' style={{ fontSize: '20px', margin: '0 120px', fontWeight:'bold' }}>Valor Pago:</label>
                  <input type="decimal" onKeyUp={mudacorFrete} value={vf} onChange={e => vfchange(e.target.value)} style={{ fontSize: '20px', width: 200, margin: '0 115px', fontWeight:'bold', color:'navy' }} placeholder='Entre com o frete:' className='form-control rounded-0' name='vf' id='vf' />
                  <input type="decimal" onKeyDown={MudaCorValorPag} style={{ fontSize: '20px', width: 150, margin: '0 420px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='valorpago' id='valorpago' /> <br />
                </div>
                <div className='mb-3'>
                  <label htmlFor='parcela' style={{ fontSize: '20px', margin: "0 415px", fontWeight:'bold' }}>Parcelamento:</label>
                  <select value={parcelamento} onChange={e => parcelamentochange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 415px', marginTop: '-1px', fontWeight:'bold', color:'navy'}} className='form-select' name='parcela' id='parcela'>
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
                </div>
                <div className='mb-3'>
                  <label htmlFor='formapag' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Forma de Pagamento:</label>
                  <label htmlFor='parcela' style={{ fontSize: '20px', marginLeft: '-12px', fontWeight:'bold' }}>Parcelas:</label>
                  <select style={{ fontSize: '20px', width: 130, margin: '0 115px', fontWeight:'bold', color:'navy' }} name='formapag' id='formapag' className='form-select' value={formapag} onChange={e => formapagchange(e.target.value)}>
                    <option value=""></option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">Pix</option>
                    <option value="Débito">Débito</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Boleto">Boleto</option>
                  </select>
                  <select value={parcela} onChange={e => parcelachange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 415px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-select' name='parcela' id='parcela'>
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
                  <label htmlFor='datapag' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold'}}>Data de Cadastro:</label>
                  <label htmlFor='parcelan' style={{ fontSize: '20px', marginLeft: '20px', fontWeight:'bold' }}>Parcela:</label>
                  <input type='date' onKeyUp={mudacorData} onSelect={mudacorData} value={datacad} onChange={e => datacadchange(e.target.value)} style={{ fontSize: '20px', width: 190, margin: '0 115px', fontWeight:'bold', color:'navy' }} className='form-control rounded-0' name='datacad' id='datacad' />
                  <select value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ fontSize: '20px', width: 120, margin: '0 415px', marginTop: '-42px', fontWeight:'bold', color:'navy' }} className='form-select' name='parcelan' id='parcela'>
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
                </div>
                <div className='mb-3'>
                  <label htmlFor='mes' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Mês:</label>
                  <table className="table" style={{ fontFamily: 'arial', fontSize: '20px', width: '5%', margin: '0 120px' }}>
                    <thead hidden='true'>
                      <tr>
                        <th className="th" scope="col" >Id:</th>
                        <th className="th" scope="col">Venda nº:</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        mescompraatual.map(item => (
                          <tr key={item.id}>
                            <td className="td" hidden='true'>{item.id}</td>
                            <td className="td" style={{ fontSize: '20px', fontWeight:'bold', color:'navy' }} id='mescompraatual'>{item.mes}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>

                </div>
                <div className='mb-3'>
                  <label htmlFor='formapag' style={{ fontSize: '20px', margin: '0 115px', fontWeight:'bold' }}>Fornecedor:</label>
                  <select style={{ fontSize: '20px', width: 420, margin: '0 115px', fontWeight:'bold', color:'navy' }} id='forname' className='form-select' onChange={(e) => setValues({ ...values, id: e.target.value })}>
                    <option></option>
                    {forname.map(val => {
                      return <option value={val.nome}>{val.nome}</option>
                    })}
                  </select>
                </div>
                <div className='mb-3'>
                  <button type='submit' className='btn btn-success border rounded-0' style={{ width: 100, margin: '0 115px', fontSize: '16px' }}>Cadastrar:</button>
                  <Link className="btn border rounded-0" onClick={totalFrete} style={{ color: 'white', backgroundColor: 'gray', margin: '0 36px', fontSize: '16px', width: 115 }}>Total c/frete:</Link>

                </div>
                <ToastContainer />
              </form>
              <button className='btn btn-primary border rounded-0' onClick={calcular} style={{ width: 100, margin: '0 240px', marginTop: '-94px', fontSize: '16px' }}>Total:</button>
              <Link to='/produtos/codigo' className="btn border rounded-0" style={{ color: 'white', backgroundColor: 'orange', margin: '0 510px', marginTop: '-140px', fontSize: '16px', width: 100 }}>Voltar:</Link>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CadCompras