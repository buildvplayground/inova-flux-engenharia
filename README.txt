====================================================================
 SUCESSO EM VENDAS — LP ANÁLISE COMERCIAL (Teste A/B)
 Gerado pelo fluxo BuildV /criar-site + guard-rails Obsidian
====================================================================

ESTRUTURA DA PASTA
------------------
  index.html                          → redireciona para a versão principal (EVIDÊNCIA)
  analise-comercial-evidencia.html    → VERSÃO A (principal / em menu) — ângulo "achismo x evidência"
  analise-comercial-causa.html        → VERSÃO B (slug secundário) — ângulo "sintoma x causa"
  css/styles.css                      → design system compartilhado (as duas páginas usam o mesmo)
  js/app.js                           → CTAs → WhatsApp, menu mobile, FAQ, reveal-on-scroll

Só os 3 blocos marcados (VARIA) diferem entre as duas páginas: HERO, o
bloco de reposicionamento do problema (seção 3) e o CTA FINAL (seção 10).
Todo o resto é idêntico — é isso que torna o teste A/B limpo.

TESTE A/B — COMO PUBLICAR
-------------------------
  • Versão A (principal): analise-comercial-evidencia.html — vai no menu/URL principal.
  • Versão B: analise-comercial-causa.html — publicar como slug /lp-b (ou
    /analise-comercial-causa), FORA do menu.
  • Direcionar o tráfego do Google Ads (cluster "análise comercial") 50/50
    entre as duas URLs e medir conversão de "Solicitar análise gratuita".

CONFORMIDADE VERIFICADA (auditoria Playwright)
----------------------------------------------
  • Sem overflow horizontal de 320px a 1440px (mobile→desktop).
  • Contraste WCAG AA aprovado: texto 15:1, texto secundário 8:1,
    microcopy 4.6:1, branco no azul do botão 8:1, overlines lime 14:1.
  • Reveal-on-scroll com fallback: se o JS falhar, todo o conteúdo aparece
    (estado oculto é condicionado à classe .js; sem IntersectionObserver
    tudo fica visível).
  • prefers-reduced-motion respeitado.
  • Grid de logos carregado UMA única vez (as páginas antigas repetiam 8x).

============  PENDÊNCIAS ANTES DE PUBLICAR (AÇÃO NECESSÁRIA)  ============

1. NÚMERO DE WHATSAPP  → js/app.js, linha "var WA".
   Está com placeholder 5511999999999. Trocar pelo número comercial real.

2. TAGS GTM / MERLIN
   Não foram fornecidas para esta LP. Se a Sucesso em Vendas usa GTM e/ou
   popup Merlin (como na Drive Construtora), me envie os IDs que eu insiro
   o snippet no <head>/<body> e ligo os CTAs ao popup. Hoje os CTAs
   apontam para o WhatsApp (wa.me).

3. IMAGENS (hero + autoridade)
   Estão puxando de thumbnails do Google Drive (funcionam, mas dependem do
   compartilhamento do arquivo ficar público). Para produção, o ideal é
   baixar as imagens finais e servir localmente numa pasta /img.
   IDs usados:
     hero      = 1qjTEXMjqcNWdO5knO1BNvq_r_Zva7Fef
     autoridade= 1-mJBQUmSjAZrAtfh69GTvV5Fd8hqzXb3

4. FORMULÁRIO QUALIFICATÓRIO
   A copy prevê "botão abre formulário qualificatório e direciona ao
   WhatsApp". Hoje o CTA vai direto ao WhatsApp. Se quiser o formulário
   qualificatório antes (nome, empresa, porte), me avise que eu monto.

5. DOMÍNIO / HOSPEDAGEM
   Confirmar onde sobe (lpp.sucessoemvendas.com.br?) para eu ajustar
   canonical, sitemap e os caminhos, se necessário.

Nada de depoimento foi inventado — a seção de falas foi omitida de
propósito porque os textos não foram fornecidos.
