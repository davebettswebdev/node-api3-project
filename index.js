// code away!


const server = require('./server');
const port = 5500;
server.listen(port, () =>
    console.log(`\n **API running on port ${port}  **\n`)
)
