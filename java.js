let previousNumber = ""
let nextNumber = ""
let operacao = ""


const $tela = document.querySelector(".tela")
const $btns = document.querySelectorAll("[data-number]")
const $operacaoButao = document.querySelectorAll("[data-operator]")
const $equalsButton = document.querySelector("[data-equals]") 
const $clearButton = document.querySelector("[data-clear]")
const $deleteButton = document.querySelector("[data-delete]") 



function clearAll() {
    previousNumber = ""
    nextNumber = ""
    operacao = ""
    updateTela()
}

function deleteNumber() {
    if (nextNumber !== "") {
        
        nextNumber = nextNumber.slice(0, -1)
    } else if (operacao !== "") {
        
        operacao = ""
    } else {
        
        previousNumber = previousNumber.slice(0, -1)
    }
    updateTela()
}


function appendNumber(number) {
    if (operacao === "") {
        if (previousNumber.includes(".") && number === ".") return
        
        if (previousNumber === "0" && number !== ".") previousNumber = "" 
        previousNumber = previousNumber + number
    } else {
        if (nextNumber.includes(".") && number === ".") return
        if (nextNumber === "0" && number !== ".") nextNumber = "" 
        nextNumber = nextNumber + number
    }

    updateTela()
}

function updateTela() {
    
    if (previousNumber === "" && operacao === "") {
        $tela.innerHTML = "0"
    } else if (operacao === "") {
        $tela.innerHTML = previousNumber
    } else {
        
        let displayOperacao = operacao === '/' ? '&#247;' : operacao
        
        let displayNext = nextNumber === "" ? "" : nextNumber
        $tela.innerHTML = `${previousNumber} ${displayOperacao} ${displayNext}`
    }
}

function escolherOperacao(operator) {
    if (previousNumber === "") return

    if (nextNumber !== "") {
        calcular()
    }

    if (operator === 'x') {
        operacao = '*'
    } else if (operator === '÷') {
        operacao = '/'
    } else {
        operacao = operator
    }

    updateTela()
}
    
    
    operacao = operator === 'x' ? '*' : operator
    operacao = operator === '&#247;' ? '/' : operacao 

    updateTela()
}

function calcular() {
    let resultado

    const numAnterior = parseFloat(previousNumber)
    const numAtual = parseFloat(nextNumber)

    if (isNaN(numAnterior) || isNaN(numAtual)) return

    switch (operacao) {
        case '+':
            resultado = numAnterior + numAtual
            break
        case '-':
            resultado = numAnterior - numAtual
            break
        case '*':
            resultado = numAnterior * numAtual
            break
        case '/':     
            if (numAtual === 0) {
                alert("Divisão por zero não é permitida!")
                clearAll()
                return
            }
            resultado = numAnterior / numAtual
            break
        default:
            return
    }

    previousNumber = resultado.toString()
    operacao = ""
    nextNumber = ""

    updateTela()
}




$btns.forEach(button => {
    button.addEventListener("click", () => appendNumber(button.dataset.number))
})

$operacaoButao.forEach(button => {
    button.addEventListener("click", () => escolherOperacao(button.dataset.operator))
})


if ($equalsButton) {
    $equalsButton.addEventListener("click", () => calcular())
}


if ($clearButton) {
    $clearButton.addEventListener("click", () => clearAll())
}


if ($deleteButton) {
    $deleteButton.addEventListener("click", () => deleteNumber())
}


updateTela()
