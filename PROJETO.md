# PROJETO — Inova Flux Engenharia (site)

**Cliente:** InovaFlux Engenharia, Planejamento e Gestão Estratégica · Votuporanga–SP
**Slug:** `inova-flux-engenharia` · **Tipo:** site institucional (one-page) · engenharia industrial
**Drive:** https://drive.google.com/drive/folders/1QxOQW_Zip7821aj0k7nSgeggQDufO1mt
**Hospedagem:** ⚠️ indefinida → default HTML estático (ver report). **Atualizado:** 2026-07-16

## Checklist (fonte de verdade p/ retomada)

- [x] **1. Extrair do Drive** — logo, PDF institucional, 6 fotos (3 campo + 3 modelo 3D). Via `curl` (rclone ausente; download direto OK).
- [x] **2. Scaffold + estado** — árvore BuildV; `_raw/` classificado em `Marca/ Copys/ imagens/`; `.gitignore` seguro; `PROJETO.md`+`state.json`.
- [~] **2b. Repositório** — `git init` + commit local ✅. Criar repo GitHub: **pendente** (`gh` não instalado nesta máquina).
- [x] **3. Design system** — paleta ciano→azul (extraída do logo), tipografia Sora+Inter, tokens, componentes. Em `design-system/`.
- [x] **4. Copy** — estruturada por seção em `Copys/copy-estruturada.md` (do PDF institucional).
- [x] **5. Front-end** — `Site/` HTML estático: hero c/ imagem, disciplinas, parceria, planejamento, segurança, 3D/BIM, portfólio (lightbox galeria), metodologia, CTA WhatsApp, footer. Requisitos BuildV aplicados.
- [x] **6. Imagens + responsivo** — fotos → `.webp` (obras + 3D); auditoria de overflow 320→1440px (zero overflow); menu e lightbox testados.
- [~] **7. Módulos LGPD + tags** — banner de cookies + Política de Privacidade + Fornecedores/Trabalhe Conosco + backend PHP ✅. Tags/Merlin: **pendente** (sem IDs).
- [ ] **8. Revisão humana + Deploy** — preview local para revisão; publicação em produção **bloqueada** aguardando hospedagem/domínio/secrets.

## Inventário do material (`_raw/`)
- `logo/logo.jpeg` (1280×960, fundo cinza claro — sem versão transparente/vetor no material).
- `apresentacoes/Portfolio-InovaFlux.pdf` (12 págs — toda a copy institucional).
- `fotos-obras/` 6 JPEG: `obra-01..03` (campo: tubulação/válvulas/flanges) + `obra-04..06` (modelo 3D/BIM da planta de evaporação; obra-06 rotula "LINHA AÇÚCAR/ETANOL", EV-33.xxx).
- Sobrou em `_raw/logo/` um atalho (shortcut) do Drive — ignorado.

## Notas / decisões
- **WhatsApp real** no material: (17) 9 9606-5834 → `wa.me/5517996065834` (usado nos CTAs; confirmar se é o número comercial).
- **Portfólio:** material cobre **1 projeto flagship** (planta de evaporação sucroenergética). Apresentado como "Projeto em Destaque" com galeria de 6 imagens (campo + 3D). Mais fotos de outras obras enriqueceriam o portfólio.
- **Logo:** veio em JPEG com fundo cinza. Gerada versão recolorida/branca para header/footer escuros; ideal receber PNG transparente/SVG do cliente.
- Stack HTML estático (default por hospedagem indefinida). Se Vercel: migrar para Next+Tailwind na etapa de deploy.
