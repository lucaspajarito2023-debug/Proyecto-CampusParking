// Datos estadisticos por tipo de vehiculo.

function showOptions(){
    dynamicContent.innerHTML = `
    <nav id="option-estadistics">
        <h1>Estadísticas</h1>
        <ul class="list-options">
            <li onclick="EstadisticasHoy()">Estadísticas de Hoy</li>
            <li onclick="EstadisticasAyer()">Estadísticas de Ayer</li>
            <li onclick="EstadisticasSemana()">Estadísticas de esta Semana</li>
        </ul>
    </nav>
    `;
}


// Mostrar estadísticas del día de hoy
function EstadisticasHoy() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Inicio del día (medianoche)
    
    const recordsToday = historicalRecords.filter(record => record.exitTime >= today.getTime());
    
    renderStatsResult(recordsToday, "Estadísticas de Hoy");
}

// Mostrar estadísticas del día de ayer
function EstadisticasAyer() {
    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);

    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const recordsYesterday = historicalRecords.filter(record => 
        record.exitTime >= yesterdayStart.getTime() && record.exitTime <= yesterdayEnd.getTime()
    );

    renderStatsResult(recordsYesterday, "Estadísticas de Ayer");
}

// Mostrar estadísticas de la última semana (últimos 7 días)
function EstadisticasSemana() {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    lastWeek.setHours(0, 0, 0, 0);

    const recordsWeek = historicalRecords.filter(record => record.exitTime >= lastWeek.getTime());

    renderStatsResult(recordsWeek, "Estadísticas de la Semana");
}

// Función auxiliar para mostrar el resumen de datos
function renderStatsResult(records, title) {
    const motos = records.filter(r => r.type === "Moto").length;
    const carros = records.filter(r => r.type === "Carro").length;
    const buses = records.filter(r => r.type === "Bus").length;
    
    const earnings = records.reduce((sum, r) => sum + parseFloat(r.earnings), 0);

    dynamicContent.innerHTML = `

        <h2>${title}</h2>
        <div class="dashboard-box">
            <p>Motos atendidas: ${motos}</p>
            <p>Carros atendidos: ${carros}</p>
            <p>Buses atendidos: ${buses}</p>
            <hr>
            <p><strong>Total Vehículos: ${records.length}</strong></p>
            <p><strong>Ganancias del periodo: Q${earnings.toFixed(2)}</strong></p>
            <button onclick="showOptions()">Volver</button>
        </div>
    `;
}
