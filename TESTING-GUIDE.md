# 🧪 GUIA DE TESTES — LANDING PAGES SUCESSO EM VENDAS

## ✅ PRÉ-DEPLOY LOCAL TESTING

### 1️⃣ SETUP LOCAL

```bash
# Instalar servidor local (Python)
cd ./sucesso-em-vendas-analise-comercial
python -m http.server 8000

# Ou usar Node
npx http-server

# Ou usar PHP
php -S localhost:8000
```

**Acessar:** http://localhost:8000/evidencia.html

---

## 2️⃣ TESTES VISUAIS

### Desktop (1280x800)
- [ ] Logo aparece no header
- [ ] Menu funciona
- [ ] Seções alternadas (white/dark) visíveis
- [ ] Imagens carregam
- [ ] Tipografia legível
- [ ] CTA buttons visíveis

### Tablet (768x1024)
```
Em DevTools: Ctrl+Shift+M → iPad
```
- [ ] Texto se adapta
- [ ] Botões acessíveis (44x44px min)
- [ ] Imagens responsivas
- [ ] Menu mobile funciona

### Mobile (375x812)
```
Em DevTools: Ctrl+Shift+M → iPhone 12
```
- [ ] Layout em coluna única
- [ ] Menu hamburger funciona
- [ ] Formulário responsivo
- [ ] WhatsApp botão visível (canto inferior)
- [ ] Touch targets >44px

---

## 3️⃣ TESTES DE ACESSIBILIDADE

### Contraste (DevTools → Lighthouse)
- [ ] Texto vs background: 4.5:1 ✓
- [ ] Links vs background: 4.5:1 ✓
- [ ] Botões vs background: 4.5:1 ✓

### Navegação por Teclado
```
TAB → Navega pelos elementos interativos
ENTER → Ativa botões/links
ESC → Fecha modais
```
- [ ] Tab order lógico
- [ ] Focus outline visível (verde neon)
- [ ] Pula para conteúdo principal
- [ ] Modal fecha com ESC

### Screen Reader (NVDA/JAWS)
```
Usar NVDA (gratuito): https://www.nvaccess.org/
```
- [ ] Cabeçalho navegável
- [ ] Estrutura semântica clara
- [ ] FAQs com aria-expanded
- [ ] SVGs ignorados (aria-hidden)

### Dark Mode
```
Em MacOS: System Preferences → General → Dark
Em Windows: Settings → Personalization → Colors → Dark
Em DevTools: F12 → Rendering → prefers-color-scheme: dark
```
- [ ] Cores legíveis em dark mode
- [ ] Sem inversão automática
- [ ] Contraste mantém 4.5:1

---

## 4️⃣ TESTES DE FORMULÁRIO

### Validação Frontend
```javascript
// No console (F12)
// Tentar submeter vazio
```
- [ ] Nome obrigatório ✓
- [ ] Email obrigatório ✓
- [ ] Email válido (xxx@xxx.xx)
- [ ] Celular obrigatório ✓
- [ ] Empresa obrigatório ✓
- [ ] Cargo obrigatório ✓
- [ ] Área obrigatório ✓
- [ ] Faturamento obrigatório ✓

### Validação Backend (PHP)
```bash
# Testar via cURL
curl -X POST http://localhost:8000/forms/submit.php \
  -d "nome=João&email=joao@teste.com&celular=11999999999&empresa=Teste&cargo=CEO&area=Vendas&faturamento=1M"
```
- [ ] Retorna JSON com sucesso ✓
- [ ] Dados salvos em CSV ✓
- [ ] Email enviado ✓

### Dados em CSV
```bash
cat ./data/submissions.csv
```
- [ ] Arquivo criado ✓
- [ ] Cabeçalho presente ✓
- [ ] Dados pipe-delimitados ✓
- [ ] Timestamp correto ✓

---

## 5️⃣ TESTES DE WHATSAPP

