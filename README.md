# Impressão de Pedidos | Grupo 4K

App para imprimir pedidos de venda de amostra no layout do relatório **Foto Atual** (QKRFotoPV) do Protheus, com o logo do Grupo Quatro K, bem mais rápido que pelo sistema.

**Acesse:** https://kuuhaku-vs.github.io/appquatrokpedidos/

## Como usar
1. Abra o link e entre com seu **usuário e senha do Protheus**. Com **Manter conectado** marcado, o site lembra o acesso neste navegador até você clicar em **Sair** (não marque em computador compartilhado). Desmarcado, o acesso vale só enquanto a aba estiver aberta.
2. Escolha o período de **Emissão** e clique em **Buscar pedidos**. Ao clicar numa **Situação** (Em aberto, Liberados, Faturados ou Todos) a lista já é atualizada. O cartão **Amostras em aberto por tipo** segue o mesmo período de emissão e conta somente os pedidos em aberto (não liberados e não faturados). A busca considera as TES de amostra 811, 816, 817 e 827.
3. Clique em qualquer linha da lista para abrir o pedido. A lista mostra Pedido (com a situação: verde = em aberto, amarelo = liberado, vermelho = faturado), Emissão, Cliente + nome (e NF quando faturado), Vendedor 2 + nome, Itens, Obs. Separação e o ícone de impressora quando o pedido já foi impresso (clique no ícone para desfazer).
3. Marque os pedidos e clique em **Imprimir selecionados**. Cada pedido sai em uma folha A4 deitada.
4. Use a caixa **Pedido ou cliente…** ao lado de Lista: a lista é filtrada enquanto você digita (nº do pedido, código ou nome do cliente, vendedor, NF). Se o número não estiver na lista, o site procura no Protheus como pedido ou como cliente (todas as datas e situações). Enter com um só resultado abre o pedido.

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
- **Por tipo:** passe o mouse (ou toque, no celular) numa linha do Top 10 ou de Quem mais solicita para ver a tabela por tipo de amostra (Pilotagem, Bandeira, Cartela etc.) com pedidos e quantidade.
- **Letreiro (AO VIVO):** fica dentro do topo, entre o logo e as abas; passe o mouse para pausar.

Os painéis seguem as **mesmas regras do Relatório Consolidado**: só Tp.Amostra 1 a 6 (Pilotagem, Bandeira, Cartela de cores, PDV, Brindes, Talão de vendas), só TES 811/816/817, quantidade = **C6_QTDEORI** (quantidade original, arredondada para cima por item) e Top 10 agrupado pela descrição. Tags e Desenvolvimento de cor não entram em nenhum painel (dashboard, letreiro e cartão de tipos da tela Pedidos); os pedidos continuam aparecendo normalmente na lista para impressão.

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

### Endereços dos rolos
Pilotagem (e bandeira com "não alterar a cor") sai sempre com até 3 endereços, na ordem do NOVA: primeiro os aprovados pela gramatura (nível baixo primeiro); se não completar 3, entram os demais rolos sem defeito, pela gramatura mais perto do ideal e depois menor CMC. Rolos em REC também entram como endereço (CQSUJO e outros sem número continuam fora). Sem rolo em estoque aparece "SEM ROLO EM ESTOQUE".

### Acompanhamento
- **Pedidos novos:** a cada 30 minutos o site procura pedidos em aberto que ainda não apareceram neste aparelho. Aparece o aviso "N pedidos novos · ver" (e o número na aba do navegador, com um bip). Ao clicar, a lista mostra os em aberto com a etiqueta **NOVO**.
- **Atrasados:** prazo de 7 dias corridos. Pedidos não faturados mostram "há N dias" embaixo da emissão (amarelo perto do prazo, vermelho quando atrasado). O cartão **Atrasados** (ou o botão na Lista) mostra só os atrasados, mais antigos primeiro.
- **Imprimir não impressos:** imprime de uma vez todos os pedidos da lista que ainda não foram impressos.
- **Sem estoque:** nos pedidos com pilotagem, a lista avisa **⚠ sem estoque** quando o item não tem rolo nos armazéns 01/93.
- **Dashboard:** comparação com o mês anterior (mês em andamento comparado até o mesmo dia) e **tempo até faturar** (média de dias da emissão ao faturamento, % dentro do prazo, por tipo e por vendedora).

### Modo TV
No Dashboard, botão **Modo TV**: tela cheia que passa sozinha entre as telas úteis para a separação (Agora, Atrasados, Pilotagens para separar e Em aberto por tipo), a cada 15 segundos, e mantém a tela ligada. Setas ← → trocam a tela, Esc sai. Para abrir direto no Modo TV, use o endereço do site com `?tv` no final (ex.: `.../appquatrokpedidos/?tv`).

