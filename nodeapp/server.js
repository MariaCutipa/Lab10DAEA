const http = require('http');
const sql = require('mssql');

// Configuración de la conexión a SQL Server
const config = {
    user: 'sa',
    password: 'YourPassword123',
    server: 'sqlserver', // Este nombre debe coincidir con el nombre del contenedor o la IP de SQL Server
    database: 'master',
    options: {
        encrypt: false, // Cambiar a true si usas SQL Server en Azure
        enableArithAbort: true
    }
};

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer(async (req, res) => {
    try {
        // Conexión a SQL Server y ejecución de una consulta
        await sql.connect(config);
        const result = await sql.query`SELECT GETDATE() AS CurrentDateTime`;
        
        // Estructura HTML para una respuesta más amigable
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Node.js SQL Server</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f0f0f0;
                        color: #333;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #007bff;
                    }
                    p {
                        margin: 10px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello World from Node.js!</h1>
                    <p><strong>Current Date and Time:</strong> ${result.recordset[0].CurrentDateTime}</p>
                </div>
            </body>
            </html>
        `;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(htmlContent);
    } catch (err) {
        console.error('Error connecting to SQL Server:', err);

        // Estructura HTML para mostrar el error de manera amigable
        const errorContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f8d7da;
                        color: #721c24;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                    }
                    .container {
                        background-color: #f8d7da;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        text-align: center;
                    }
                    h1 {
                        color: #721c24;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Error connecting to SQL Server</h1>
                    <p>There was an issue connecting to the database. Please try again later.</p>
                </div>
            </body>
            </html>
        `;

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end(errorContent);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
