function OrganizadorDeDados(dados){

    const dadosEmArray = dados.split("\n");
    
    return {
        numeroNotificacoes: dadosEmArray.splice(0 , 1),
        arrayAcoes: dadosEmArray
    };

}

function ProcessaDados(array, dado){
    const dadoDivido = dado.split(",");

    const posicao = parseInt(dadoDivido[0]);
    const acao = dadoDivido[1];
    const valor = dadoDivido[2];
    const quantidade = dadoDivido[3];

    switch (acao){
        case "0":{
            if(array[posicao - 1] === undefined){
                array.push({
                    posicao:  String(array.length + 1),
                    valor: valor,
                    quantidade: quantidade
                });
            }else{
                array[posicao - 1 ] = {
                    posicao:  String(posicao),
                    valor: valor,
                    quantidade: quantidade
                };
            }
            
            break;
        }
        case "1":{
            if(array[posicao - 1] != undefined){
                const dadoProcessado =  array[posicao - 1];

                if(parseInt(valor) > 0 ){
                    dadoProcessado.valor = valor;
                }

                if(parseInt(quantidade) > 0 ){
                    dadoProcessado.quantidade = quantidade;
                }
            }
            break;
        }
        case "2":{
            for (let index = posicao; index < array.length; index++) {
                const elemento = array[index];
                elemento.posicao = String(parseInt(elemento.posicao) - 1);              
            }
            array.splice(posicao - 1, 1);
            break;
        }
    }
}

function exibeDados(dadosProcessados){
    const tabela = document.getElementById("container");
    let htmlParaATabela = "";
    let valorParaConsole = "";
    
    for (let index = 0; index < dadosProcessados.length; index++) {
        const dado = dadosProcessados[index];
        htmlParaATabela = htmlParaATabela + ` 
        <tr>
            <td>${dado.posicao}</td>
            <td>${dado.valor}</td>
            <td>${dado.quantidade}</td>
        </tr>
        `;

        if(index + 1 < dadosProcessados.length){
            valorParaConsole = valorParaConsole + `${dado.posicao},${dado.valor},${dado.quantidade}\n`; 
        }else{
            valorParaConsole = valorParaConsole + `${dado.posicao},${dado.valor},${dado.quantidade}`; 
        }
    }

    tabela.innerHTML = htmlParaATabela;
    console.log(valorParaConsole + "\\");
}

function ConfiguraFormulario(arrayDados){
    const spinner = document.getElementById("spinner");
    const button = document.querySelector("button");

    const divPosicao = document.querySelector(".div_posicao");
    const divValor = document.querySelector(".div_valor");
    const divQuantidade = document.querySelector(".div_quantidade");
    
    spinner.addEventListener("change" , () =>{
        switch(spinner.selectedIndex){
            case 1: {
                divPosicao.classList.remove("esconder")
                divPosicao.classList.add("sumir")
                divValor.classList.remove("esconder")
                divQuantidade.classList.remove("esconder")
                break;
            }
            case 2: {
                divPosicao.classList.remove("esconder")
                divPosicao.classList.remove("sumir")
                divValor.classList.remove("esconder")
                divQuantidade.classList.remove("esconder")
                break;
            }case 3:{
                divPosicao.classList.remove("esconder")
                divPosicao.classList.remove("sumir")
                divValor.classList.add("esconder")
                divQuantidade.classList.add("esconder")
                break;
            }
            default:{
                divPosicao.classList.add("esconder")
                divPosicao.classList.remove("sumir")
                divValor.classList.add("esconder")
                divQuantidade.classList.add("esconder")
            }

        }
    });

    button.addEventListener("click" , (ev)=>{
        ev.preventDefault();
        const inputPosicao = divPosicao.querySelector("input");
        const inputValor = divValor.querySelector("input");
        const inputQuantidade = divQuantidade.querySelector("input");
        const validacao = document.querySelector("span");

        if(spinner.selectedIndex != 0){
           switch (spinner.selectedIndex ) {
                case 1:{
                    if(inputValor.value > 0 && inputQuantidade.value > 0){
                        const novoDado = `${arrayDados.length + 1},${spinner.selectedIndex - 1},${inputValor.value},${inputQuantidade.value},`;
                        ProcessaDados(arrayDados,novoDado);
                        exibeDados(arrayDados);
                        validacao.innerHTML = "";
                        inputPosicao.value = "";
                        inputValor.value = "";
                        inputQuantidade.value = "";
                    }else{
                        validacao.innerHTML = "Os campos Valor e Quantidade não pode estar vazio ou ser igual a zero!!";
                    }
                    break;
                }                  
                case 2:{
                    if(inputPosicao.value > 0){
                        const novoDado = `${inputPosicao.value},${spinner.selectedIndex - 1},${inputValor.value},${inputQuantidade.value},`;
                        ProcessaDados(arrayDados,novoDado);
                        exibeDados(arrayDados);
                        validacao.innerHTML = "";
                        inputPosicao.value = "";
                        inputValor.value = "";
                        inputQuantidade.value = "";  
                    }else{
                        validacao.innerHTML = "O campo Posição não pode estar vazio ou ser igual a zero!!";
                    }                        
                    break;
                }
                case 3:{
                    if(inputPosicao.value > 0){
                        const novoDado = `${inputPosicao.value},${spinner.selectedIndex - 1},0,0,`;
                        ProcessaDados(arrayDados,novoDado);
                        exibeDados(arrayDados);
                        validacao.innerHTML = "";
                        inputPosicao.value = "";
                        inputValor.value = "";
                        inputQuantidade.value = "";  
                    }else{
                        validacao.innerHTML = "O campo Posição não pode estar vazio ou ser igual a zero!!";
                    }                         
                    break;
                }
            }  
        }else{
            validacao.innerHTML = "Escolha uma ação!!";
        }
    });

    
}

function InterpretaDados(dados){

    const DadosEmObjeto = OrganizadorDeDados(dados);

    let arrayDadosProcessados = [];

    //poderia fazer só DadosEmObjeto.arrayAcoes.length mas eu queria fazer uso do primeiro valor :).
    for (let index = 0; index < parseInt(DadosEmObjeto.numeroNotificacoes); index++) {
        const dadoAtual = DadosEmObjeto.arrayAcoes[index];
        ProcessaDados(arrayDadosProcessados, dadoAtual);    
    }

    exibeDados(arrayDadosProcessados);

    return arrayDadosProcessados; 
}


let inputDados = "12\n" + "1,0,15.4,50\n" + "2,0,15.5,50\n" + "2,2,0,0\n" + "2,0,15.4,10\n" + "3,0,15.9,30\n" +  
"3,1,0,20\n" + "4,0,16.50,200\n" + "5,0,17.00,100\n" + "5,0,16.59,20\n" + "6,2,0,0\n" +"1,2,0,0\n" + "2,1,15.6,0";
const dadosProcessados = InterpretaDados(inputDados);
ConfiguraFormulario(dadosProcessados);



