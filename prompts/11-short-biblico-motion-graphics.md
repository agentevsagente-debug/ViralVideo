# Short bíblico com motion graphics: cenário 3D + personagens 2D chapados

Do vídeo **"O Filho Pródigo"**: um short vertical (1080x1920, 30 fps, ~70 s) **feito 100% em código pelo Claude**.
- O cenário é 3D de verdade e os personagens são 2D chapados, com contorno grosso.
- Por cima vem uma camada de **motion graphics**: selos de capítulo, palavras cinéticas, contadores, mapa animado, ícones que surgem na palavra certa e 6 transições temáticas.
- A voz é neural e grátis, e a legenda acende palavra por palavra.

Nada é baixado: nem modelo 3D, nem imagem, nem música. Tudo é desenhado pelo próprio código, inclusive os efeitos sonoros.

**Como usar:**
1. **Instale** o Node.js 20+, o Python 3.10+ com `pip install edge-tts` e o ffmpeg (com o ffprobe) no PATH.
2. **Crie** uma pasta vazia e abra no **Claude Code** (no app do Claude no computador ou no terminal).
3. **Cole** o prompt abaixo e troque o que está entre `[colchetes]`. O Claude para no roteiro para você aprovar.
4. **Renderize** no seu computador com o comando que o Claude te entregar (veja a dica da placa de vídeo no fim).

