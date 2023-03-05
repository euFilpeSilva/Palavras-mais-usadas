const fs = require("fs");
const path = require("path");

function lerDiretorio(caminho) {
  return new Promise((resolve, reject) => {
    try {
      let arquivos = fs.readdirSync(caminho);
      arquivos = arquivos.map(arquivo => path.join(caminho, arquivo));
      resolve(arquivos);
    } catch (e) {
      reject(e);
    }
  });
}

function elementosTerminadosCom(array, padrao) {
  return array.filter(el => el.endsWith(padrao));
}

function lerArquivo(caminho) {
  return new Promise((resolve, reject) => {
    try{
        const conteudo = fs.readFileSync(caminho, { encoding: "utf-8" });
        resolve(conteudo.toString())
    }catch(e){
        reject(e);
    }
  });
}

function lerArquivos(caminhos) {
    return Promise.all(caminhos.map(caminho => lerArquivo(caminho)));
}

function removerSeVazio(array) {
  return array.filter(el => el.trim());
}

function removerSeIncluir(array, padraoTextual) {
  return array.filter(el => !el.includes(padraoTextual));
}
// trim() tira os espços em brancco
function removerSeApenasNumero(array) { 
    return array.filter(el => {
        const num = parseInt(el.trim());
        return num !== num;
    });
}

function mesclarConteudos (array){
     conteudos => conteudos.join('\n');
}


function removerSimbolos(simbolos) {
    return function(array) {
        return array.map(el => {
            let textoSemSimbolos = el;
            simbolos.forEach(simbolo => {
                textoSemSimbolos = textoSemSimbolos.split(simbolo).join("");
            });
            return textoSemSimbolos;
        });
    }
}

function ordenarPorAtributoNumerico(attr, ordem = 'asc') {
    return function(array) {
        const asc = (o1, o2) => o1[attr] - o2[attr];
        const desc = (o1, o2) => o2[attr] - o1[attr];
        return array.sort(ordem === 'asc' ? asc : desc);
    }
}

module.exports = {
  lerDiretorio,
  lerArquivo,
  lerArquivos,
  elementosTerminadosCom,
  removerSeVazio,
  removerSeIncluir,
  removerSeApenasNumero,
  removerSimbolos,
  mesclarConteudos,
  ordenarPorAtributoNumerico
};
