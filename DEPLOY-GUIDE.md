# 📦 GUIA DE DEPLOY — Public HTML

## 📁 Estrutura de Pastas para Deploy

```
public_html/
├── lp/
│   ├── analise-comercial/
│   │   ├── index.html (redireciona para evidencia)
│   │   ├── evidencia.html (LP A - VERSÃO PRINCIPAL)
│   │   ├── causa.html (LP B - VERSÃO SECUNDÁRIA)
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── js/
│   │   │   ├── app.js (interatividade, mobile menu, FAQ)
│   │   │   ├── form.js (integração formulário)
│   │   │   └── whatsapp.js (popup WhatsApp)
│   │   ├── img/
│   │   │   └── logo-sucesso-em-vendas.png
│   │   └── forms/
│   │       └── submit.php (processamento de formulário)
│   └── .htaccess (rewrite rules)
└── robots.txt
```

---

## 🔗 URLs de Acesso

### Versão A (EVIDÊNCIA) - Principal
```
https://www.sucessoemvendas.com.br/lp/analise-comercial/
https://www.sucessoemvendas.com.br/lp/analise-comercial/evidencia.html
```

### Versão B (CAUSA) - Secundária
```
https://www.sucessoemvendas.com.br/lp/analise-comercial/causa.html
```

---

## 📝 Formulário de Contato — Integração

### Campos do Formulário (Incorporado nas LPs)

```html
<form id="contact-form" action="/lp/analise-comercial/forms/submit.php" method="POST">
  <input type="hidden" name="landing_page" value="analise-comercial-evidencia">
  
  <!-- Nome -->
  <input type="text" name="nome" placeholder="Nome" required>
  
  <!-- E-mail -->
  <input type="email" name="email" placeholder="E-mail" required>
  
  <!-- Celular -->
  <input type="tel" name="celular" placeholder="Número de celular" required>
  
  <!-- Empresa -->
  <input type="text" name="empresa" placeholder="Nome da empresa" required>
  
  <!-- Cargo -->
  <select name="cargo" required>
    <option value="">Cargo</option>
    <option value="dono">Dono (a)/ Proprietário (a) / C-Level</option>
    <option value="diretor">Diretor (a)</option>
    <option value="gestor">Gestor (a)</option>
    <option value="coordenador">Coordenador (a)</option>
    <option value="supervisor">Supervisor (a)</option>
    <option value="business_partner">Business Partner</option>
  </select>
  
  <!-- Área -->
  <select name="area" required>
    <option value="">Área</option>
    <option value="vendas">Vendas</option>
    <option value="marketing">Marketing</option>
    <option value="rh">Recursos Humanos</option>
    <option value="compras">Compras</option>
    <option value="inteligencia">Inteligência de Mercado/Comercial</option>
    <option value="growth">Growth / Receita</option>
    <option value="sucesso_cliente">Sucesso do Cliente</option>
    <option value="financeiro">Financeiro</option>
  </select>
  
  <!-- Website -->
  <input type="url" name="website" placeholder="Website">
  
  <!-- Faixa de Faturamento -->
  <select name="faturamento" required>
    <option value="">Faixa de faturamento</option>
    <option value="ate_10m">Até 10 milhões</option>
    <option value="10_20m">De 10 a 20 milhões</option>
    <option value="20_50m">De 20 a 50 milhões</option>
    <option value="50_100m">De 50 a 100 milhões</option>
    <option value="100_300m">De 100 a 300 milhões</option>
    <option value="300_500m">De 300 a 500 milhões</option>
    <option value="500m_1b">De 500 a 1 bilhão</option>
    <option value="1b_plus">1 bilhão ou superior</option>
  </select>
  
  <!-- Mensagem -->
  <textarea name="mensagem" placeholder="Mensagem" rows="5"></textarea>
  
  <!-- Checkbox consentimento -->
  <input type="checkbox" name="consentimento" required>
  <label>Concordo em receber informações sobre as soluções da Sucesso em Vendas</label>
  
  <!-- Botão -->
  <button type="submit" class="btn btn-cta">Quero melhorar minhas vendas!</button>
</form>
```

---

## 💬 WhatsApp Popup — Integração

### JavaScript para Popup
```javascript
// Configuração WhatsApp
const WHATSAPP_NUMBER = "55"; // Código do país
const WHATSAPP_MESSAGE = "Olá! Gostaria de solicitar a análise comercial gratuita.";

// Botão flutuante de WhatsApp
function initWhatsAppPopup() {
  const whatsappButton = document.querySelector('[data-whatsapp]');
  if (whatsappButton) {
    whatsappButton.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";
  }
}

// Modal de WhatsApp
function showWhatsAppModal() {
  const modal = document.querySelector('#whatsapp-modal');
  if (modal) modal.classList.add('visible');
}

function closeWhatsAppModal() {
  const modal = document.querySelector('#whatsapp-modal');
  if (modal) modal.classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', initWhatsAppPopup);
```

