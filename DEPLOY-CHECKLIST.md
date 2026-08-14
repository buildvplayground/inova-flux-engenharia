# ✅ CHECKLIST DE DEPLOYMENT

## 📦 Estrutura de Arquivos para Public HTML

```
public_html/
└── lp/
    └── analise-comercial/
        ├── index.html .......................... Redireciona para /evidencia.html
        ├── evidencia.html ...................... LP A (Principal) - VERSÃO "EVIDÊNCIA"
        ├── causa.html .......................... LP B (Secundária) - VERSÃO "CAUSA"
        ├── .htaccess ........................... Rewrite rules + headers de segurança
        ├── css/
        │   └── styles.css ...................... Design system (WCAG AA, dark mode, etc)
        ├── js/
        │   ├── app.js .......................... Interatividade (mobile menu, FAQ, reveal)
        │   ├── form.js ......................... Processamento de formulário (em breve)
        │   └── whatsapp.js ..................... Popup flutuante e modal de WhatsApp
        ├── forms/
        │   └── submit.php ...................... Backend para processar formulários
        ├── data/
        │   └── submissions.csv ................. Armazenamento de submissões (local)
        ├── img/
        │   └── LOGO-SUCESSO-EM-VENDAS-HORIZONTAL-VERDE.png
        ├── LOGO-SUCESSO-EM-VENDAS-HORIZONTAL-VERDE.png (cópia no root)
        └── robots.txt (global)
```

---

## 🚀 Antes do Deploy

### 1. Validações Finais

- [ ] **HTML Validation**
  ```bash
  html5validator --root ./
  ```

- [ ] **CSS Validation**
  ```bash
  csslint css/styles.css
  ```

- [ ] **JavaScript Linting**
  ```bash
  eslint js/*.js
  ```

- [ ] **Links Check**
  ```bash
  linkchecker http://localhost/lp/analise-comercial/
  ```

- [ ] **WCAG AA Compliance**
  ```bash
  axe-core http://localhost/lp/analise-comercial/
  ```

### 2. Performance Check

- [ ] Page Speed < 2s (Lighthouse)
  ```
  https://pagespeed.web.dev/?url=http://localhost/lp/analise-comercial/
  ```

- [ ] CSS < 50KB minificado
- [ ] JS < 30KB combinado
- [ ] Imagens otimizadas (<200KB hero)

### 3. Mobile Testing

- [ ] iPhone 12 (375px) - OK
- [ ] iPad (768px) - OK
- [ ] Android (360px) - OK
- [ ] Touch interactions - OK
- [ ] Formulário responsivo - OK
- [ ] WhatsApp popup responsivo - OK

### 4. Cross-browser Testing

- [ ] Chrome (latest) - OK
- [ ] Firefox (latest) - OK
- [ ] Safari (latest) - OK
- [ ] Edge (latest) - OK

### 5. Security Check

- [ ] HTTPS confirmado
- [ ] CORS headers configurados
- [ ] CSP header presente
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff

### 6. Forms & WhatsApp

- [ ] Formulário submete corretamente
  - [ ] Validação frontend - OK
  - [ ] Validação backend (PHP) - OK
  - [ ] Dados salvos em CSV - OK
  - [ ] Email de notificação - OK

- [ ] WhatsApp popup funciona
  - [ ] Botão flutuante aparece - OK
  - [ ] Modal abre/fecha - OK
  - [ ] URL WhatsApp correta - OK
  - [ ] Número atualizado - OK

### 7. SEO Preparado

- [ ] Meta tags corretos
- [ ] Open Graph tags presentes
- [ ] robots.txt configurado
- [ ] sitemap.xml criado (se necessário)
- [ ] Canonical tags corretos

### 8. Analytics Integrado

- [ ] Google Analytics ID configurado
- [ ] Eventos de formulário rastreados
- [ ] Eventos de WhatsApp rastreados
- [ ] Goal de conversão criado

---

