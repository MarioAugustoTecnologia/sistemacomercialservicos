import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';


const EntradasNumero = () => {


    const [vendanumero, setVendaNumero] = useState([]);
    const [buscanumero, setBuscaNumero] = React.useState("")

    var table = vendanumero.filter(item => item.vendan.includes(buscanumero))


    useEffect(() => {

        fetch("https://sistemacomercialservicos.onrender.com/vendas").then((res) => {

            return res.json()

        }).then((resp) => {

            setVendaNumero(resp)

        }).catch((err) => {
            console.log(err.message)
        })

    }, [])

    const [formapag, formapagchange] = useState("")
    const [parcelamento, parcelamentochange] = useState("")
    const [parcelan, parcelanchange] = useState("")
    const [mes, meschange] = useState("")
    //const [frete, fretechange] = useState("")



    const handleDelete = (id) => {

        Swal.fire({
            title: "Deseja Excluir ?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Excluir",
            denyButtonText: `Não Excluir`
        }).then((result) => {

            if (result.isConfirmed) {

                fetch("https://sistemacomercialservicos.onrender.com/vendas/" + id, {

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

    const navigate = useNavigate();

    const handleEdit = (id) => {

        navigate("/entradas/numero/editar/" + id);

    }

    function formataData() {
        let data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'),
            ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function somar() {

        if (buscanumero === "" || buscanumero === null) {
            toast.warning('Campo busca por número vazio !')
            document.getElementById('vendan').style.borderColor = 'red';

        }
        else {
            let valores = [];

            table.map(item => {
                valores.push(item.total)
            })
            const soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
                return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
            })

            const total = parseFloat(soma).toFixed(2);
            const nome = 'Total da venda nº:' + document.getElementById('vendan').value;
            document.getElementById('total').value = total;
            document.getElementById('nome').value = nome;
            document.getElementById('totalvenda').innerHTML = "R$" + total;
            document.getElementById('total').style.borderColor = 'gainsboro'
            document.getElementById('nome').style.borderColor = 'gainsboro'
            document.getElementById('vp').value = total;

        }
    }


    const isValidate2 = () => {

        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"

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

    function desconto() {

        if (isValidate2()) {

            var total = document.getElementById('total').value;
            var desc = document.getElementById('desconto').value;

            const desconto = parseFloat(desc * total).toFixed(2);
            console.log(desconto)
            const novototal = total - desconto;
            document.getElementById('td').value = (novototal).toFixed(2);
            document.getElementById('vd').value = desconto;
            document.getElementById('desconto').value = (desc * 100).toFixed(2) + '%';
            document.getElementById('totald').innerHTML = "R$" + novototal.toFixed(2)
            document.getElementById('vp').value = (novototal).toFixed(2);         
         

        }
            const serv = document.getElementById('serv').value;

            if(serv !== ''){

               const result = parseFloat(desc * serv).toFixed(2);
               const totalserv = serv - result;
               document.getElementById('serv').value = (totalserv).toFixed(2);
                
             }
    }


    function Troco() {


        if (document.getElementById('vp').value === "" || document.getElementById('vp').value === null) {
            toast.warning('Campo Valor Pago vazio !')
            document.getElementById('vp').style.borderColor = 'Red'

        } else {
            if (document.getElementById('td').value !== "") {

                const troco = parseFloat(document.getElementById('vp').value) - parseFloat(document.getElementById('td').value)
                document.getElementById('troco').value = troco.toFixed(2)
            } else {

                const troco = parseFloat(document.getElementById('vp').value) - parseFloat(document.getElementById('total').value)
                document.getElementById('troco').value = troco.toFixed(2)

            }


        }

    }


    const isValidate = () => {
        let isproceed = true
        let errormessage = "Campos não podem estar vazio  !"


        if (document.getElementById('total').value === null || document.getElementById('total').value === '') {
            document.getElementById('total').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (document.getElementById('nome').value === null || document.getElementById('nome').value === '') {
            document.getElementById('nome').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (document.getElementById('vp').value === null || document.getElementById('vp').value === '') {
            document.getElementById('vp').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (mes === null || mes === '') {
            document.getElementById('mes').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }
        if (formapag === null || formapag === '') {
            document.getElementById('formapag').style.borderColor = 'red';
            isproceed = false
            //errormessage += 'Telefone:' 
        }

        if (!isproceed) {
            toast.warning(errormessage)
        }

        return isproceed
    }


    function GerarUltima() {

        if (buscanumero === "" || buscanumero === null) {
            toast.warning('Campo busca por número vazio !')

        }
        else {
            const numero = buscanumero;
            const register = { numero }

            fetch("https://sistemacomercialservicos.onrender.com/atual", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(register)
            }).then((res) => {
                //window.location.reload();
                toast.success('Cadastrado com Sucesso !')

            }).catch((err) => {
                toast.error('Erro ! :' + err.message)
            })


        }
    }


  const concluir = (e) => {

        e.preventDefault();


        if (isValidate()) {
        

                if (parcelamento === "" || parcelamento === null && parcelan === "" || parcelan === null) {

                    if (document.getElementById('desconto').value !== "" && document.getElementById('td').value !== '' && document.getElementById('vd').value !== '') {

                        const total = parseFloat(document.getElementById('total').value).toFixed(2);
                        const nome = document.getElementById('nome').value;
                        const totaldesc = parseFloat(document.getElementById('td').value).toFixed(2);
                        const vendan = document.getElementById('vendan').value;
                        const valorpagto = parseFloat(document.getElementById('vp').value).toFixed(2);
                        const desconto = document.getElementById('desconto').value;
                        const valordesc = parseFloat(document.getElementById('vd').value).toFixed(2);
                        const data_cad = formataData();
                        const vp = 0;
                        const categoria = 'sem';
                                      

                        if (valorpagto > totaldesc) {

                            const troco = document.getElementById('troco').value;

                            const cadobj = { vendan, total, nome, totaldesc, valorpagto, desconto, valordesc, mes, formapag, troco, data_cad, vp, categoria }

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
                                       window.location.reload();                                   
                                  
                                    }).catch((err) => {
                                        toast.error('Erro ! :' + err.message)
                                    })                                    

                                } else if (result.isDenied) {
                                    Swal.fire("Nada salvo", "", "info");
                                }                                       
                               
                           });

                        } else
                            if (valorpagto === totaldesc) {

                                const cadobj = { vendan, total, nome, totaldesc, valorpagto, desconto, valordesc, mes, formapag, data_cad, vp, categoria }

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
                                           window.location.reload();  
                                            
                                        }).catch((err) => {
                                            toast.error('Erro ! :' + err.message)
                                        })

                                    } else if (result.isDenied) {
                                        Swal.fire("Nada salvo", "", "info");
                                    }

                                });
                            }

                    } else {

                        const total = parseFloat(document.getElementById('total').value).toFixed(2);
                        const nome = document.getElementById('nome').value;
                        const vendan = document.getElementById('vendan').value;
                        const valorpagto = parseFloat(document.getElementById('vp').value).toFixed(2);
                        const data_cad = formataData();
                        const vp = 0; 
                        const categoria = 'sem';                 

                        if (valorpagto > total) {

                            const troco = document.getElementById('troco').value;

                            const cadobj = { vendan, total, nome, valorpagto, mes, formapag, troco, data_cad, vp, categoria }

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
                                        window.location.reload();

                                    }).catch((err) => {
                                        toast.error('Erro ! :' + err.message)
                                    })

                                } else if (result.isDenied) {
                                    Swal.fire("Nada salvo", "", "info");
                                }

                            });

                        } else
                            if (valorpagto === total) {

                                const cadobj = { vendan, total, nome, valorpagto, mes, formapag, data_cad, vp, categoria }

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
                                            window.location.reload();

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

                    const vendan = document.getElementById('vendan').value
                    const nome = document.getElementById('nome').value;
                    const total = parseFloat(document.getElementById('total').value).toFixed(2);
                    const parcelas = document.getElementById("parcelas").value;
                    const formapag = document.getElementById('formapag').value
                    const valorpagto = (total / parcelas).toFixed(2);
                    const data_cad = formataData()
                    const vp = 0;   
                    const categoria = 'sem';                

                    const cadobj = { vendan, nome, total, parcelamento, parcelan, formapag, valorpagto, mes, data_cad, vp, categoria }

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
                                window.location.reload();

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

    function MudaCorCampo() {
        document.getElementById('vendan').style.borderColor = 'Gainsboro'

    }

    function MudaCorDesc() {
        document.getElementById('desconto').style.borderColor = 'Gainsboro'

    }

    function MudaCorForma() {
        document.getElementById('formapag').style.borderColor = 'Gainsboro'

    }

    function MudaCorVp() {
        document.getElementById('vp').style.borderColor = 'Gainsboro'

    }
    function MudaCorMes() {
        document.getElementById('mes').style.borderColor = 'Gainsboro'

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
                                    <i class="bi bi-tools" style={{ margin: '0 8px' }}></i>
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
                    <div className="p-2 d-flex justify-content-center shadow text-white" style={{ backgroundColor: 'blue', width: '160%' }}>
                        <h4><strong>Sistema de Gestão Comercial</strong></h4>
                    </div>
                    <Outlet />
                    <div className="px-5 mt-5">
                        <div className="mb3">
                            <label htmlFor="Numero" className="Numero" style={{ fontFamily: 'arial', fontSize: '22px', fontWeight: 'bold' }}>Busca por numero:</label><br />
                            <input type="search" autoFocus='true' onKeyUp={MudaCorCampo} className="consultanumero" value={buscanumero} onChange={(e) => setBuscaNumero(e.target.value)} style={{ fontFamily: 'arial', fontSize: '22px', width: '100px', fontWeight: 'bold', color: 'navy' }} id="vendan" />
                            <Link to="/entradas" className="btn btn-success" style={{ fontSize: '18px', width: '140px', margin: '0 50px' }}>Voltar:</Link>
                            <Link onClick={GerarUltima} className="btn" style={{ color: 'white', backgroundColor: 'blue', margin: '0 45px', fontSize: '18px' }}>Próxima Venda:</Link>
                            <strong style={{ fontSize: '36px' }}>Total:</strong>
                            <strong><span id="totalvenda" style={{ color: 'LimeGreen', fontSize: '40px', margin: '0 10px' }}></span></strong>
                            <strong style={{ fontSize: '36px', margin: '0 65px' }}>Total c/ Desconto:</strong>
                            <strong><span id="totald" style={{ color: 'Crimson', fontSize: '40px', margin: '0 -60px' }}></span></strong>

                        </div><br />
                        <div className="bg-white p-4 rounded border" style={{ margin: '0 20px', width: '70%' }}>
                            <form onSubmit={concluir}>
                                <label htmlFor="total" style={{ fontSize: '20px', fontFamily: 'arial', fontWeight: 'bold' }} >Total:</label>
                                <label htmlFor='nome' style={{ fontSize: '20px', margin: '0 150px', marginTop: '-50px', fontWeight: 'bold' }}>Nome:</label>
                                <label htmlFor='td' style={{ fontSize: '20px', margin: '0 85px', marginTop: '-50px', fontWeight: 'bold' }}>Total c/Desconto:</label>
                                <label htmlFor='desconto' style={{ fontSize: '20px', margin: '0 -43px', marginTop: '-50px', fontWeight: 'bold' }}>Desconto:</label>
                                <label htmlFor='vd' style={{ fontSize: '20px', margin: '0 134px', marginTop: '-20px', fontWeight: 'bold' }}>Valor Desconto:</label><br />
                                <input type="decimal" className='form-control rounded-0' style={{ width: '13%', height: '42px', fontSize: '20px', fontWeight: 'bold', color: 'navy' }} id="total" />
                                <input type="text" className='form-control rounded-0' style={{ width: '22%', height: '42px', margin: '0 200px', fontSize: '20px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="nome" />
                                <input type="decimal" className='form-control rounded-0' style={{ width: '14%', height: '42px', margin: '0 500px', fontSize: '20px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="td" />
                                <input type="decimal" className="form-control rounded-0" style={{ width: '14%', height: '42px', margin: '0 710px', fontSize: '20px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="desconto" onKeyDown={MudaCorDesc} />
                                <input type="decimal" className="form-control rounded-0" style={{ width: '14%', height: '42px', margin: '0 900px', fontSize: '20px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="vd" /> <br />
                                <label htmlFor="valorpag" style={{ fontSize: '20px', fontFamily: 'arial', fontWeight: 'bold' }} >Valor Pago:</label>
                                <label htmlFor="formapag" style={{ fontSize: '20px', fontFamily: 'arial', margin: '0 95px', fontWeight: 'bold' }} >Forma Paga:</label>
                                <label htmlFor="troco" style={{ fontSize: '20px', fontFamily: 'arial', margin: '0 80px', fontWeight: 'bold' }} >Troco:</label>
                                <label htmlFor="parcelamento" style={{ fontSize: '20px', fontFamily: 'arial', margin: '0 62px', fontWeight: 'bold' }} >Parcelamento:</label>
                                <label htmlFor="parcelan" style={{ fontSize: '20px', fontFamily: 'arial', margin: '0 13px', fontWeight: 'bold' }} >Parcela nº:</label><br />
                                <input type="decimal" onKeyDown={MudaCorVp} className="form-control rounded-0" style={{ width: '14%', height: '42px', fontSize: '20px', fontWeight: 'bold', color: 'navy' }} id="vp" />
                                <select className="form-control rounded-0" onClick={MudaCorForma} value={formapag} onChange={e => formapagchange(e.target.value)} style={{ width: '15%', height: '42px', margin: '0 200px', fontSize: '20px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} name='formapag' id='formapag' >
                                    <option value=""></option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Pix">Pix</option>
                                    <option value="Débito">Débito</option>
                                    <option value="Crédito">Crédito</option>
                                    <option value="Boleto">Boleto</option>
                                </select>
                                <input type="decimal" className="form-control rounded-0" style={{ width: '14%', height: '42px', fontSize: '20px', margin: '0 505px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="troco" />
                                <select className="form-control rounded-0" value={parcelamento} onChange={e => parcelamentochange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '20px', margin: '0 705px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="parcelamento" >
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
                                <select className="form-control rounded-0" value={parcelan} onChange={e => parcelanchange(e.target.value)} style={{ width: '10%', height: '42px', fontSize: '20px', margin: '0 910px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="parcelan" >
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
                                </select><br />
                                <label htmlFor="mes" style={{ fontSize: '20px', fontFamily: 'arial', fontWeight: 'bold' }} >Mes:</label>
                                <label htmlFor="parcelas" style={{ fontSize: '20px', fontFamily: 'arial', margin: '0 465px', fontWeight: 'bold' }} >Parcelas:</label>                                
                                <select onClick={MudaCorMes} style={{ fontSize: '20px', width: 150, fontWeight: 'bold', color: 'navy' }} name='mes' id='mes' className='form-select' value={mes} onChange={e => meschange(e.target.value)}>
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

                                <input type="number" className="form-control rounded-0" style={{ fontSize: '20px', width: 100, margin: '0 505px', marginTop: '-42px', fontWeight: 'bold', color: 'navy' }} id="parcelas" /> <br />                                
                                <button type="submit" className="btn" style={{ color: 'white', backgroundColor: 'green', fontSize: '18px', width: 120 }}>Concluir</button>
                                <ToastContainer />
                            </form>
                        </div><br />
                        <button className="btn" style={{ color: 'white', backgroundColor: 'blue', fontSize: '18px', margin: '0 40px' }} onClick={desconto}>Total c/Desconto:</button>
                        <button className="btn" style={{ color: 'white', backgroundColor: 'orange', fontSize: '18px', margin: '0 5px', width: 120 }} onClick={Troco}>Troco:</button>
                        <button type="submit" onClick={somar} className="btn" style={{ color: 'white', backgroundColor: 'gray', margin: '0 40px', fontSize: '18px' }}>Total Venda:</button>

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
                                                    <button className="editar" onClick={() => { handleEdit(item.id) }} style={{ color: 'white', backgroundColor: 'blue', border: 'none', borderRadius: '5px' }}>Atualizar:</button>
                                                    <button className="excluir" onClick={() => { handleDelete(item.id) }} style={{ color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '5px' }}>Excluir:</button>
                                                </td>
                                            </tr>
                                        ))

                                    }

                                </tbody>
                            </table>
                        </div>
                        <br />


                    </div>


                </div>

            </div>
        </div>
    )
}

export default EntradasNumero