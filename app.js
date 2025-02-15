const express = require("express");
const multer = require("multer");
const path = require("path");
const { exec } = require("child_process"); // Importamos child_process
const app = express();

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta de la carpeta compartida en la red
    const sharedFolder =
      "\\\\192.168.40.250\\trm_universal";
      // "\\\\192.168.40.250\\serna_publica\\WISTHONG\\developer";
    cb(null, sharedFolder); // Guardar en la carpeta compartida
  },
  filename: (req, file, cb) => {
    // Renombrar el archivo para evitar colisiones
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filtrar solo archivos CSV
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv") {
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

  // Guardamos el nombre completo del archivo (incluyendo extensión)
  const uploadedFileName = req.file.filename; // El nombre del archivo generado por Multer

  // Ruta completa del archivo
  const filePath = path.join(
    "\\\\192.168.40.250\\trm_universal",
    uploadedFileName
  );

  exec(`python3 bot.py "${filePath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error al ejecutar el script de Python:", err);
      return res.status(500).send("Hubo un error al ejecutar el script de Python.");
    }
  
    if (stderr) {
      console.error("Error en el script de Python:", stderr);
      return res.status(500).send("Hubo un error al ejecutar el script de Python.");
    }
  
    console.log("Salida del script de Python:", stdout);
    res.send("Archivo subido y script de Python ejecutado exitosamente.");
  });
  

  // // Usar exec para ejecutar un script de Python, pasando la ruta del archivo como argumento
  // exec(`python C:\\Users\\wisth\\Desktop\\developer\\node\\upload\\bot.py ${filePath}`, (err, stdout, stderr) => {
  //   if (err) {
  //     console.error("Error al ejecutar el script de Python:", err);
  //     return res.status(500).send("Hubo un error al ejecutar el script de Python.");
  //   }

  //   if (stderr) {
  //     console.error("Error en el script de Python:", stderr);
  //     return res.status(500).send("Hubo un error al ejecutar el script de Python.");
  //   }

  //   console.log("Salida del script de Python:", stdout);
  //   res.send("Archivo subido y script de Python ejecutado exitosamente.");
  // });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
