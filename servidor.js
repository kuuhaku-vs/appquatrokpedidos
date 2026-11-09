// Servidor local do app de Impressão de Pedidos (Grupo 4K)
// - Abre o app em http://localhost:3080
// - Repassa as chamadas /rest/... para o REST do Protheus (evita bloqueio de CORS do navegador)
// Requer apenas o Node.js instalado (sem npm install).
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Endereço do REST do Protheus (até o "rest05", sem a barra final)
const PROTHEUS = process.env.PROTHEUS || 'https://protheus.quatroktextil.com.br:6632/rest05';
// Se o certificado HTTPS do Protheus for autoassinado e der erro de certificado, troque para true
const IGNORAR_CERTIFICADO = process.env.IGNORAR_CERTIFICADO === '1' || false;
const PORT = Number(process.env.PORT || 3080);
const HTML = path.join(__dirname, 'index.html');

const alvo = new URL(PROTHEUS);
const lib = alvo.protocol === 'https:' ? https : http;
const prefixo = alvo.pathname.replace(/\/+$/, ''); // ex.: /rest05

http.createServer((req, res) => {
  if (req.url.startsWith('/rest/')) {
    const destino = prefixo + req.url.slice('/rest'.length); // /rest/api/... -> /rest05/api/...
    const headers = { ...req.headers, host: alvo.host };
    delete headers.origin; delete headers.referer; delete headers.cookie;
    const proxy = lib.request({
      protocol: alvo.protocol, hostname: alvo.hostname,
      port: alvo.port || (alvo.protocol === 'https:' ? 443 : 80),
      method: req.method, path: destino, headers, timeout: 120000,
      rejectUnauthorized: !IGNORAR_CERTIFICADO
    }, pr => { res.writeHead(pr.statusCode, pr.headers); pr.pipe(res); });
    proxy.on('timeout', () => proxy.destroy(new Error('Tempo esgotado aguardando o Protheus')));
    proxy.on('error', e => {
      console.error('Erro ao acessar o Protheus:', e.message);
      if (!res.headersSent) res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ errorMessage: 'Falha ao acessar o Protheus em ' + PROTHEUS + ': ' + e.message }));
    });
    req.pipe(proxy);
    return;
  }
  if (req.url === '/' || req.url.startsWith('/index') || req.url.startsWith('/impressao_pedidos.html')) {
    fs.readFile(HTML, (err, data) => {
      if (err) { res.writeHead(500); return res.end('index.html nao encontrado na pasta do servidor.'); }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
      res.end(data);
    });
    return;
  }
  res.writeHead(404); res.end();
}).listen(PORT, () => {
  console.log('Impressao de Pedidos rodando em http://localhost:' + PORT);
  console.log('Protheus: ' + PROTHEUS + '   (feche esta janela para encerrar)');
});
