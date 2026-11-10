/**
 * Pedidos — controle de PEDIDOS IMPRESSOS compartilhado (Google Planilhas + Apps Script)
 *
 * Como instalar (uma vez):
 *  1. Crie uma Planilha Google (ex.: "Pedidos impressos").
 *  2. Menu Extensões → Apps Script. Apague o que estiver no editor e cole TODO este arquivo.
 *  3. Troque o valor de CHAVE abaixo pelo código da equipe (pode ser o mesmo das Pastas do NOVA).
 *  4. Salve. Clique em Implantar → Nova implantação → engrenagem → App da Web.
 *       Executar como: Eu   |   Quem pode acessar: Qualquer pessoa
 *     Clique em Implantar, autorize com sua conta Google e copie o "URL do app da Web".
 *  5. No site de Pedidos: botão "Impressos" no topo → cole o URL e o código da equipe → Salvar e testar.
 *
 * A aba "Impressos" é criada sozinha (filial, pedido, usuario, data). Pode consultar e filtrar à vontade;
 * apagar uma linha = o pedido volta a aparecer como "não impresso".
 * Se alterar este código depois: Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão → Implantar.
 *
 * IMPORTANTE: não publique a CHAVE verdadeira no GitHub. Ela fica só aqui, no Apps Script.
 */
const CHAVE = 'TROQUE-ESTA-CHAVE';
const ABA = 'Impressos';
const CAB = ['filial', 'pedido', 'usuario', 'data'];
const DIAS = 400; // devolve só as impressões dos últimos ~13 meses

function doGet(e) { return handle_((e && e.parameter) || {}); }
function doPost(e) {
  let b = {};
  try { b = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (x) { /* corpo inválido */ }
  return handle_(b);
}
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function handle_(b) {
  try {
    if (CHAVE === 'TROQUE-ESTA-CHAVE') return out_({ ok: false, error: 'Configure a CHAVE no Apps Script antes de usar.' });
    if (String(b.key || '') !== CHAVE) return out_({ ok: false, error: 'Código da equipe inválido.' });
    const a = String(b.action || 'list');
    if (a === 'list') return out_({ ok: true, impressos: list_() });
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (a === 'mark') mark_(b.pedidos || [], String(b.user || '').slice(0, 40));
      else if (a === 'unmark') unmark_(b.filial, b.pedido);
      else return out_({ ok: false, error: 'Ação desconhecida: ' + a });
      SpreadsheetApp.flush();
      return out_({ ok: true, impressos: list_() });
    } finally { lock.releaseLock(); }
  } catch (err) {
    return out_({ ok: false, error: String((err && err.message) || err) });
  }
}

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName(ABA);
  if (!sh) {
    sh = ss.insertSheet(ABA);
    sh.getRange(1, 1, 1, CAB.length).setValues([CAB]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange(1, 1, sh.getMaxRows(), 2).setNumberFormat('@'); // mantém zeros à esquerda
  }
  return sh;
}
function rows_(sh) {
  const n = sh.getLastRow() - 1;
  return n > 0 ? sh.getRange(2, 1, n, CAB.length).getValues() : [];
}
const s_ = v => String(v == null ? '' : v).trim();

function list_() {
  const limite = Date.now() - DIAS * 864e5;
  return rows_(sheet_())
    .map(r => ({ filial: s_(r[0]), pedido: s_(r[1]), usuario: s_(r[2]), data: r[3] instanceof Date ? r[3].toISOString() : s_(r[3]) }))
    .filter(x => x.pedido && (!Date.parse(x.data) || Date.parse(x.data) >= limite));
}

function mark_(pedidos, user) {
  const sh = sheet_(), rows = rows_(sh), agora = new Date().toISOString();
  const idx = {};
  rows.forEach((r, i) => { idx[s_(r[0]) + ':' + s_(r[1])] = i + 2; });
  const novos = [];
  pedidos.slice(0, 500).forEach(p => {
    const f = s_(p.filial), n = s_(p.pedido);
    if (!n) return;
    const linha = idx[f + ':' + n];
    if (linha) sh.getRange(linha, 3, 1, 2).setValues([[user, agora]]); // reimpressão: atualiza quem e quando
    else { novos.push([f, n, user, agora]); idx[f + ':' + n] = -1; }
  });
  if (novos.length) {
    const ini = sh.getLastRow() + 1;
    sh.getRange(ini, 1, novos.length, 2).setNumberFormat('@');
    sh.getRange(ini, 1, novos.length, CAB.length).setValues(novos);
  }
}

function unmark_(filial, pedido) {
  const sh = sheet_(), rows = rows_(sh), f = s_(filial), n = s_(pedido);
  for (let i = rows.length - 1; i >= 0; i--) {
    if (s_(rows[i][0]) === f && s_(rows[i][1]) === n) sh.deleteRow(i + 2);
  }
}
