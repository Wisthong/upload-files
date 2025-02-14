const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  // Especifica la ruta compartida en la red
  destination: (req, file, cb) => {
    // Ruta de la carpeta compartida en la red
    const sharedFolder =
      "\\\\192.168.40.250\\serna_publica\\WISTHONG\\developer";
    cb(null, sharedFolder); // Guardar en la carpeta compartida
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo para evitar colisiones
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// TODO: Local;
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads'); // Carpeta donde se guardarán los archivos
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para evitar colisiones
//     }
//   });

// Filtrar solo archivos CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
    console.log("Se subio");

    cb(null, true); // Aceptar archivos CSV
  } else {
    cb(new Error("Solo se permiten archivos CSV"), false); // Rechazar otros tipos de archivos
  }
};

// Configurar Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Servir archivos estáticos (como el HTML)
app.use(express.static("public"));

// Ruta para cargar el archivo CSV
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send("No se subió ningún archivo o el archivo no es válido.");
  }
  res.send("Archivo subido exitosamente");
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
