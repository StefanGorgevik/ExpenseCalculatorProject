const express = require('express');
const proxy = require('http-proxy');

var app = express();
var appProxy = proxy.createProxyServer();

app.all('/app/v1/products/*', (req, res) => {
    appProxy.web(req, res, {target: 'http://localhost:8080'});
});

app.all('/app/v1/auth/*', (req, res) => {
    appProxy.web(req, res, {target: 'http://localhost:8081'});
});

app.all('/*', (req, res) => {
    appProxy.web(req, res, {target: 'http://localhost:8083'});
});

app.listen(process.env.PORT, err => {
    if(err){
        console.log('Could not start server');
        console.log(err);
        return;
    }
    console.log('Proxy server started successfully on some port');
});