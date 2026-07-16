# Backend PHP — Fornecedores / Trabalhe Conosco

Formulário em `fornecedores.html` → `php/enviar.php` → MySQL + e-mail (best-effort).
Funciona em hospedagem com **PHP + MySQL** (ex.: Hostinger). Em preview estático o
formulário mostra uma mensagem amigável orientando o contato por WhatsApp.

## Setup (uma vez, no servidor)
1. Crie um banco MySQL no painel da hospedagem.
2. Rode `schema.sql` (ex.: no phpMyAdmin) para criar a tabela `cadastros`.
3. Copie `db-config.example.php` para **`db-config.php`** e preencha host/usuário/senha/banco
   e o `notify_email`. **Não versione** `db-config.php` (já está no `.gitignore`).
4. Garanta que a pasta `uploads/` exista e tenha permissão de escrita (o script cria se puder).
   O `.htaccess` em `uploads/` bloqueia o download público dos currículos (LGPD).

## Segurança
- Consultas com **prepared statements** (PDO) — sem SQL injection.
- Validação de tipo/tamanho de arquivo (PDF/DOC/DOCX, ≤ 5 MB) e honeypot anti-spam.
- Erros de banco vão para o log do servidor, nunca para o cliente.
- Consentimento LGPD obrigatório e registrado.