```text
Você vai produzir um short vertical em Remotion (1080x1920, 30 fps, 55 a 75 s) no estilo
"cenário 3D de verdade + personagens 2D chapados + camada de motion graphics", a partir desta história:

[COLE AQUI: a passagem / a história em poucas linhas. Ex.: "O Filho Pródigo, Lucas 15:11-32"]

Público: [ex.: geral / cristãos / crianças e pais]. Tom: [ex.: fábula com virada emocional].
Chamada no meio do vídeo: [ex.: "se inscreve aí pra mais histórias assim", antes da virada].

## Stack (não troque)
- Remotion 4 + @remotion/three (react-three-fiber) + three. Fontes via @remotion/google-fonts: Cinzel (títulos),
  Montserrat 900 (palavras-chave e números), Lilita One (legenda). Todas as dependências @remotion/* na MESMA versão exata.
- TUDO é função do frame (useCurrentFrame). Proibido Math.random sem semente, useFrame, Date, setTimeout.
  Pseudo-aleatório: rand(n) = frac(sin(n*12.9898)*43758.5453).
- Vozes: Edge TTS (pacote Python edge-tts) com boundary="WordBoundary" para ter o tempo de CADA palavra.
  Narradora: pt-BR-ThalitaMultilingualNeural. Personagens: pt-BR-AntonioNeural mudando rate/pitch
  (pai: -12% / -25Hz; filho jovem: +10% / +25Hz). O script grava public/audio/<nome>/lNN.mp3 e
  src/data/<nome>-timeline.json com início/fim de cada fala e de cada palavra (0,22 s de folga entre as falas).
- Efeitos sonoros gerados com ffmpeg lavfi (sem baixar): whoosh = ruído rosa filtrado com fade;
  moeda = seno 2400 Hz com eco; rachadura = ruído marrom passa-baixa; pop = seno 660 Hz curto.

## Passo 0: livro de regras (números, não adjetivos)
Antes de qualquer cena, escreva REGRAS.md e siga à risca:
- Personagem: altura = 3,5 cabeças; cabeça redonda de raio 100 px num canvas 400x800; contorno 7 px #1d1410
  em TODAS as formas; cor chapada (sem gradiente); olhos = pontos pretos com brilho branco; boca = 1 traço;
  membros = linha de 20 px de contorno com 10 px de cor; mãos = círculo, pés = elipse.
- O personagem é um plano 3D com textura de canvas (meshBasicMaterial, alphaTest 0.4, toneMapped false),
  que gira só no eixo Y para a câmera (billboard cilíndrico), com "facing" ±1 para espelhar.
  Sombra de contato = elipse preta 30% no chão. A textura é desenhada por estado (expressão, boca, braços,
  passo) e guardada em cache pela chave do estado quantizado.
- Cenário: primitivas 3D (box, cylinder, sphere, icosahedron) com meshStandardMaterial e texturas de canvas
  (areia pontilhada, pedra em tijolos, chão rachado). Nunca chão vazio. Duas camadas com a MESMA câmera:
  fundo desfocado por CSS (blur 6 px) e frente nítida. O céu é um gradiente CSS por cena.
- Câmera: corte a cada ~1,2 s e a câmera SEMPRE andando dentro do plano (dolly/arco com ease suave).
  No vertical, recue 1,5x e abra a lente 1,18x em relação ao horizontal.
- Expressão troca no meio de uma piscada (2 quadros antes até 2 depois). Gesto termina 3 a 6 quadros antes da palavra.
- Zonas: grafismos no terço de cima (y 5%–38%), personagens no meio, legenda em ~71% da altura.

## Passo 1: roteiro (fórmula dos shorts virais)
Escreva ROTEIRO_<NOME>.md com 14 a 20 falas curtas, nesta ordem:
1. Gancho que parece impossível (ex.: "pediu a herança com o pai vivo... e ganhou uma festa"), com um flash-forward visual.
2. A história em frases curtas, dividida em 3 ou 4 capítulos.
3. Ponte "Com você é igual: ...".
4. Uma regra de uma linha.
5. Fecho que volta ao gancho (replay em câmera lenta da cena-chave).
Tabela: "# | Quem | Texto | Plano | Motion graphics na palavra". Marque com ✱ tudo que NÃO está escrito no texto-fonte
(leituras, curiosidades de sermão). Fatos só da fonte. **Pare e me mostre o roteiro. Só continue com o meu OK.**

## Passo 2: vozes e tempos
Gere as falas e o timeline. Crie timeline.ts com W(fala, palavra) = frame em que a palavra começa,
LS/LE = início/fim da fala, e mouthFor(quem, frame) para a boca mexer só enquanto aquela voz fala.

## Passo 3: o visual em 5 áreas, um agente por área
Divida em CÂMERA, MUNDO (cenários), MATERIAIS (texturas e cores), PERSONAGENS e ACABAMENTO (motion graphics,
legenda, transições). Cada agente mexe SÓ nos próprios arquivos. A cada rodada, um agente JUIZ monta a folha de contato
(1 quadro por fala, renderStill em escala 0,3 + ffmpeg xstack) e dá nota 0–10 por área, com o defeito e o arquivo.
Repita até todas as áreas terem nota ≥ 8. Defeitos típicos: personagem cortado, câmera mirando o vazio,
objeto tapando a lente, texto quebrando linha, palavras da legenda grudadas, cor do céu errada.

## Passo 4: kit de motion graphics (componentes 2D por cima do 3D, tudo função do frame)
Entrada 6–9 quadros com overshoot (Easing.back 1.6), saída 5–6 quadros, nada aparece de estalo. Paleta: pergaminho
#f3e3c0, tinta #2a1a10, ouro #f2c14e, vermelho-carimbo #c8322e. Em todo bloco de texto: white-space nowrap + width max-content.
- TitleBar (título + pílula da referência) e ChapterSeal (selo "I. A PARTIDA" com brilho que atravessa).
- Kinetic: palavra enorme que entra desfocando (blur 18 → 0), com letter-spacing fechando e "shake" opcional.
- Stamp: carimbo que cai de escala 3 → 1 com tremida no impacto.
- Confetti: partículas com física determinística (posição = v·t + g·t²).
- CoinCounter: número que despenca até 0 na palavra, com moedas voando para fora do quadro
  (use valores que a fonte sustenta, ex.: 100% → 0% "da herança"; número inventado leva ✱).
- MapRoute: mapa de pergaminho em SVG com a rota se desenhando (strokeDashoffset) e um rótulo (ex.: TERRA DISTANTE); na volta, ao contrário.
- Ícones que surgem um por palavra (ex.: roupa, anel, sandálias = 1, 2, 3), FlipWord (PERDIDO gira como moeda e vira ACHADO),
  StrikeText (risco vermelho se desenhando), RuleCard (cartão "REGRA"), ScrollType (pergaminho digitando e depois rasgado),
  SpeedLines (linhas radiais), cartão SE INSCREVE com cursor que clica e sino que balança (genérico, sem logo de plataforma;
  use o nome do SEU canal ou um texto neutro, nunca um nome inventado). Cartões cabem em 90% da largura.

## Passo 5: transições de COBERTURA (só nas viradas, 6 a 9 no vídeo)
A forma cresce até cobrir a tela inteira no frame do corte, o cenário troca POR BAIXO e a forma sai.
É barato (não precisa de duas cenas 3D ao mesmo tempo) e lê como motion graphics.
Rasgo de pergaminho (viagem), chão rachando (fome), luz dourada (decisão/volta), porta de madeira fechando e abrindo
(entrar em casa), moeda gigante girando (virada de sorte), íris fechando (fim). Cada uma com um whoosh 9 quadros antes.

## Passo 6: composição, folha de contato e render
Composition com: cena 3D → vinheta → motion graphics → legenda palavra por palavra (palavra falada em ouro) → transições →
áudio (falas + efeitos). Cena da fome dessaturada (CSS saturate 0.55). Confira a folha de contato antes de renderizar.
Render: npx remotion render <Id> entregas/<Nome>_v1.mp4 --codec=h264 --crf=20 --gl=angle
Confira duração e áudio com ffprobe.

## Cuidados (não negociável)
- Fatos da história só do texto-fonte; o resto com ✱ e aprovado por mim.
- Estilo de gênero, não cópia: personagens, cenários e falas originais. Não recrie personagens, logos ou visual de um canal específico.
- Sem música de terceiros; efeitos gerados em código.

Quando terminar, me diga: caminho do MP4, duração, a folha de contato e o que ficou de fora ou não foi verificado.
```