### HTML para Popup
```html
<!-- Botão WhatsApp Flutuante (canto inferior direito) -->
<a href="#" data-whatsapp class="whatsapp-btn" title="Fale conosco via WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <!-- Ícone WhatsApp -->
  </svg>
  <span>Fale com a gente</span>
</a>

<!-- Modal WhatsApp -->
<div id="whatsapp-modal" class="whatsapp-modal">
  <div class="whatsapp-modal-content">
    <button class="close-modal" onclick="closeWhatsAppModal()">×</button>
    <h3>Converse com um especialista</h3>
    <p>Clique no botão abaixo para iniciar uma conversa via WhatsApp</p>
    <a href="#" data-whatsapp class="btn btn-cta" style="margin-top: 20px;">
      Iniciar chat via WhatsApp
    </a>
  </div>
</div>
```

### CSS para Popup
```css
/* Botão WhatsApp flutuante */
.whatsapp-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  background: #25D366;
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.whatsapp-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
}

.whatsapp-btn svg {
  width: 28px;
  height: 28px;
}

.whatsapp-btn span {
  display: none;
}

/* Modal */
.whatsapp-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.whatsapp-modal.visible {
  opacity: 1;
  visibility: visible;
}

.whatsapp-modal-content {
  background: white;
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #666;
}
```

---

## 🚀 Passos para Deploy

### 1. Preparar Arquivos
```bash
# Copiar estrutura para public_html
cp -r sucesso-em-vendas-analise-comercial/ /var/www/html/lp/analise-comercial/
```

### 2. Criar .htaccess para Rewrite Rules
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /lp/analise-comercial/
  
  # Redirecionar raiz para evidencia
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^$ index.html [L]
  
  # Rewrite para arquivo correto
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ index.html [L]
</IfModule>
```

### 3. Configurar PHP para Formulário
```php
<?php
// /lp/analise-comercial/forms/submit.php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  exit(json_encode(['error' => 'Método não permitido']));
}

// Validar dados
$required = ['nome', 'email', 'celular', 'empresa', 'cargo', 'area', 'faturamento'];
foreach ($required as $field) {
  if (empty($_POST[$field])) {
    http_response_code(400);
    exit(json_encode(['error' => "Campo $field é obrigatório"]));
  }
}

// Sanitizar inputs
$data = [
  'landing_page' => $_POST['landing_page'] ?? 'analise-comercial',
  'nome' => sanitize($_POST['nome']),
  'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
  'celular' => sanitize($_POST['celular']),
  'empresa' => sanitize($_POST['empresa']),
  'cargo' => sanitize($_POST['cargo']),
  'area' => sanitize($_POST['area']),
  'website' => filter_var($_POST['website'] ?? '', FILTER_SANITIZE_URL),
  'faturamento' => sanitize($_POST['faturamento']),
  'mensagem' => sanitize($_POST['mensagem'] ?? ''),
  'data_submissao' => date('Y-m-d H:i:s'),
  'ip' => $_SERVER['REMOTE_ADDR']
];

// Salvar em banco de dados ou enviar por email
// TODO: Implementar integração com sistema de CRM

// Redirect para WhatsApp
$whatsapp_url = "https://wa.me/55?text=" . urlencode($data['nome'] . " - " . $data['email']);

exit(json_encode([
  'success' => true,
  'message' => 'Formulário enviado com sucesso',
  'whatsapp_url' => $whatsapp_url
]));

function sanitize($input) {
  return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
?>
```

### 4. Testes Pre-Deploy
```bash
# Verificar permissões
ls -la /var/www/html/lp/analise-comercial/

# Validar HTML
html5validator --root /var/www/html/lp/analise-comercial/

# Verificar links
linkchecker http://localhost/lp/analise-comercial/

# Testar WCAG
axe-core --root /var/www/html/lp/analise-comercial/
```

---

## 📊 Monitoramento Pós-Deploy

### Métricas a Acompanhar
- ✅ Tempo de carregamento (Goal: <2s)
- ✅ Taxa de submissão de formulário
- ✅ Cliques em WhatsApp
- ✅ Taxa de conversão A/B (evidência vs causa)
- ✅ Erros JavaScript (console)
- ✅ Performance (Lighthouse)

### Google Analytics Events
```javascript
// Rastrear submissão de formulário
document.querySelector('#contact-form').addEventListener('submit', () => {
  gtag('event', 'form_submit', {
    'form_type': 'contact',
    'landing_page': 'analise-comercial'
  });
});

// Rastrear clique em WhatsApp
document.querySelector('[data-whatsapp]').addEventListener('click', () => {
  gtag('event', 'whatsapp_click', {
    'landing_page': 'analise-comercial'
  });
});
```

---

## ✅ Checklist Final

- [ ] Estrutura de pastas criada
- [ ] Arquivos copiados para public_html
- [ ] .htaccess configurado
- [ ] Formulário integrado (HTML + CSS + JS)
- [ ] WhatsApp popup integrado
- [ ] Número WhatsApp configurado (variável WA em app.js)
- [ ] PHP de formulário testado
- [ ] Links testados
- [ ] Mobile responsivo testado
- [ ] WCAG AA validado
- [ ] Google Analytics integrado
- [ ] CDN/Cache configurado
- [ ] SSL/HTTPS confirmado
- [ ] Logs monitorados

---

## 📞 Contato de Suporte

Em caso de problemas pós-deploy:
- Verificar logs do servidor: `/var/log/apache2/error.log`
- Verificar permissões de arquivos: `chmod 755`
- Testar formulário manualmente
- Validar certificado SSL

---

**Versão:** 3.0 Deploy Ready  
**Data:** 12 de Agosto de 2026
