// Procurar o botão quando o mesmo for solicitado duplicando os campos
document.querySelector("#add_time").addEventListener('click', cloneField);

function cloneField(){
    const newfieldsContainer = document.querySelector(".schedule_item").cloneNode(true);

    const fields = newfieldsContainer.querySelectorAll('input');

    fields.forEach(function(i) {
        i.value = ""
    });

    document.querySelector("#schedule_items").appendChild(newfieldsContainer);
} 