### Notificações
Menu do usuário → **Notificações de pedidos novos** (ou Ajustes, no celular):
- **Neste aparelho:** aviso do sistema quando chega pedido novo, com o site aberto.
- **No celular, com o site fechado:** instale o app gratuito **ntfy** e assine o canal mostrado na tela (o canal vem do código do grupo, então é o mesmo para toda a equipe). Em **um** computador que fica sempre com o site aberto (ex.: a TV da separação), ligue **"Este computador envia os avisos para os celulares"**. Ele confere a cada 30 min e avisa o canal.

### Assistente
Bolinha no canto da tela: programação do dia (atrasados, o que vence hoje e amanhã, fila em aberto/liberados, sem estoque), o que teve de novo desde a última visita, como foi ontem e os números do mês. Abre sozinho 1x por dia. 🔊 lê o resumo em voz alta; 🎤 aceita perguntas por voz (Chrome/Edge): "atrasados", "novos", "vencem hoje", "liberados", "tempo até faturar", "pedido 500123", "modo TV", "dashboard", "resumo".
- **Configurações do assistente (⚙):** nome do assistente, como ele te chama, voz (prefere masculina e grave; no Microsoft Edge aparece a voz "Antonio", mais natural), tom e velocidade.
- **Tipos e pilotagens:** o resumo mostra as amostras em aberto por tipo e a lista de pilotagens para separar (item, quantidade e pedidos). Pergunte "pilotagens" ou "tipos".
- **Aviso falado de pedido novo:** quando chega pedido novo, ele avisa pelo nome, dizendo os tipos e, se tiver pilotagem, os itens e as quantidades.
- **Horário de uso:** os avisos de pedido novo só acontecem de segunda a sexta, das 07:30 às 17:18 (ajustável no ⚙), com o site aberto no computador.

### Por que atrasou?
No Dashboard → **Tempo até faturar**, quando há pedidos faturados fora do prazo aparece o botão **"N pedidos passaram do prazo · ver o resumo do porquê"**. Ele abre um resumo: % fora do prazo, atraso médio, tipo e vendedora com mais atrasos, efeito de fim de semana, tamanho dos pedidos, em que etapa o pedido ficou parado (até liberar × da liberação ao faturamento, pela data de liberação da SC9), o pedido que mais destoou e a tabela dos pedidos fora do prazo.

### Assistente (versão simples)
Quatro cartões grandes (Atrasados, Em aberto, Liberados, Pilotagens), algumas linhas curtas e três botões. Clicar em **Atrasados / Em aberto / Liberados** filtra a lista (últimos 180 dias; o × no aviso volta ao filtro normal). **Pilotagens**, tipos, "vencem hoje" e "novos" abrem uma **tabela separada**, que fecha no ✕, no Esc ou clicando fora. As respostas do assistente também têm ✕. No ⚙, o botão **Estilo mordomo** deixa a voz grave e calma.

### Voz premium (Microsoft Azure)
O assistente pode usar uma voz neural do Azure, bem mais natural, com um estilo próprio (calmo e formal, com pausas curtas). Sem chave, ou se o Azure falhar, ele volta sozinho para a voz do navegador.
1. Entre em https://portal.azure.com com uma conta Microsoft (crie uma, se precisar).
2. **Criar um recurso** → procure **"Speech"** (Serviços de Fala / Azure AI Speech) → **Criar**.
3. Escolha a assinatura, crie um grupo de recursos (ex.: `pedidos4k`), região **Brazil South**, um nome qualquer e o tipo de preço **Free F0** (gratuito; se não aparecer, o **Standard S0** cobra por caractere falado).
4. Depois de criado, abra o recurso → **Chaves e Ponto de Extremidade** → copie a **Chave 1** e confira a **Região**.
5. No site: bolinha do assistente → **⚙** → **Voz premium** → cole a chave, escolha a região e a voz (Antonio, Donato, Fabio, Humberto, Julio, Nicolau, Valerio ou Macerio) → **▶ Ouvir amostra** → **Salvar**.
A chave fica salva só no computador em que foi colada (faça o passo 5 em cada computador). Não compartilhe a chave.

### Tipos em aberto → itens
Na tabela **Tipos em aberto** (assistente), clique em um tipo para ver todos os códigos de produto, as quantidades e os pedidos daquele tipo. **‹ Voltar aos tipos** volta para a lista.
