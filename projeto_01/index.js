const path = require('path');
const fn = require('./funcoes');

const caminho = path.join(__dirname, "..", 'dados', 'legendas');

const simbolos = [
    '.', '?', '-', ',', '"', '♪',
    '_', '<i>', '</i>', '\r', '[', ']',
    '(', ')'
]

const mesclarConteudos = conteudos => conteudos.join(' ');
const separandoPalavras = texto => texto.split(' ');

function agruparPalavras(palavras) {
    return Object.values(palavras.reduce((acc, palavra) => {
        const el = palavra.toLowerCase();
        const qtde = acc[el] ? acc[el].qtde + 1 : 1;
        acc[el] = { elemento: el, qtde };
        return acc;
    }, {}));
}

fn.lerDiretorio(caminho)
// filtrando arquivos .srt
    .then(arquivos => fn.elementosTerminadosCom(arquivos, '.srt'))
    //lendo arquivos
    .then(arquivosSTR => fn.lerArquivos(arquivosSTR))
     // mescllar conteudos
    .then(conteudos => conteudos.join('\n'))
    // separando as linhas
    .then(todoConteudo => todoConteudo.split('\n'))
    //removendo linhas vazias
    .then(linhas => fn.removerSeVazio(linhas))
    //removendo linhas que contem '-->'
    .then(linhas => fn.removerSeIncluir(linhas, '-->'))
    //removendo linhas que contem numeros
    .then(linhas => fn.removerSeApenasNumero(linhas))
    //removendo simbolos
    .then(fn.removerSimbolos(simbolos))
    // mescllar conteudos
    .then(mesclarConteudos)
    //separando as palavras
    .then(separandoPalavras)
    // agrupando palavras
    .then(linhas => fn.removerSeVazio(linhas))
        .then(linhas => fn.removerSeApenasNumero(linhas))
    .then(agruparPalavras)
        // ordenando as palavras
    .then(fn.ordenarPorAtributoNumerico('qtde', 'desc'))
    .then(console.log)