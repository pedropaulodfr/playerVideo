const salvarParametros = (propriedade, valor) => {
    if (typeof window !== "undefined") { 
        var propriedade = String(propriedade)
        var valor = String(valor)
        var parametros = localStorage.getItem("params")
    
        if (parametros != undefined) {
            let parametrosJSON = JSON.parse(parametros); // Converte a string em um array manipulável
            
            // Verifica se já existe um objeto com a propriedade
            const propriedadeIndex = parametrosJSON.findIndex(param => param.hasOwnProperty(propriedade));
      
            if (propriedadeIndex !== -1) {
                // Atualiza o valor da propriedade, se já existir
                parametrosJSON[propriedadeIndex][propriedade] = valor;
            } else {
                // Adiciona um novo objeto caso não exista
                parametrosJSON.push({ [propriedade]: valor });
            }
      
            // Atualiza o localStorage com o array modificado
            localStorage.setItem("params", JSON.stringify(parametrosJSON));
        }
    }
}

const pegarParametro = (parametro) => {
    if (typeof window !== "undefined") {
        var parametro = String(parametro)
    
        var parametros = localStorage.getItem("params")
    
        if(parametros != undefined) {
            let parametrosJSON = JSON.parse(parametros)
    
            const parametroIndex = parametrosJSON.findIndex(param => param.hasOwnProperty(parametro))
    
            if(parametroIndex !== -1) {
                return parametrosJSON[parametroIndex][parametro]
            } else {
                return null
            }
        }
    }
}

const lightColors = () => {
    return [
        {"primaria": "#EDF0F1", "secundaria": "#BEC3C7"}
    ]
}

const darkColors = () => {
    return [
        {"primaria": "#324456", "secundaria": "#394F64"}
    ]
}

const formatarTempo = (tempoSegundos) => {
    const minutos = Math.floor(tempoSegundos / 60);
    const segundos = Math.floor(tempoSegundos % 60);
    return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}

export default {salvarParametros, pegarParametro, lightColors, darkColors, formatarTempo}