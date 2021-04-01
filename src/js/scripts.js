function colorBorder(options, position) {
    if (options.classList.contains("greenBorder") && options.classList.contains(position)) {
        options.classList.remove("greenBorder");
        return;
    }

    if (options.classList.contains("greenBorder") ) {
        options.classList.remove("greenBorder");
    }

    if (options.classList.contains(position)) {
        options.classList.add("greenBorder");
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