## O exemplo: "O Filho Pródigo" (Lucas 15:11-32)
| Bloco | O que entra na tela |
|---|---|
| Gancho | Carimbo **HERANÇA** e corte com luz dourada para a festa: **FESTA!** com confete |
| I. A Partida | Moedas se dividem em 2 montes, **mapa** com a rota se desenhando até a **TERRA DISTANTE** |
| Terra distante | Contador da herança despenca de **100% para 0%** na palavra "tudo", com transição de **rasgo de pergaminho** |
| II. A Fome | **Chão rachando**, cena dessaturada, **FOME** tremendo, prato vazio < cocho dos porcos, pães se multiplicando |
| Se inscreve | Cartão com cursor que clica e sino, na fala "Antes da volta: se inscreve aí" |
| III. A Volta | **Luz dourada**, pergaminho digitando "Pai, pequei...", mapa ao contrário (DE VOLTA), linhas de velocidade, **CORREU!** |
| IV. A Festa | **Porta** abrindo, roupa, anel e sandálias surgindo 1-2-3, **PERDIDO** virando **ACHADO**, transição de **moeda** |
| Irmão mais velho | Tela dividida DENTRO × FORA, **TUDO É SEU** |
| Fecho | **ERREI DEMAIS** riscado, cartão da **REGRA**, replay do abraço em câmera lenta com o discurso rasgado ao meio, **íris** |

## Dicas e truques
- **Treine antes de pedir.** Peça para o Claude estudar vídeos de referência quadro a quadro e devolver **números**, não adjetivos (contorno 7 px, 3,5 cabeças). Sem isso sai genérico.
- **Um agente por área + um juiz.** Pedir tudo de uma vez gera personagem cortado e câmera mirando o vazio. Um juiz que dá nota por área acha erros que você não vê, como o céu da cor errada.
- **Folha de contato antes do render.** Um quadro por fala numa imagem só. Custa segundos e economiza renders de minutos.
- **Transição de cobertura em vez de crossfade.** O crossfade precisa de duas cenas 3D vivas ao mesmo tempo, o que dobra o tempo de render. A cobertura esconde o corte de graça.
- **Amarre tudo à palavra.** Com o tempo de cada palavra (WordBoundary), o número aparece exatamente quando a voz diz o número.
- **Texto que quebra linha** é o defeito número 1 de motion graphics em HTML: use `white-space: nowrap` e `width: max-content`.
- **Render rápido na sua máquina:** nas configurações de gráficos do Windows (Sistema › Tela › Gráficos), adicione o navegador que o Remotion usa, `node_modules\.remotion\chrome-headless-shell\win64\chrome-headless-shell-win64\chrome-headless-shell.exe` (ele aparece depois do primeiro render), e escolha **Alto desempenho** (a placa de vídeo dedicada). Renderize com `--gl=angle`.

**Fonte da história:** Lucas 15:11-32. **Vozes:** Edge TTS (serviço da Microsoft); confira os termos antes de monetizar.
