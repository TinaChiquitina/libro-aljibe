// Importa el módulo 'fs' de Node.js para operaciones del sistema de archivos
const fs = require('fs');
// Importa el módulo 'path' para manejar rutas de archivos y directorios
const path = require('path');

/**
 * Crea archivos consecutivos dentro de un directorio especificado.
 *
 * @param {number} start - El número inicial para la secuencia de archivos.
 * @param {number} end - El número final para la secuencia de archivos.
 * @param {string} word - Una palabra o frase a incluir en el nombre del archivo (ej. "region").
 * @param {string} extension - La extensión del archivo (ej. ".json", ".txt"). Debe incluir el punto inicial.
 * @param {string} directory - La ruta del directorio donde se crearán los archivos.
 * @param {string} [content=''] - El contenido opcional para escribir en cada archivo. Por defecto, vacío.
 */
function createConsecutiveFiles(start, end, word, extension, directory, content = '') {
    // Asegúrate de que la extensión comience con un punto
    if (!extension.startsWith('.')) {
        extension = '.' + extension;
    }

    try {
        // Crea el directorio de forma recursiva si no existe
        // { recursive: true } asegura que todos los directorios intermedios también se creen
        fs.mkdirSync(directory, { recursive: true });
        console.log(`Directorio '${directory}' asegurado.`);

        // Itera desde el número inicial hasta el número final
        for (let i = start; i <= end; i++) {
            // Construye el nombre del archivo: [número]-[palabra].[extensión]
            const fileName = `${i}-${word}${extension}`;
            // Combina la ruta del directorio con el nombre del archivo
            const filePath = path.join(directory, fileName);

            // Escribe el contenido en el archivo.
            // Si el archivo ya existe, será sobrescrito.
            fs.writeFileSync(filePath, content);
            console.log(`Archivo creado: ${filePath}`);
        }
        console.log(`Proceso completado: ${end - start + 1} archivos creados en '${directory}'.`);
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante el proceso
        console.error(`Error al crear archivos: ${error.message}`);
    }
}

// --- Ejemplos de uso ---

// Ejemplo 1: Crear 32 archivos JSON con la palabra "region"
// Los archivos serán nombrados desde '1-region.json' hasta '32-region.json'
// en un subdirectorio llamado 'data/regions'.
// El contenido de cada archivo será un JSON básico.
console.log('\n--- Ejemplo 1: Creando 32 archivos JSON de región ---');
createConsecutiveFiles(1, 36, 'regions', '.json', 'data/regions', JSON.stringify([{ not: 'not' }], null, 2));

/* // Ejemplo 2: Crear 5 archivos de texto con la palabra "log"
// Los archivos serán nombrados desde '10-log.txt' hasta '14-log.txt'
// en un subdirectorio llamado 'logs'.
// El contenido de cada archivo será una línea de texto.
console.log('\n--- Ejemplo 2: Creando 5 archivos de texto de log ---');
createConsecutiveFiles(10, 14, 'log', 'txt', 'logs', 'Este es un archivo de log.');

// Ejemplo 3: Crear 3 archivos CSV sin contenido específico
// Los archivos serán nombrados desde '1-report.csv' hasta '3-report.csv'
// en un subdirectorio llamado 'reports'.
console.log('\n--- Ejemplo 3: Creando 3 archivos CSV de reporte ---');
createConsecutiveFiles(1, 3, 'report', '.csv', 'reports'); */
