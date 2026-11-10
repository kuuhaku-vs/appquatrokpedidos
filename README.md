# Impressão de Pedidos | Grupo 4K

App para imprimir pedidos de venda de amostra no layout do relatório **Foto Atual** (QKRFotoPV) do Protheus, bem mais rápido que pelo sistema.

**Acesse:** https://kuuhaku-vs.github.io/appquatrokpedidos/

## Como usar
1. Abra o link e digite **usuário e senha do Protheus** no topo da página. A senha não fica salva (vale só enquanto a aba estiver aberta).
2. Escolha a **Situação** (Em aberto, Liberados, Faturados ou Todos), o período e o tipo (TES) e clique em **Buscar pedidos**.
3. Marque os pedidos e clique em **Imprimir selecionados**. Cada pedido sai em uma folha A4 deitada.
4. Para um pedido só, digite o número em **Imprimir pedido nº** e clique em **Visualizar**.

A coluna **Endereçar** da lista mostra os pedidos que vão sair com endereço dos rolos.

## Pedidos já impressos
Depois de imprimir, o site pergunta **"Os pedidos saíram na impressora?"**. Ao confirmar, eles ficam marcados como **✓ Impresso** (com data, hora e usuário):
- aparecem apagados na lista, não entram no **Selecionar todos** e podem ser escondidos com **Ocultar já impressos**;
- se alguém abrir um pedido já impresso, aparece um aviso antes de imprimir de novo (e o site não imprime sozinho);
- **desfazer** na linha tira a marcação.

Sem configurar nada, a marcação fica **só no computador** em que foi feita. Para **todos os computadores verem os mesmos impressos**, crie a planilha da equipe uma vez:
1. Crie uma Planilha Google e abra **Extensões → Apps Script**.
2. Cole todo o arquivo [`planilha-impressos/Code.gs`](planilha-impressos/Code.gs) e troque `TROQUE-ESTA-CHAVE` pelo código da equipe (pode ser o mesmo das Pastas do NOVA).
3. **Implantar → Nova implantação → App da Web** (Executar como: Eu · Quem pode acessar: Qualquer pessoa) e copie o URL.
4. No site, clique em **Impressos** (topo, à direita), cole o URL e o código da equipe e clique em **Salvar e testar**. Repita esse passo em cada computador.

O código da equipe fica salvo só no navegador de cada computador e também é usado para considerar as **malhas com defeito** do NOVA na escolha dos endereços.

## Endereços dos rolos
Nos itens de **Pilotagem** e de **Bandeira** cuja observação diz para não alterar a cor, o relatório traz a coluna **Endereços** com até 3 endereços, no formato `08192 - 01201 - 09103`, com as mesmas regras do NOVA (Consulta de Estoque):
- só rolos **aprovados para amostra** (gramatura dentro de 7% da ideal do grupo, SBM.BM_GRAMTIN, e sem defeito);
- só endereços que terminam em número (ex.: CQSUJO fica de fora);
- endereços de **nível baixo** (final 1, 2, 3) primeiro;
- depois: armazém 93 / AM01 / AM02 → menor CMC → entrada mais recente.

Para considerar as **malhas com defeito** da planilha da equipe, informe o código da equipe no botão **Impressos** do topo (fica salvo só no navegador). Não publique o código da equipe neste repositório público.

## De onde vêm os dados
Tudo vem direto do REST do Protheus (`/api/framework/v1/genericQuery`): SC5/SC6 (pedido), SA1 (cliente), SA3 (vendedor e centro de custo `A3_4KCC`), CTT (descrição do centro de custo), SE4 (condição de pagamento), SB1/SBM (grupo e gramatura) e SZ5 (rolos e endereços).

Campos personalizados usados (bloco `CONFIG` no `index.html`): `C5_4KTPENC` (Tp.Encomenda), `C5_TPVENDA` (Tipo Venda), `C6_4KTPAMO` (Tp.Amostra), `C6_XCLASSI` (Tonalidade), `C5_OBSSEP` / `C5_OBSSEP2` (Aviso p/ separação).

## Uso local (opcional)
Se um dia o Protheus deixar de aceitar chamadas direto do navegador (CORS), baixe os arquivos deste repositório numa pasta e abra o `iniciar.bat` (precisa do Node.js). O app abre em `http://localhost:3080` e o `servidor.js` repassa as chamadas para o Protheus.

## Atualizar
Envie de novo o `index.html` alterado (**Add file → Upload files**). O GitHub Pages publica em 1–2 minutos.
