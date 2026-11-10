# Impressão de Pedidos | Grupo 4K

App para imprimir pedidos de venda de amostra no layout do relatório **Foto Atual** (QKRFotoPV) do Protheus, com o logo do Grupo Quatro K, bem mais rápido que pelo sistema.

**Acesse:** https://kuuhaku-vs.github.io/appquatrokpedidos/

## Como usar
1. Abra o link e entre com seu **usuário e senha do Protheus**. Com **Manter conectado** marcado, o site lembra o acesso neste navegador até você clicar em **Sair** (não marque em computador compartilhado). Desmarcado, o acesso vale só enquanto a aba estiver aberta.
2. Escolha a **Situação** (Em aberto, Liberados, Faturados ou Todos) e o período e clique em **Buscar pedidos**. A busca considera as TES de amostra 811, 816, 817 e 827.
3. Marque os pedidos e clique em **Imprimir selecionados**. Cada pedido sai em uma folha A4 deitada.
4. Para um pedido só, digite o número em **Pedido avulso** e clique em **Visualizar**.

## Aplicativo no celular
O site funciona como aplicativo (lista em cartões e botões de imprimir fixos embaixo):
- **Android (Chrome):** abra o link e toque em **⤓** no topo (ou no menu ⋮ → **Instalar app**).
- **iPhone (Safari):** toque em **Compartilhar** → **Adicionar à Tela de Início**.
- **Computador (Chrome/Edge):** botão **Instalar app** no topo ou o ícone de instalar na barra de endereço.

No celular o app tem **abas embaixo**:
- **Pedidos:** só a busca e a lista. Os botões Visualizar/Imprimir aparecem quando há pedido selecionado. Com o celular em pé, a visualização gira a folha para ficar na horizontal.
- **Dashboard:** em aberto, liberados, faturados no mês e no ano, a imprimir e já impressos, gráfico de amostras por mês, pendentes por tipo e destaques.
- **Ajustes:** conta e Sair, tema de cores, claro/escuro, código do grupo e instalar app.

O ícone instalado é o logo do Pedidos 4K. No site, o logo muda de cor conforme o tema. O app sempre busca a versão mais nova do site quando há internet.

## Temas
Clique no **seu usuário** (canto superior direito) para abrir o menu com: Impressos (código do grupo), tema de cores (Limão, Floresta, Sol, Pink, Noite, Violeta), escuro/claro, instalar app e Sair. A escolha fica salva no aparelho. O topo usa a cor principal do tema e os botões a cor de destaque; quando o destaque não aparece bem no fundo (ex.: Limão no claro), o site usa automaticamente outra cor do tema.

## Dashboard
Aba **Dashboard** no topo (computador) ou embaixo (celular):
- **Cartões:** Em aberto, Liberados e Faturados **do mês** escolhido; Faturados, Amostras enviadas (quantidade faturada) e Clientes atendidos (distintos) **no ano**.
- **Amostras solicitadas por mês:** clique em um mês para ler como foi (volume, variação, tipo e item mais pedidos, quem mais pediu, clientes, faturados, dia de pico). O mês clicado vira o período "Mensal" dos outros quadros.
- **Mensal / Anual:** alterna rosca de tipos de amostra, Top 10 mais solicitados, Quem mais solicita (vendedora + setor: Televendas, Supervisão, Loja) e Destaques.
- **Letreiro (AO VIVO):** fica dentro do topo, entre o logo e as abas; passe o mouse para pausar.

Tags e Desenvolvimento de cor não entram em nenhum painel (dashboard, letreiro e cartão de tipos da tela Pedidos); os pedidos continuam aparecendo normalmente na lista para impressão.

Os dados vêm do Protheus (12 consultas mensais dos últimos 12 meses + uma consulta dos pendentes) e são atualizados a cada 10 minutos ou no botão ↻.

A coluna **Endereçar** da lista mostra os pedidos que vão sair com endereço dos rolos.

## Pedidos já impressos
Depois de imprimir, o site pergunta **"Os pedidos saíram na impressora?"**. Ao confirmar, eles ficam marcados como **✓ Impresso** (com data, hora e usuário):
- aparecem apagados na lista, não entram no **Selecionar todos** e podem ser escondidos com **Ocultar já impressos**;
- se alguém abrir um pedido já impresso, aparece um aviso antes de imprimir de novo (e o site não imprime sozinho);
- **desfazer** na linha tira a marcação.

A planilha da equipe já está configurada no site. Para **todos os computadores e celulares verem os mesmos impressos**, cada pessoa clica no **seu usuário** (topo, à direita) → **Impressos**, digita o **código do grupo** e clica em **Salvar e testar**. Sem o código, a marcação fica só no aparelho em que foi feita.

(Para criar uma planilha nova do zero, use o arquivo [`planilha-impressos/Code.gs`](planilha-impressos/Code.gs) e troque o endereço em `planilhaImpressos` no `index.html`.)

O código do grupo fica salvo só no navegador de cada computador e também é usado para considerar as **malhas com defeito** do NOVA na escolha dos endereços.

## Endereços dos rolos
Nos itens de **Pilotagem** e de **Bandeira** cuja observação diz para não alterar a cor, o relatório traz a coluna **Endereços** com até 3 endereços, no formato `08192 - 01201 - 09103`, com as mesmas regras do NOVA (Consulta de Estoque):
- só rolos **aprovados para amostra** (gramatura dentro de 7% da ideal do grupo, SBM.BM_GRAMTIN, e sem defeito);
- só endereços que terminam em número (ex.: CQSUJO fica de fora);
- endereços de **nível baixo** (final 1, 2, 3) primeiro;
- depois: armazém 93 / AM01 / AM02 → menor CMC → entrada mais recente.

Para considerar as **malhas com defeito** da planilha da equipe, informe o código da equipe em **Impressos** (menu do usuário) (fica salvo só no navegador). Não publique o código da equipe neste repositório público.

## De onde vêm os dados
Tudo vem direto do REST do Protheus (`/api/framework/v1/genericQuery`): SC5/SC6 (pedido), SA1 (cliente), SA3 (vendedor e centro de custo `A3_4KCC`), CTT (descrição do centro de custo), SE4 (condição de pagamento), SB1/SBM (grupo e gramatura) e SZ5 (rolos e endereços).

Campos personalizados usados (bloco `CONFIG` no `index.html`): `C5_4KTPENC` (Tp.Encomenda), `C5_TPVENDA` (Tipo Venda), `C6_4KTPAMO` (Tp.Amostra), `C6_XCLASSI` (Tonalidade), `C5_OBSSEP` / `C5_OBSSEP2` (Aviso p/ separação).

## Uso local (opcional)
Se um dia o Protheus deixar de aceitar chamadas direto do navegador (CORS), baixe os arquivos deste repositório numa pasta e abra o `iniciar.bat` (precisa do Node.js). O app abre em `http://localhost:3080` e o `servidor.js` repassa as chamadas para o Protheus.

## Atualizar
Envie de novo o `index.html` alterado (**Add file → Upload files**). O GitHub Pages publica em 1–2 minutos.
