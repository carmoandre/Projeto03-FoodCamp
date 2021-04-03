let selectedCounter = 0;
let selectedMeal = "None";
let selectedDrink = "None";
let selectedDessert = "None";

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

function selectionManager(oldSelection, newSelection) {
    if (oldSelection == newSelection) {
        //TO-DO remover seleção
        console.log("tenho que implementar o reset da variável");
        return;
    }
    
    if (oldSelection != "Subscribe here" && oldSelection != "None") {
        oldSelection[0].classList.add("whiteBorder");
        oldSelection[1].classList.add("hiddingClass");
        selectedCounter--;
        verifyButtonChange();
    }

    if (newSelection[0].classList.contains("whiteBorder")){
        newSelection[0].classList.remove("whiteBorder")
        newSelection[1].classList.remove("hiddingClass");
        selectedCounter++;
        verifyButtonChange();
    } 
}

function infoManager(rowClass, item, icon) {
    const itemName = item.querySelector("p").innerHTML;
    const itemPrice = item.querySelector("span").innerHTML;
    const newSelection = [item, icon, itemName, itemPrice];
    let olderSelection = "Subscribe here"

    switch (rowClass) {
        case '.mealOptions':
            olderSelection = selectedMeal;
            selectedMeal = newSelection;
            break;
        case '.drinkOptions':
            olderSelection = selectedDrink;
            selectedDrink = newSelection;
            break;
        case '.dessertOptions':
            olderSelection = selectedDessert;
            selectedDessert = newSelection;
            break;
        default:
            alert("Type of options not found");
    }
    return [olderSelection, newSelection];
}

function selectUnicOption(rowClass, position) {
    const item = document.querySelector(rowClass + position);
    const itemIcon = item.querySelector("ion-icon");
    let information = "Empty";
    
    information = infoManager(rowClass, item, itemIcon);     
    selectionManager(information[0], information[1]);
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

    document.querySelector(".total p:last-child").innerHTML = "R$ " + (totalPrice.toFixed(2)).toString().replace('.', ',');

    document.querySelector(".confimationScreen").classList.remove("hiddingClass");
}

function cancelModalAction() {
    document.querySelector(".confimationScreen").classList.add("hiddingClass");
}
