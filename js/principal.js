const dynamicContent = document.getElementById("dynamic-content");
let vehicles = JSON.parse(
    localStorage.getItem("vehicles")
) || [];

const slots = {
    Moto:10,
    Carro:20,
    Bus:10
};
// ===============================
// PERFIL
function showProfile(){
    const admin = JSON.parse(
        localStorage.getItem("adminData")
    );
    setTimeout(() => {
        dynamicContent.innerHTML = `
        <h2>Perfil Administrador</h2>
        <div class="dashboard-box">
            <p><strong>Nombre:</strong> ${admin.name}</p>
            <p><strong>Email:</strong> ${admin.email}</p>
            <p><strong>Usuario:</strong> ${admin.user}</p>
            <button onclick="showEditProfile()">
                Actualizar Datos
            </button>
            <button onclick="logout()">
                Salir
            </button>
        </div>
        `;
    }, 300);
}

// ===============================
// EDITAR PERFIL
function showEditProfile(){
    const admin = JSON.parse(
        localStorage.getItem("adminData")
    );
    dynamicContent.innerHTML = `
    <h2>Actualizar Perfil</h2>
    <input
        id="newName"
        value="${admin.name}"
    >
    <input
        id="newEmail"
        value="${admin.email}"
    >
    <input
        id="newUser"
        value="${admin.user}"
    >
    <input
        id="newPassword"
        value="${admin.password}"
    >
    <button onclick="saveProfile()">
        Guardar
    </button>
    <button onclick="showProfile()">
        Cancelar
    </button>
    `;
}

// ===============================
// GUARDAR PERFIL
function saveProfile(){
    const updatedAdmin = {
        name:document.getElementById(
            "newName"
        ).value,
        email:document.getElementById(
            "newEmail"
        ).value,
        user:document.getElementById(
            "newUser"
        ).value,

        password:document.getElementById(
            "newPassword"
        ).value
    };

    setTimeout(() => {
        localStorage.setItem(
            "adminData",
            JSON.stringify(updatedAdmin)
        );
        alert("Perfil actualizado");
        showProfile();
    }, 500);
}

// ===============================
// LOGOUT
function logout(){
    setTimeout(() => {
        localStorage.removeItem(
            "session"
        );
        window.location.href =
        "../html/index.html";
    }, 500);
}

// ===============================
// FORMULARIO ENTRADA
function showEntryForm(){
    dynamicContent.innerHTML = `
    <h2>Registrar Vehículo</h2>
    <select id="vehicleType">
        <option value="">
            Seleccione
        </option>
        <option value="Moto">
            Moto
        </option>
        <option value="Carro">
            Carro
        </option>
        <option value="Bus">
            Bus
        </option>
    </select>
    <input
        type="text"
        id="plate"
        placeholder="P123ABC"
    >
    <button onclick="assignSlot()">
        Registrar
    </button>
    `;
}

// ===============================
// REGISTRAR VEHICULO
function assignSlot(){
    const type = document
        .getElementById("vehicleType")
        .value;
    const plate = document
        .getElementById("plate")
        .value
        .toUpperCase()
        .trim();

    // ===============================
    // VALIDAR TIPO
    if(type === ""){
        alert(
            "Seleccione un tipo"
        );
        return;
    }

    // ===============================
    // VALIDAR PLACA GUATEMALA

    let regex;
    let ejemplo = "";

    // Moto
    if(type === "Moto"){
        regex =
        /^M[0-9]{3}[A-Z]{3}$/;
        ejemplo = "M123ABC";
    }

    // Carro
    if(type === "Carro"){
        regex =
        /^P[0-9]{3}[A-Z]{3}$/;
        ejemplo = "P123ABC";
    }
    // Bus
    if(type === "Bus"){
        regex =
        /^C[0-9]{3}[A-Z]{3}$/;
        ejemplo = "C123ABC";
    }

    // ===============================
    // VALIDAR FORMATO
    if(!regex.test(plate)){
        alert(`
Placa inválida para ${type}.
Formato correcto:
${ejemplo}
        `);
        return;
    }
    // ===============================
    // VALIDAR DUPLICADOS

    const exist = vehicles.find(
        v => v.plate === plate
    );
    if(exist){
        alert(
            "La placa ya existe"
        );
        return;
    }
    // ===============================
    // VALIDAR ESPACIOS
    const occupied = vehicles.filter(
        v => v.type === type
    );
    if(
        occupied.length >= slots[type]
    ){
        alert(
            "No hay slots disponibles"
        );
        return;
    }
    // ===============================
    // REGISTRAR
    setTimeout(() => {
        const slot =
        occupied.length + 1;
        const vehicle = {
            type,
            plate,
            slot,
            entry:new Date()
            .toLocaleString()
        };
        vehicles.push(vehicle);
        localStorage.setItem(
            "vehicles",
            JSON.stringify(vehicles)
        );
        updateSidebar();
        alert(
            "Vehículo registrado correctamente"
        );
    }, 500);
}