## 📋 Estrutura de Diretórios

```bash
# Criar estrutura
mkdir -p /var/www/html/lp/analise-comercial/{css,js,forms,data,img}

# Copiar arquivos
cp -r ./uploads/sucesso-em-vendas-analise-comercial/* \
  /var/www/html/lp/analise-comercial/

# Ajustar permissões
chmod 755 /var/www/html/lp/analise-comercial
chmod 755 /var/www/html/lp/analise-comercial/{css,js,forms,data,img}
chmod 644 /var/www/html/lp/analise-comercial/*.html
chmod 644 /var/www/html/lp/analise-comercial/{css,js}/*
chmod 755 /var/www/html/lp/analise-comercial/forms/*.php
chmod 777 /var/www/html/lp/analise-comercial/data  # Para escrita de CSV
```

---

## 🔧 Configurações Necessárias

### 1. Número WhatsApp
**Arquivo:** `js/whatsapp.js` linha 8

```javascript
const WHATSAPP_NUMBER = "5511999999999"; // ← TROCAR AQUI
```

### 2. Email de Notificação
**Arquivo:** `forms/submit.php` linha 53

```php
$to = 'contato@sucessoemvendas.com.br'; // ← TROCAR AQUI
```

### 3. Google Analytics (Opcional)
Adicionar antes de `</body>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## ✨ URLs Finais

### Versão A (Principal)
```
https://www.sucessoemvendas.com.br/lp/analise-comercial/
https://www.sucessoemvendas.com.br/lp/analise-comercial/evidencia.html
```

### Versão B (Secundária)
```
https://www.sucessoemvendas.com.br/lp/analise-comercial/causa.html
```

---

## 📊 Monitoramento Pós-Deploy

### Logs a Verificar
```bash
# Erros PHP
tail -f /var/log/apache2/error.log

# Acessos HTTP
tail -f /var/log/apache2/access.log

# Submissões de formulário
tail -f /var/www/html/lp/analise-comercial/data/submissions.csv
```

### Métricas a Acompanhar
- [ ] Tempo de carregamento (Goal: <2s)
- [ ] Taxa de erro (Goal: <0.1%)
- [ ] Cliques em formulário
- [ ] Submissões de formulário
- [ ] Cliques em WhatsApp
- [ ] Taxa de bounce (Goal: <50%)
- [ ] Tempo na página (Goal: >1min)

---

## ❌ Problemas Comuns & Soluções

### 404 em CSS/JS
**Causa:** Caminho relativo incorreto
**Solução:** Verificar .htaccess e caminhos relativos

### Formulário não submete
**Causa:** Permissão de escrita em /data
**Solução:** `chmod 777 /var/www/html/lp/analise-comercial/data`

### WhatsApp não abre
**Causa:** Número de telefone incorreto
**Solução:** Verificar `js/whatsapp.js` linha 8

### Email não chega
**Causa:** Servidor de email não configurado
**Solução:** Implementar integração com serviço (SendGrid, Mailgun)

### Performance lenta
**Causa:** Imagens não otimizadas
**Solução:** Comprimir com ImageOptim/TinyPNG

---

## ✅ Go-Live Checklist Final

- [ ] Todos os testes passaram
- [ ] Número WhatsApp correto
- [ ] Email de notificação testado
- [ ] Formulário enviando dados
- [ ] Analytics rastreando eventos
- [ ] HTTPS confirmado
- [ ] CDN/Cache configurado
- [ ] Monitoramento ativo
- [ ] Backup feito
- [ ] Rollback plano pronto

---

## 📞 Suporte Pós-Deploy

**Responsável:** 
- Monitoramento: [NOME]
- Atualizações: [NOME]
- Suporte: [EMAIL]

**SLA:** Resposta em 1h para P1 (site down), 4h para P2 (feature broken)

---

**Versão:** 3.0 Deploy Ready  
**Data:** 12 de Agosto de 2026  
**Status:** ✅ Pronto para Publicação
