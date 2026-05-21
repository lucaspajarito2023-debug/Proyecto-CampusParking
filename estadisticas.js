// Datos estadisticos por tipo de vehiculo.

function showOtptions(){
    dynamicContent.innerHTML = `
    <nav id="option-estadistics">
        <h1>Estadisticas</h1>
        <ul class="list-options">
            <li onclick="EstadisticasHoy()">Estadisticas de Hoy</li>
            <li>Estadisticas de Ayer</li>
            <li>Estadisticas de esta Semana</li>
        </ul>
    </nav>
    `;
}

function EstadisticasHoy(type,total){
    dynamicContent.innerHTML = `
    <div>
        <h2>Estadisticas de Hoy</h2>
        <div class="slot-container">
            ${renderHistory("Moto",10)}
            ${renderHistory("Carro",20)}
            ${renderHistory("Bus",10)}
        </div>
    </div>
    `;
}


