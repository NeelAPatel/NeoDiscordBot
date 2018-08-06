module.exports = (client,code, erMsg) => {
    console.log('----- Bot disconnected from Discord with code ', code, ' for reason: ', erMsg, '-----');
    client.connect();
};