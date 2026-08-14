# PROJETO — Inova Flux Engenharia (site)

**Cliente:** InovaFlux Engenharia, Planejamento e Gestão Estratégica · Votuporanga–SP
**Slug:** `inova-flux-engenharia` · **Tipo:** site institucional (one-page) · engenharia industrial
**Drive (material inicial):** https://drive.google.com/drive/folders/1QxOQW_Zip7821aj0k7nSgeggQDufO1mt
**Drive (12 projetos do portfólio):** https://drive.google.com/drive/folders/1HioYtmCdhHgTJLqsj4mCZFaugRPMXNGm
**Repositório:** https://github.com/buildvplayground/inova-flux-engenharia (`origin`)
· antigo `dev-buildv/inova-flux-engenharia` mantido como remote `antigo`
**Hospedagem:** ⚠️ indefinida → default HTML estático (ver report). **Atualizado:** 2026-08-14

## Checklist (fonte de verdade p/ retomada)

- [x] **1. Extrair do Drive** — logo, PDF institucional, 6 fotos (3 campo + 3 modelo 3D). Via `curl` (rclone ausente; download direto OK).
- [x] **2. Scaffold + estado** — árvore BuildV; `_raw/` classificado em `Marca/ Copys/ imagens/`; `.gitignore` seguro; `PROJETO.md`+`state.json`.
- [x] **2b. Repositório** — GitHub ✅. `origin` = `buildvplayground/inova-flux-engenharia` (privado, branch `main`); o repo anterior `dev-buildv/…` ficou como remote `antigo`.
- [x] **3. Design system** — paleta ciano→azul (extraída do logo), tipografia Sora+Inter, tokens, componentes. Em `design-system/` (sincronizado com o CSS em 2026-07-28).
- [x] **4. Copy** — estruturada por seção em `Copys/copy-estruturada.md` (do PDF institucional).
- [x] **5. Front-end** — `Site/` HTML estático: hero c/ imagem, disciplinas, parceria, planejamento, segurança, 3D/BIM, portfólio (lightbox galeria), metodologia, CTA WhatsApp, footer. Requisitos BuildV aplicados.
- [x] **6. Imagens + responsivo** — fotos → `.webp` (obras + 3D); auditoria de overflow 320→1440px (zero overflow); menu e lightbox testados.
- [x] **7. Módulos LGPD + tags** — banner de cookies + Política de Privacidade + Fornecedores/Trabalhe Conosco + backend PHP (PDO, prepared statements, uploads protegidos) ✅. GTM `GTM-KP6CF49C` instalado nas 3 páginas; Merlin (popup) instalado ✅.
- [x] **7b. Portfólio de projetos (12 obras)** — seção `#projetos`: grade filtrável (4 áreas) + galeria por projeto via `data-gallery`.
- [x] **7c. Galerias completas (2026-08-14)** — +58 fotos convertidas p/ `.webp`; **107 `.webp`** em `Site/assets/img/projetos/` (29,6 MB). Todo o material-fonte do Drive publicado.
- [ ] **8. Revisão humana + Deploy** — 🛑 preview local em http://localhost:4321 para revisão; publicação em produção **bloqueada** aguardando hospedagem/domínio/secrets.

## Validação (medição, sem depender de screenshot)
- Overflow horizontal **0** em 320 / 375 / 768 / 1366 px (aceite BuildV atingido).
- Lightbox: abre/navega ‹ › / contador "N/total" / Esc / trava scroll / devolve o foco — OK.
  Duas fontes suportadas: accordion do destaque (galeria única) e cards de projeto (galeria própria).
- Filtro do portfólio: 4 chips + estado `aria-pressed` + mensagem de vazio — OK.
- Fontes Sora+Inter carregadas; **113 referências de imagem, 0 quebradas, 0 arquivos órfãos**
  (verificado em 2026-08-14 cruzando `index.html` × `Site/assets/img/`).
- Galerias: `data-count`, tamanho do `data-gallery` e o rótulo "N fotos" conferem nos 12 cards;
  lightbox abre em "1 / 33" na maior galeria e dá wrap para "33 / 33". Console sem erros.
- Sem erros no console. Screenshots amplos falham (limitação conhecida do sandbox) → revisão estética fina no preview pelo usuário.

## Preview local
`node preview-server.js` (servidor estático sem dependências, serve `Site/` na porta 4321) —
ou o config `inova-flux` em `.claude/launch.json`. Arquivo é tooling local, fora do git.

## Inventário do material

### Lote 1 — `_raw/` (institucional)
- `logo/logo.jpeg` (1280×960, fundo cinza claro — sem versão transparente/vetor no material).
- `apresentacoes/Portfolio-InovaFlux.pdf` (12 págs — toda a copy institucional).
- `fotos-obras/` 6 JPEG: `obra-01..03` (campo: tubulação/válvulas/flanges) + `obra-04..06` (modelo 3D/BIM da planta de evaporação; obra-06 rotula "LINHA AÇÚCAR/ETANOL", EV-33.xxx).
  → viram o hero, os splits e o accordion "Projeto em Destaque".
- Sobrou em `_raw/logo/` um atalho (shortcut) do Drive — ignorado.

