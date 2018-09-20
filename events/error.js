module.exports = (client,error) => {

    client.on('error', (error) => handleError(error));
    process.on('error', error => console.error(error))
    process.on('uncaughtException', error => console.error(error));
    process.on('unhandledRejection', error => console.error(error));  
};

function handleError(error) {
    //  somecodehere
     console.error(error.stack);
 };