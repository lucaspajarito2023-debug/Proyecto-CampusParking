// DATOS ADMINISTRADOR
const adminData = {
    name: "Administrador",
    email: "admin@campusparking.com",
    user: "admin",
    password: "Admin123"
};

// INICIALIZAR ADMIN
if (!localStorage.getItem("adminData")) {
    localStorage.setItem(
        "adminData",
        JSON.stringify(adminData)
    );
}

// VEHICULOS
if (!localStorage.getItem("vehicles")) {
    localStorage.setItem(
        "vehicles",
        JSON.stringify([])
    );
}
const formulario = document.getElementById("login-form");

const admin = JSON.parse(
    localStorage.getItem("adminData")
);

formulario.addEventListener("submit", function(e){
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    if(user === "" || pass === ""){
        alert("Complete todos los campos");
        return;
    }
    if(
        (user === admin.user || user === admin.email)
        &&
        pass === admin.password
    ){
        localStorage.setItem("session", "active");
        window.location.href = "principal.html";
    }else{
        alert("Credenciales incorrectas");
    }
});