### Lote 2 — `imagens/novas-imagens-inovaflux/` (12 projetos, 118 JPEG)
Cada pasta do Drive nomeada pelo trabalho executado. Publicados em `Site/assets/img/projetos/<slug>/NN.webp`:

Contagem por pasta separando **fotos** de **vídeos** (as pastas contêm MP4/MOV, que o site não usa).
Coluna "no site" atualizada em **2026-08-14**, após a sincronização completa das galerias:

| Pasta de origem (Drive) | Slug no site | Cat. | Fotos | Vídeos | No site |
|---|---|---|---|---|---|
| Acompanhamento de montagem da destilaria | `montagem-destilaria` | sucro | 8 | 0 | **8** ✔ |
| Acompanhameto de montagem e teste da esteira de açucar | `esteira-acucar` | sucro | 33 | 4 | **33** ✔ |
| Avalição para o instalação de valvula de segurança | `valvula-seguranca` | sucro | 9 | 0 | **9** ✔ |
| acompanhamento de manutenção de entressafra | `manutencao-entressafra` | sucro | 4 | 0 | 4 ✔ |
| comissionamento de linha de embebição da moenda | `comissionamento-embebicao` | sucro | 12 | 3 | **12** ✔ |
| projeto de duplo bloqueio em evaporação | `duplo-bloqueio-evaporacao` | bim | 3 | 2 | 3 ✔ |
| Avaliação projeto 3d de moenda | `projeto-3d-moenda` | bim | 1 | 1 | 1 ✔ |
| Levantamento para projeto de rtrofit de torre de resfriamento | `retrofit-torre-resfriamento` | bim | 26 | 0 | **26** ✔ |
| Projeto de combate a incendio | `combate-incendio` | bim | 3 | 0 | 3 ✔ |
| Diligenciamento e inspeção de bombas | `inspecao-bombas` | insp | 3 | 0 | 3 ✔ |
| Inspeção sitema de monovia | `sistema-monovia` | insp | 3 | 0 | 3 ✔ |
| Inspeção em baldrame residencial | `baldrame-residencial` | civil | 2 | 1 | 2 ✔ |
| **TOTAL** | | | **107** | **11** | **107** |

**Todas as fotos-fonte do Drive estão publicadas.** Não existe mais material não aproveitado.

Distribuição dos filtros: `sucro` 5 · `bim` 4 · `insp` 2 · `civil` 1 — **12 cards** (múltiplo de 3,
fecha as linhas da grade no desktop).

### Correção do diagnóstico de 2026-07-28
O relatório anterior apontava 3 projetos "abaixo do próprio material" (moenda 2→1, baldrame 3→2,
duplo bloqueio 5→3). **Estava errado:** a diferença eram os **vídeos** MP4/MOV nas pastas, não
fotos não aproveitadas. Esses três projetos já estavam completos.

### Como a sincronização foi feita (reprodutível)
Casamento por **dHash perceptual** (Hamming ≤ 6) entre os `.webp` já publicados e as fotos-fonte,
para descobrir o que faltava sem duplicar. Duas armadilhas encontradas:
- **EXIF orientation=6** em 3 fontes (`2001114F…`, `FC8B42FD…`, `A19F469C…`, todas 3840×2160):
  sem `ImageOps.exif_transpose` o hash da foto girada não casa com a versão publicada já
  endireitada, e elas apareciam como "novas". `scripts_img.py` **não** aplica exif_transpose —
  corrigir antes de reusá-lo.
- **Recorte:** `projeto-3d-moenda/01.webp` é `FC8B42FD…` com a barra de tarefas do Windows
  cortada. O hash não pega recorte; foi confirmado visualmente e excluído da republicação.

## Notas / decisões
- **WhatsApp real** no material: (17) 9 9606-5834 → `wa.me/5517996065834` (usado nos CTAs; confirmar se é o número comercial). Centralizado em `app.js` (`WA_NUMBER`).
- **Teto de 6 fotos por card removido em 2026-08-14** a pedido do cliente ("incluir novas imagens
  nos projetos que já existem"). Galerias agora refletem 100% das fotos do Drive. O peso inicial da
  página não muda: só as 12 capas carregam (`loading="lazy"`); as demais entram sob demanda na lightbox.
- ⚠️ **Curadoria pendente.** O material é de documentação/inspeção de campo, não fotografia de
  portfólio. Nas duas maiores galerias há quadros fracos para vitrine (chão molhado/vazio, piso com
  entulho, close de plaqueta, foto escura, gente de costas). Candidatos a corte listados na task;
  se o cliente aprovar, é só apagar os `.webp` e rodar de novo o gerador de `data-gallery`.
- **`data-gallery` é derivado do disco.** Script idempotente em scratchpad regera `data-gallery`,
  `data-count` e o rótulo "N fotos" a partir dos arquivos em `Site/assets/img/projetos/<slug>/`.
  Ao adicionar/remover foto, rode-o em vez de editar o HTML à mão.
- **Logo:** veio em JPEG com fundo cinza. Gerada versão recolorida/branca para header/footer escuros; ideal receber PNG transparente/SVG do cliente.
- **Movimento:** `prefers-reduced-motion` está desligado por decisão de projeto — ver `design-system/design-system.md` e a nota em `Site/css/styles.css:607`.
- Stack HTML estático (default por hospedagem indefinida). Se Vercel: migrar para Next+Tailwind na etapa de deploy.
