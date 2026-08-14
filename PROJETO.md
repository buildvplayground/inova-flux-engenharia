# PROJETO — Inova Flux Engenharia (site)

**Cliente:** InovaFlux Engenharia, Planejamento e Gestão Estratégica · Votuporanga–SP
**Slug:** `inova-flux-engenharia` · **Tipo:** site institucional (one-page) · engenharia industrial
**Drive (material inicial):** https://drive.google.com/drive/folders/1QxOQW_Zip7821aj0k7nSgeggQDufO1mt
**Drive (12 projetos do portfólio):** https://drive.google.com/drive/folders/1HioYtmCdhHgTJLqsj4mCZFaugRPMXNGm
**Hospedagem:** ⚠️ indefinida → default HTML estático (ver report). **Atualizado:** 2026-07-28

## Checklist (fonte de verdade p/ retomada)

- [x] **1. Extrair do Drive** — logo, PDF institucional, 6 fotos (3 campo + 3 modelo 3D). Via `curl` (rclone ausente; download direto OK).
- [x] **2. Scaffold + estado** — árvore BuildV; `_raw/` classificado em `Marca/ Copys/ imagens/`; `.gitignore` seguro; `PROJETO.md`+`state.json`.
- [~] **2b. Repositório** — `git init` + commit local ✅. Criar repo GitHub: **pendente** (`gh` não instalado nesta máquina).
- [x] **3. Design system** — paleta ciano→azul (extraída do logo), tipografia Sora+Inter, tokens, componentes. Em `design-system/` (sincronizado com o CSS em 2026-07-28).
- [x] **4. Copy** — estruturada por seção em `Copys/copy-estruturada.md` (do PDF institucional).
- [x] **5. Front-end** — `Site/` HTML estático: hero c/ imagem, disciplinas, parceria, planejamento, segurança, 3D/BIM, portfólio (lightbox galeria), metodologia, CTA WhatsApp, footer. Requisitos BuildV aplicados.
- [x] **6. Imagens + responsivo** — fotos → `.webp` (obras + 3D); auditoria de overflow 320→1440px (zero overflow); menu e lightbox testados.
- [x] **7. Módulos LGPD + tags** — banner de cookies + Política de Privacidade + Fornecedores/Trabalhe Conosco + backend PHP (PDO, prepared statements, uploads protegidos) ✅. GTM `GTM-KP6CF49C` instalado nas 3 páginas; Merlin (popup) instalado ✅.
- [x] **7b. Portfólio de projetos (12 obras)** — seção `#projetos`: grade filtrável (4 áreas) + galeria por projeto via `data-gallery`. 49 `.webp` em `Site/assets/img/projetos/`.
- [ ] **8. Revisão humana + Deploy** — 🛑 preview local em http://localhost:4321 para revisão; publicação em produção **bloqueada** aguardando hospedagem/domínio/secrets.

## Validação (medição, sem depender de screenshot)
- Overflow horizontal **0** em 320 / 375 / 768 / 1366 px (aceite BuildV atingido).
- Lightbox: abre/navega ‹ › / contador "N/total" / Esc / trava scroll / devolve o foco — OK.
  Duas fontes suportadas: accordion do destaque (galeria única) e cards de projeto (galeria própria).
- Filtro do portfólio: 4 chips + estado `aria-pressed` + mensagem de vazio — OK.
- Fontes Sora+Inter carregadas; **55 referências de imagem, 0 quebradas, 0 arquivos órfãos**
  (verificado em 2026-07-28 cruzando `index.html` × `Site/assets/img/`).
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

| Pasta de origem (Drive) | Slug no site | Cat. | Fonte | No site |
|---|---|---|---|---|
| Acompanhamento de montagem da destilaria | `montagem-destilaria` | sucro | 8 | 6 |
| Acompanhameto de montagem e teste da esteira de açucar | `esteira-acucar` | sucro | 37 | 6 |
| Avalição para o instalação de valvula de segurança | `valvula-seguranca` | sucro | 9 | 6 |
| acompanhamento de manutenção de entressafra | `manutencao-entressafra` | sucro | 4 | 4 |
| comissionamento de linha de embebição da moenda | `comissionamento-embebicao` | sucro | 15 | 6 |
| projeto de duplo bloqueio em evaporação | `duplo-bloqueio-evaporacao` | bim | 5 | **3** |
| Avaliação projeto 3d de moenda | `projeto-3d-moenda` | bim | 2 | **1** |
| Levantamento para projeto de rtrofit de torre de resfriamento | `retrofit-torre-resfriamento` | bim | 26 | 6 |
| Projeto de combate a incendio | `combate-incendio` | bim | 3 | 3 |
| Diligenciamento e inspeção de bombas | `inspecao-bombas` | insp | 3 | 3 |
| Inspeção sitema de monovia | `sistema-monovia` | insp | 3 | 3 |
| Inspeção em baldrame residencial | `baldrame-residencial` | civil | 3 | **2** |

Distribuição dos filtros: `sucro` 5 · `bim` 4 · `insp` 2 · `civil` 1 — **12 cards** (múltiplo de 3,
fecha as linhas da grade no desktop).

## Notas / decisões
- **WhatsApp real** no material: (17) 9 9606-5834 → `wa.me/5517996065834` (usado nos CTAs; confirmar se é o número comercial). Centralizado em `app.js` (`WA_NUMBER`).
- **Teto de 6 fotos por card** no portfólio (galeria enxuta + peso de página). Projetos com
  material acima disso ficaram com uma curadoria; **3 projetos ficaram abaixo do próprio material
  disponível** (moenda 2→1, baldrame 3→2, duplo bloqueio 5→3) — ampliar é opcional.
- **Logo:** veio em JPEG com fundo cinza. Gerada versão recolorida/branca para header/footer escuros; ideal receber PNG transparente/SVG do cliente.
- **Movimento:** `prefers-reduced-motion` está desligado por decisão de projeto — ver `design-system/design-system.md` e a nota em `Site/css/styles.css:607`.
- Stack HTML estático (default por hospedagem indefinida). Se Vercel: migrar para Next+Tailwind na etapa de deploy.