// ===============================
// MOSTRAR SLOTS
function showSlots(){
    setTimeout(() => {
        dynamicContent.innerHTML = `
        <h2>Slots</h2>
        <div class="slot-container">
            ${renderSlots("Moto",10)}
            ${renderSlots("Carro",20)}
            ${renderSlots("Bus",10)}
        </div>
        `;
    }, 300);
}

// ===============================
// RENDERIZAR SLOTS
function renderSlots(type,total){
    let html = `
    <div class="slot-category">
        <h3>${type}</h3>
        <div class="slots-grid">
    `;
    for(let i=1; i<=total; i++){
        const vehicle = vehicles.find(
            v =>
            v.type === type
            &&
            v.slot === i
        );

        html += `
        <div class="
            slot
            ${vehicle
            ? "occupied"
            : "free"}
        ">
            ${vehicle
            ? vehicle.plate
            : i}
        </div>
        `;
    }

    html += `
        </div>
    </div>
    `;
    return html;
}

// ===============================
// SALIDAS
function showExit(){
    dynamicContent.innerHTML = `
    <h2>Salida Vehículos</h2>
    <input
        type="text"
        id="searchPlate"
        placeholder="Buscar placa"
    >
    <button onclick="searchVehicle()">
        Buscar
    </button>
    <div id="vehicle-result"></div>
    `;
}

// ===============================
// BUSCAR VEHICULO
function searchVehicle(){
    const plate = document
        .getElementById("searchPlate")
        .value
        .toUpperCase();
    setTimeout(() => {
        const vehicle = vehicles.find(
            v => v.plate === plate
        );
        if(!vehicle){
            alert(
                "Vehículo no encontrado"
            );
            return;
        }
        document.getElementById(
            "vehicle-result"
        ).innerHTML = `
        <div class="dashboard-box">
            <p>
                Placa:
                ${vehicle.plate}
            </p>
            <p>
                Tipo:
                ${vehicle.type}
            </p>
            <p>
                Slot:
                ${vehicle.slot}
            </p>
            <button
                onclick="finishService('${vehicle.plate}')"
            >
                Finalizar
            </button>
            <button onclick="deleteVehicle('${vehicle.plate}')" >
                Eliminar
            </button>
        </div>
        `;

    }, 400);
}

// ===============================
// FINALIZAR SERVICIO
function finishService(plate){
    const vehicle = vehicles.find(
        v => v.plate === plate
    );
    setTimeout(() => {
        const exit = new Date();
        const total =
        calculateEarnings(plate);
        alert(`
Entrada:
${vehicle.entry}
Salida:
${exit.toLocaleString()}
Total a pagar:
Q${total.toFixed(2)}
        `);
        deleteVehicle(plate);
    }, 500);
}

// ===============================
// ELIMINAR VEHICULO
function deleteVehicle(plate){
    setTimeout(() => {
        vehicles = vehicles.filter(
            v => v.plate !== plate
        );
        localStorage.setItem(
            "vehicles",
            JSON.stringify(vehicles)
        );
        updateSidebar();
        showExit();
    }, 300);
}

// ===============================
// CALCULAR GANANCIAS
function calculateEarnings(plate){
    const vehicle = vehicles.find(
        v => v.plate === plate
    );
    if(!vehicle){
        return 0;
    }
    const entryTime = new Date(
        vehicle.entry
    );
    const exitTime = new Date();
    const duration = Math.ceil(
        (exitTime - entryTime)
        /
        (1000 * 60)
    );
    let rate = 0;
    switch(vehicle.type){
        case "Moto":
            rate = 0.5;
        break;
        case "Carro":
            rate = 1;
        break;
        case "Bus":
            rate = 2;
        break;
    }
    const total =
    duration * rate;
    return total;
}

// ===============================
// SIDEBAR
function updateSidebar(){
    const motos = vehicles.filter(
        v => v.type === "Moto"
    ).length;
    const carros = vehicles.filter(
        v => v.type === "Carro"
    ).length;
    const buses = vehicles.filter(
        v => v.type === "Bus"
    ).length;
    setTimeout(() => {
        document.getElementById(
            "dashboard-info"
        ).innerHTML = `
        <div class="dashboard-box">
            <p>
                Motos:
                ${motos}/10
            </p>
            <p>
                Disponibles:
                ${10 - motos}
            </p>
        </div>
        <div class="dashboard-box">
            <p>
                Carros:
                ${carros}/20
            </p>
            <p>
                Disponibles:
                ${20 - carros}
            </p>
        </div>
        <div class="dashboard-box">
            <p>
                Buses:
                ${buses}/10
            </p>
            <p>
                Disponibles:
                ${10 - buses}
            </p>
        </div>
        <div class="dashboard-box">
            <p>
                Total Vehículos:
                ${vehicles.length}
            </p>
        </div>
        <div class="dashboard-box">
            <p>
                Ganancias Actuales:
                Q${vehicles
                .reduce(
                    (acc,v) =>
                    acc +
                    calculateEarnings(v.plate),
                    0
                )
                .toFixed(2)}
            </p>
        </div>
        `;
    }, 200);
}
// ===============================
showProfile();
updateSidebar();