// Usuario y contraseña correctos
const correctUsername = "admin";
const correctHash = "750bf6186a4efc45e24d30ed531977d98937f7b084608a47d1c7bd08c93b0bb5"; // Hash de "Jm123456"

// Función para calcular SHA-256
function sha256(password) {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

// Mostrar mensaje de error
function showErrorMessage() {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.classList.add("show");
    setTimeout(() => {
        errorMessage.classList.remove("show");
    }, 2000);
}

// Función de validación de login
function checkLogin() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const hashedPassword = sha256(enteredPassword);

    if (enteredUsername === correctUsername && hashedPassword === correctHash) {
        // Guardar sesión por 14 horas
        const loginExpiry = new Date().getTime() + 14 * 60 * 60 * 1000;
        localStorage.setItem("loginExpiry", loginExpiry);

        // Mostrar contenido y ocultar login
        document.querySelector(".blur").style.display = "none";
        document.getElementById("inadbContent").style.display = "block";
    } else {
        showErrorMessage();
    }
}

// Verificar si la sesión sigue activa
function checkLoginStatus() {
    const loginExpiry = localStorage.getItem("loginExpiry");
    const currentTime = new Date().getTime();

    if (loginExpiry && currentTime < loginExpiry) {
        document.querySelector(".blur").style.display = "none";
        document.getElementById("inadbContent").style.display = "block";
    } else {
        localStorage.removeItem("loginExpiry");
        document.querySelector(".blur").style.display = "block";
        document.getElementById("inadbContent").style.display = "none";
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem("loginExpiry");
    document.querySelector(".blur").style.display = "block";
    document.getElementById("inadbContent").style.display = "none";
}

// Ejecutar verificación de sesión al cargar la página
checkLoginStatus()
