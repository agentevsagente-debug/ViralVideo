# 🏙️ Prompt Maquete: monte uma maquete 3D em código com o Diorama

Este é o prompt do short **"Mundinhos de código"**. Com ele, um agente de IA que roda comandos (Claude Code, por exemplo) monta uma maquete 3D isométrica em **three.js**, do tipo "mundinho de brinquedo": um bloco recortado sobre o papel branco, poucas cores, contorno fino e pessoinhas com articulação de verdade.

Quem faz o trabalho pesado é o **[Diorama](https://github.com/sloemo01/diorama)**, um playbook aberto (licença MIT) de **Nehal Kanak / Sloemo01**. Ele ensina ao agente o visual, a câmera, a construção das pessoinhas e os testes de qualidade. Todo o crédito do método é deles: aqui você só encontra o passo a passo em português e o pedido que usamos.

---

## Do que você precisa
- Um agente de IA que rode comandos no seu computador (Claude Code, por exemplo).
- **git** (ou `curl` + `tar`) e **Node.js 20+**.
- Para os testes de qualidade do Diorama: `three`, `esbuild` e `playwright-core` (o próprio agente instala).

---

## Passo 1: instalar o Diorama (uma vez só)

Cole no agente:

```text
Instale o playbook Diorama e use ele para montar cenas.

Repositório: https://github.com/sloemo01/diorama

1. Abra o README.md do repositório e siga a seção "Install it" ao pé da letra:
   pergunte onde eu quero a pasta antes de baixar (sugira ~/skills/diorama)
   e baixe o repositório inteiro, não só o SKILL.md.
2. Prove a instalação: mostre que SKILL.md, README.md, references/, templates/,
   verify/ e LICENSE estão na pasta e imprima o commit.
3. Leia o SKILL.md inteiro e o references/INDEX.md antes de construir qualquer coisa.
4. Me responda em português, nesta ordem: onde instalou e o commit, o
   "Look Contract" em um parágrafo, o pipeline em passos e três regras do
   SKILL.md com a seção de onde cada uma saiu.
5. Depois me pergunte qual é a primeira maquete. Não me peça para preencher
   a ficha de design.
```

> Se o agente disser que não tem acesso à internet ou ao terminal, pare aqui: o Diorama precisa baixar o repositório para funcionar.

---

## Passo 2: o pedido da maquete (o "prompt" do vídeo)

Na mesma conversa, cole:

```text
Primeira maquete: uma padaria de esquina brasileira, de manhã cedo.

Use o Diorama como fonte da verdade (SKILL.md e references/).
- Visual: o preset padrão, pixel (paleta fixa, contorno de tinta, dither só onde o tom muda).
- Modelos: feitos por você em código (agent-modelled), sem baixar modelos 3D.
- Premissa como verbo: a padaria abre as portas, o padeiro tira a fornada,
  os primeiros clientes chegam, pedem um pingado e um pão na chapa, e um
  ciclista para na esquina para comprar pão quentinho.
- Cenário: esquina com calçada de pedra portuguesa, toldo listrado,
  vitrine com pães e bolos, balcão, duas mesinhas de metal na calçada,
  um poste, uma faixa de pedestre e um pedaço de rua.
- Elenco: padeiro (avental e touca), atendente no balcão, três clientes,
  um ciclista. Todos com articulações de verdade (quadril, joelho,
  cotovelo) e cada um com uma ação clara.
- Detalhes vivos: vapor saindo do café e da fornada, porta da padaria
  abrindo, a placa "ABERTO" virando.
- Câmera: a pose herói padrão do Diorama, com órbita livre.
- Cena em loop, tudo como função de t, sem Math.random.

Siga o pipeline do Diorama: preencha o DESIGN.md com os padrões, monte o
bloco em cinza, depois a produção, e rode os scripts de QA antes de me
mostrar. Me entregue os caminhos dos quadros que você guardou e o que
cada um prova.
```

**Troque a padaria** pelo que você quiser e mantenha o resto do pedido. Ideias que funcionam bem:
- uma **praça** com coreto, pipoqueiro e gente passeando;
- um **ponto de ônibus** com o ônibus chegando e a fila subindo;
- uma **banca de jornal** com o jornaleiro arrumando as revistas;
- uma **feira de rua** com barracas, toldos e o grito da xepa.

Dica: escreva a premissa como **ação** ("a padaria abre e serve os primeiros clientes"), não só como lugar ("uma padaria"). O Diorama monta a cena em cima dessas ações.

---

## Passo 3 (opcional): virar vídeo vertical

A maquete do Diorama roda no navegador e é uma função do tempo `t`, então dá para gravar qualquer quadro.
Se quiser transformar em short (1080x1920, 30 fps) com narração e legenda, use o pipeline desta pasta:
- [`PROMPT_VIRAL_3D.md`](../../PROMPT_VIRAL_3D.md): o prompt para montar o short inteiro (roteiro, vozes neurais grátis em PT-BR, legenda palavra por palavra e render).
- [`README.md`](../../README.md): como instalar e renderizar.

---

## Créditos e licença
- **Diorama** © 2026 Nehal Kanak / Sloemo01, licença MIT: https://github.com/sloemo01/diorama
- Este guia e o pedido da padaria são deste repositório. Não somos afiliados ao autor do Diorama.