### Botão Flutuante
- [ ] Aparece canto inferior direito
- [ ] Verde neon (#BDFF63)
- [ ] Ícone WhatsApp visível
- [ ] Clicável

### Modal
- [ ] Abre ao clicar botão flutuante
- [ ] Background escuro overlay
- [ ] Botão fechar (X) funciona
- [ ] Fecha ao clicar fora
- [ ] Fecha com ESC

### URL WhatsApp
```javascript
// No console
WhatsApp.getURL()
```
- [ ] Formato correto: `https://wa.me/5511999999999`
- [ ] Abre em nova aba
- [ ] Número atualizado

---

## 6️⃣ TESTES DE PERFORMANCE

### Lighthouse (DevTools)
```
F12 → Lighthouse → Analyze page load
```
- [ ] Performance: 90+ ✓
- [ ] Accessibility: 95+ ✓
- [ ] Best Practices: 90+ ✓
- [ ] SEO: 90+ ✓

### Tamanho de Arquivos
```bash
du -h css/styles.css
du -h js/app.js js/whatsapp.js
```
- [ ] CSS < 50KB ✓
- [ ] JS total < 30KB ✓
- [ ] Imagens hero < 200KB ✓

### Velocidade
```
Goal: < 2 segundos carregamento
```
- [ ] First Contentful Paint < 1.5s ✓
- [ ] Largest Contentful Paint < 2.5s ✓
- [ ] Cumulative Layout Shift < 0.1 ✓

---

## 7️⃣ TESTES CROSS-BROWSER

### Chrome/Chromium
```bash
# Windows
start chrome http://localhost:8000/evidencia.html

# Mac
open -a "Google Chrome" http://localhost:8000/evidencia.html
```
- [ ] Renderiza correto
- [ ] Sem erros console

### Firefox
```bash
firefox http://localhost:8000/evidencia.html
```
- [ ] Layout idêntico ao Chrome
- [ ] Sem erros console

### Safari (Mac)
```bash
open -a Safari http://localhost:8000/evidencia.html
```
- [ ] Renderiza correto
- [ ] Transitions funcionam

### Edge
```bash
start msedge http://localhost:8000/evidencia.html
```
- [ ] Sem diferenças ao Chrome

---

## 8️⃣ TESTES A/B

### Versão A — EVIDÊNCIA
```
URL: http://localhost:8000/evidencia.html
```
- [ ] Hero: "Análise que troca achismo por evidência"
- [ ] Seção 3: "Custo da Decisão"
- [ ] CTA final: "Sua próxima decisão pode nascer de evidência"

### Versão B — CAUSA
```
URL: http://localhost:8000/causa.html
```
- [ ] Hero: "Análise que encontra a causa, não o sintoma"
- [ ] Seção 3: "Sintoma e Causa" com 4 bullets
- [ ] CTA final: "Descubra o que está travando"

### Diferenças Confirmadas
- [ ] Copy diferente em 3+ seções
- [ ] CTAs diferentes
- [ ] Estrutura HTML idêntica (facilita A/B)

---

## 9️⃣ TESTES HTML/CSS/JS

### Validação HTML
```bash
html5validator --root ./
```
- [ ] Sem erros W3C ✓
- [ ] Doctype correto
- [ ] Meta tags presentes

### Validação CSS
```bash
csslint css/styles.css
```
- [ ] Sem erros críticos
- [ ] Variables definidas
- [ ] Media queries funcionam

### Testes JS (Console F12)
```javascript
// Verificar variáveis globais
window.WhatsApp
// Deve retornar: {openModal: ƒ, closeModal: ƒ, getURL: ƒ, setNumber: ƒ}

// Teste de função
WhatsApp.openModal()
// Deve abrir modal

// Teste de URL
console.log(WhatsApp.getURL())
// Deve retornar URL WhatsApp válida
```
- [ ] Sem erros console
- [ ] Funções definidas
- [ ] Event listeners funcionam

---

## 🔟 TESTES DE SEGURANÇA

### Headers (via DevTools → Network)
```
X-Frame-Options: SAMEORIGIN ✓
X-Content-Type-Options: nosniff ✓
```
- [ ] Headers presentes
- [ ] HTTPS em produção

### Formulário
- [ ] Inputs sanitizados (PHP)
- [ ] Sem SQL injection possível
- [ ] Sem XSS possível
- [ ] Email validado

### Arquivo CSV
- [ ] Protegido de download direto (.htaccess)
- [ ] Permissões corretas

---

## CHECKLIST FINAL PRÉ-PUBLICAÇÃO

```
VISUAIS & DESIGN
[ ] Logo aparece corretamente
[ ] Cores corretas (verde #BDFF63, escuro #171C24, cinza #D8D8D8)
[ ] Imagens carregam
[ ] Alternância white/dark visível

FUNCIONALIDADE
[ ] Menu mobile abre/fecha
[ ] FAQ accordion expande/contrai
[ ] Formulário valida campos
[ ] WhatsApp popup funciona
[ ] Links funcionam

ACESSIBILIDADE
[ ] Contraste 4.5:1 OK
[ ] Navegação por teclado OK
[ ] Focus outline visível
[ ] Dark mode legível
[ ] Screen reader OK

PERFORMANCE
[ ] Lighthouse Score A+
[ ] Tempo carregamento <2s
[ ] Arquivos otimizados
[ ] Sem console errors

CROSS-BROWSER
[ ] Chrome OK
[ ] Firefox OK
[ ] Safari OK
[ ] Edge OK
[ ] Mobile OK

SEGURANÇA
[ ] Headers corretos
[ ] Formulário sanitizado
[ ] Sem vulnerabilidades óbvias

GO-LIVE
[ ] WhatsApp número atualizado
[ ] Email configurado
[ ] .htaccess testado
[ ] Backup feito
[ ] Rollback plano pronto
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### Logo não aparece
```
Checklist:
1. Arquivo existe: img/LOGO-SUCESSO-EM-VENDAS-HORIZONTAL-VERDE.png
2. Caminho relativo correto no HTML
3. CSS height: 40px aplicado
4. Nenhuma règra CSS hide (display: none)
```

### Formulário não submete
```
Checklist:
1. URL do form: forms/submit.php
2. Método POST correto
3. chmod 777 /data
4. PHP ativado no servidor
5. Verificar console (F12) para erros
```

### WhatsApp não abre
```
Checklist:
1. Número atualizado em js/whatsapp.js linha 8
2. Sem erros console (F12)
3. Testado em desktop e mobile
4. URL válida: wa.me/55...
```

### Performance lenta
```
Checklist:
1. Imagens otimizadas <200KB
2. Lighthouse Score A+
3. Cache headers OK
4. GZIP compressão OK
5. Verificar Network tab (F12)
```

### CSS/JS não carrega
```
Checklist:
1. .htaccess ativo
2. Caminhos relativos corretos
3. MIME types corretos
4. Permissões arquivo (644)
5. Developer Tools Network tab (F12)
```

---

## 📊 RASTREAMENTO PÓS-PUBLICAÇÃO

### Google Analytics
```javascript
// Adicionar em ambos HTML files antes de </body>
gtag('event', 'page_view', {
  'page_path': location.pathname,
  'page_title': document.title
});

// Rastrear cliques WhatsApp
document.getElementById('whatsapp-float-btn').addEventListener('click', function() {
  gtag('event', 'whatsapp_click', {
    'event_category': 'engagement'
  });
});
```

### Eventos a Rastrear
- Visualizações de página (A vs B)
- Cliques em WhatsApp
- Submissões de formulário
- Tempo na página
- Scroll depth

---

**Próximo Passo:** Após passar por todos testes, seguir DEPLOY-CHECKLIST.md para publicação em produção.

---

**Versão:** 1.0 Test Complete  
**Data:** 12 de Agosto de 2026
