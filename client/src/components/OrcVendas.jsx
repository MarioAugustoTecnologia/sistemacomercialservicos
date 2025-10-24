import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import generatePDF, { Margin } from 'react-to-pdf';


const OrcVendas = () => {

  const [orcvendas, setOrcVendas] = useState([])
  const [desconto, setDesconto] = useState("");
  const [obs, setObs] = useState("")

  useEffect(() => {

    fetch("https://sistemacomercialservicos.onrender.com/orcvenda").then((res) => {

      return res.json()

    }).then((resp) => {

      setOrcVendas(resp)

    }).catch((err) => {
      console.log(err.message)
    })

  }, []) 


  function somar() {  

    if(desconto === ''){

      let valores = [];

      orcvendas.map(item => {
      valores.push(item.total)
    })
    //console.log(valores)

    let soma = valores.reduce((previous_value, current_value) => {      
      return parseFloat(previous_value) + parseFloat(current_value);    
    })
  
    const nome = 'Total Geral:';
    const total = soma.toFixed(2);    

    const cadobj = { nome, total }

    fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj)
    }).then((res) => {

      window.location.reload();                    

    }).catch((err) => {
      toast.error('Erro ! :' + err.message)
    })    

    }else{

      let valores = [];

      orcvendas.map(item => {
      valores.push(item.total)
    })
    //console.log(valores)

    let soma = valores.reduce((previous_value, current_value) => {       // método que faz a soma
      return parseFloat(previous_value) + parseFloat(current_value);     // converte de string para number
    })

    
      let valores2 = [];

      orcvendas.map(item => {
      valores2.push(item.totaldesc)
    })
    //console.log(valores)

    let soma2 = valores2.reduce((previous_value, current_value) => {     
      return parseFloat(previous_value) + parseFloat(current_value);    
    })

    let valores3 = [];

      orcvendas.map(item => {
      valores3.push(item.valordesc)
    })
    //console.log(valores)

    let soma3 = valores3.reduce((previous_value, current_value) => {     
      return parseFloat(previous_value) + parseFloat(current_value);    
    })
  
    const nome = 'Total Geral:';
    const total = soma.toFixed(2); 

    const totaldesc = soma2.toFixed(2);
    const valordesc = soma3.toFixed(2);

    //const desc = (desconto * 100) + '%';
    const descap = (valordesc/total); 
    const desconto = (valordesc/total * 100).toFixed(2) + "%";      

    const cadobj = { nome, total, totaldesc, descap, valordesc, desconto }

    fetch("https://sistemacomercialservicos.onrender.com/orcvenda", {
      method: "POST",
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(cadobj)
    }).then((res) => {
      window.location.reload();
      //toast.success('Cadastrado com Sucesso !')                       

    }).catch((err) => {
      toast.error('Erro ! :' + err.message)
    })
      
    }    
  }
      

  const navigate = useNavigate()

  const Return = () => {
    navigate('/produto/codorc')

  }

    const DeleteAllOrcs = () => {
    navigate('/orcvendas/excluirtodos')

  }

  const GerarPdf = () => document.getElementById('conteudo');

   
    const personalizacao = {
       method: 'open',
       page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: 'A4',
      // default is 'portrait'
      orientation: 'portrait',
      
   },
   
   
  }

  function Obs(){
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    console.log(dataFormatada); // Exibe a data atual no formato dd/mm/aaaa
    document.getElementById('data').innerHTML = 'Orçamento de:  ' +  dataFormatada;
    document.getElementById('obs').innerHTML = obs;
  }

  function exibedesc() {

      const tabela = document.getElementById("table")
      const linhas = tabela.getElementsByTagName("tr")
        
         for (let i = 0; i < linhas.length; i++) {

          const celulas = linhas[i].getElementsByTagName("td");

           for (let j = 8; j < celulas.length; j++) {

            const valor = celulas[j].innerHTML;

            if (valor !== '0') {

                for (let j = 5; j < celulas.length; j++) {
                     celulas[j].style.color = 'green';
                     celulas[j].style.fontWeight = 'bold';
        
                 }
            
            }       
        
        }
      


  }}

  function Format() {

      const tabela = document.getElementById("table")
      const linhas = tabela.getElementsByTagName("tr")
        
         for (let i = 0; i < linhas.length; i++) {

          const celulas = linhas[i].getElementsByTagName("td");

           for (let j = 1; j < celulas.length; j++) {

            const nome = celulas[j].innerHTML;

            if (nome === 'Total Geral:') {

                 celulas[j].style.fontWeight = 'bold';

                for (let j = 4; j < celulas.length; j++) {
                     
                     celulas[j].style.fontWeight = 'bold';
                     celulas[5].style.fontWeight = 'normal';
                     celulas[6].style.fontWeight = 'normal';
                     celulas[7].style.fontWeight = 'normal';
                     celulas[8].style.fontWeight = 'normal';
        
                }
                
                for (let j = 5; j < celulas.length; j++) {

                   const valor = celulas[j].innerHTML;
                   
                   if (valor !== ""){
                     
                         celulas[j].style.fontWeight = 'bold';
                         celulas[6].style.fontWeight = 'bold';
                         celulas[7].style.fontWeight = 'bold';
                         celulas[8].style.fontWeight = 'bold';

                   }            
        
                 }
            
            }       
        
        }    


  }} 



  return (
    <div className="col p-0 m-0">
      <div id="conteudo"> 
      <div className="p-2 justify-content-center shadow text-white" style={{ backgroundColor: 'blue', fontFamily: 'arial', width: '99%', margin: '0 10px', height: '82px', fontSize:'20px'}}>
        <h4><strong><center>Multicompany Solutions</center></strong></h4>
        <h7><strong><center>Rua Antonio Alves de Souza nº:500 Vila Lageado - Botucatu SP </center></strong></h7>
      </div><br /><br /><br /><br /><br />
      <div className='p2 justify-content-center' style={{ fontFamily: 'arial', color: 'red', margin: '0 220px', fontSize:'24px'}}>
        <h4><strong><center>Orçamento de Venda:</center></strong></h4>
      </div><br /><br /><br /><br />
      <div className="px-5 mt-5" style={{fontFamily:'arial'}}>       
          <div className='mt-3'>
            <table className="table" id="table" style={{ margin: '0 10px', fontFamily: 'arial', fontSize: '20px', width: '100%' }}>
              <thead>
                <tr>        
                  <th className="th" scope="col">Orçamento nº:</th>
                  <th className="th" scope="col">Produto/ Serviço:</th>
                  <th className="th" scope="col">Qtd:</th>
                  <th className="th" scope="col">Preço:</th>
                  <th className="th" scope="col">Total:</th>
                  <th className="th" scope="col">Total c/s Desconto:</th>
                   <th className="th" scope="col">Desc/ Calc:</th>
                  <th className="th" scope="col">Desconto:</th>
                  <th className="th" scope="col">Valor Desconto:</th>        
                                                                               
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
                      <td className="td">{item.desconto}</td>
                      <td className="td">{item.valordesc}</td>                                                         
                                         
                    </tr>
                  ))
                }
              </tbody>         

            </table>
            </div><br /><br /><br />       
            <span style={{fontSize:'20px', fontWeight:'bold', margin:'0 100px'}} id="data"></span>        
            <span style={{fontSize:'20px', fontWeight:'bold', margin:'0 30px'}} id="obs"></span>
          </div>        
                 
         </div>
          <br /><br /><br />
          <button type="button" className="btn border" onClick={exibedesc} style={{ width: 105, margin: '0 5px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'Lime' }}>Desconto:</button>
          <button type="button" className="btn border" onClick={Format} style={{ width: 105, margin: '0 20px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'navy' , color:'white'}}>Destacar:</button>
          <button type="button" className="btn btn-success border" onClick={somar} style={{ width: 100, margin: '0 260px', fontSize: '20px', fontFamily: 'arial' }}>Somar:</button>
          <label htmlFor="desconto" style={{margin:'0 -150px', fontSize:'20px'}}>Desconto:</label>
          <input type="decimal" value={desconto} onChange={e => setDesconto(e.target.value)} style={{margin:'0 154px', width:100, fontSize:'22px', color:'green', fontWeight:'bold'}} />
          <button type="button" className="btn border" onClick={DeleteAllOrcs} style={{ width: 100, margin: '0 -100px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'red', color:'white'}}>Excluir</button>
          <button type="button" className="btn border" onClick={Return} style={{ width: 100, margin: '0 130px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'orange', color:'white'}}>Voltar</button>
          <button type="button" className="btn border" onClick={() => generatePDF(GerarPdf, personalizacao)} style={{ width: 120, margin: '0 -50px', fontSize: '20px', fontFamily: 'arial', backgroundColor:'Crimson', color:'white'}}>Gerar Pdf:</button>
          <input type="text" value={obs} onChange={e => setObs(e.target.value)} style={{margin:'0 154px', width:400, fontSize:'22px', color:'navy', fontWeight:'bold'}} />
          <button type="button" onClick={Obs} className="btn btn-primary" style={{ width: 100, margin: '0 -130px', fontSize: '20px', fontFamily: 'arial'}}>Obs:</button>
         <ToastContainer />  
     
    </div>
  )
}

export default OrcVendas