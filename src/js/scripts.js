let selectedCounter = 0;
let selectedMeal = "None";
let selectedDrink = "None";
let selectedDessert = "None";
let orderPrice = "None"
let personalClientInfo = "None";

function verifyButtonChange(){
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

function removeSelection(oldSelection) {
    oldSelection[0].classList.add("whiteBorder");
    oldSelection[1].classList.add("hiddingClass");
    selectedCounter--;
    verifyButtonChange();
}

function selectionManager(oldSelection, newSelection) {
    if (oldSelection[2] == newSelection[2]) {
        const rowClass = oldSelection[0].classList[0];
        removeSelection(oldSelection);
        switch (rowClass) {
            case 'mealOptions':
                selectedMeal = "None";
                break;
            case 'drinkOptions':
                selectedDrink = "None";
                break;
            case 'dessertOptions':
                selectedDessert = "None";
                break;
            default:
                alert("RESET ERROR:Type of options not found");
        }
        return;
    }
    
    if (oldSelection != "None") {
        removeSelection(oldSelection);
    }

    if (newSelection[0].classList.contains("whiteBorder")){
        newSelection[0].classList.remove("whiteBorder")
        newSelection[1].classList.remove("hiddingClass");
        selectedCounter++;
        verifyButtonChange();
    } 
}

function verifyEqualsAndReser(oldSelection, newSelection, toReset) {
    oldSelection[2] === newSelection[2];
    toReset = "None";
}

function infoManager(rowClass, item, icon) {
    const itemName = item.querySelector("p").innerHTML;
    const itemPrice = item.querySelector("span").innerHTML;
    const newSelection = [item, icon, itemName, itemPrice,];
    let oldSelection = "Subscribe here";

    switch (rowClass) {
        case '.mealOptions':
            oldSelection = selectedMeal;
            selectedMeal = newSelection;
            break;
        case '.drinkOptions':
            oldSelection = selectedDrink;
            selectedDrink = newSelection;
            break;
        case '.dessertOptions':
            oldSelection = selectedDessert;
            selectedDessert = newSelection;
            break;
        default:
            alert("SET ERROR: Type of options not found");
    }

    return [oldSelection, newSelection];
}

function selectUnicOption(rowClass, position) {
    const item = document.querySelector(rowClass + position);
    const itemIcon = item.querySelector("ion-icon");
    let information = "Empty";
    
    information = infoManager(rowClass, item, itemIcon);     
    selectionManager(information[0], information[1]);
}

function resquestClientInfo() {
    const clientName = prompt("Qual seu nome?");
    const clientAdress = prompt("Qual sue endereço?");
    personalClientInfo = [clientName, clientAdress];
    callConfirmationScreen();
}

function buildOrderEncodedText() {
    const uri = "Olá, gostaria de fazer o pedido:\n- Prato: " + selectedMeal[2] + "\n- Bebida: " + selectedDrink[2] + "\n- Sobremesa: " + selectedDessert[2] + "\n\nTotal: " + orderPrice + "\n\nNome: " + personalClientInfo[0] + "\nEndereço: " + personalClientInfo[1];
    const encodedURI = encodeURIComponent(uri);
   
    return encodedURI;
}

function buildOrderLink() {
    document.querySelector("a").href = 'https://wa.me/5531991600044?text=' + buildOrderEncodedText();  
}

function callConfirmationScreen() {
    const totalPrice = 
        Number(selectedMeal[3].replace(',', '.')) + 
        Number(selectedDrink[3].replace(',', '.')) +
        Number(selectedDessert[3].replace(',', '.'));

    document.querySelector(".meal p:first-child").innerHTML = selectedMeal[2];
    document.querySelector(".meal p:last-child").innerHTML = selectedMeal[3];
    document.querySelector(".drink p:first-child").innerHTML = selectedDrink[2];
    document.querySelector(".drink p:last-child").innerHTML = selectedDrink[3];
    document.querySelector(".dessert p:first-child").innerHTML = selectedDessert[2];
    document.querySelector(".dessert p:last-child").innerHTML = selectedDessert[3];

    orderPrice = "R$ " + (totalPrice.toFixed(2)).toString().replace('.', ',');

    document.querySelector(".total p:last-child").innerHTML = orderPrice;

    document.querySelector(".confimationScreen").classList.remove("hiddingClass");

    buildOrderLink();
}

function cancelModalAction() {
    document.querySelector(".confimationScreen").classList.add("hiddingClass");
}