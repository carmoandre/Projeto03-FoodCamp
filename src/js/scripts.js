let selectedCounter = 0;
//let selectedsByRow = ["Não há selecionado", "Não há selecionado", "Não há selecionado"];


function colorBorder(options, position) {
    if (options.classList.contains("greenBorder") && options.classList.contains(position)) {
        options.classList.remove("greenBorder");
        selectedCounter--;
        verifyButtonChange(position);
        return;
    }

    if (options.classList.contains("greenBorder") ) {
        options.classList.remove("greenBorder");
        selectedCounter--;
    }

    if (options.classList.contains(position)) {
        options.classList.add("greenBorder");
        selectedCounter++;
        verifyButtonChange(position);
    }

    
}

function showCheckmark(options, position) {
    if (!options.classList.contains("hiddingClass") && options.classList.contains(position)) {
        options.classList.add("hiddingClass");
        return;
    }

    if (!options.classList.contains("hiddingClass") ) {
        options.classList.add("hiddingClass");
    }

    if (options.classList.contains(position)) {
        options.classList.remove("hiddingClass");
    }
}

function selectionManager(itens, icons, position) {
    [].forEach.call(itens, (e)=>{colorBorder(e, position)});
    [].forEach.call(icons, (e)=>{showCheckmark(e, position)});
}

function selectUnicOption(position, rowClass) {
    const itemRow = document.querySelectorAll(rowClass);
    const iconRow = document.querySelectorAll(rowClass + " ion-icon");
    selectionManager(itemRow, iconRow, position);
}

function verifyButtonChange(position){
    const orderButton = document.querySelector(".bottomBarButton");
    if (selectedCounter === 3) {
        orderButton.disabled = false;
        orderButton.classList.add("enabledButton");
        orderButton.innerHTML = "Fechar pedido";
        
    } else {  
        if (orderButton.classList.contains("enabledButton")) {
            orderButton.disabled = true;
            orderButton.classList.remove("enabledButton");
            orderButton.innerHTML = "Selecione os 3 itens para fechar o pedido";
        }
    }
}

function callConfirmationScreen() {
    document.querySelector(".confimationScreen").classList.remove("hiddingClass");
}

function cancelModalAction() {
    document.querySelector(".confimationScreen").classList.add("hiddingClass");
}