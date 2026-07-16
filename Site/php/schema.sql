-- Estrutura do banco para os cadastros de Fornecedores / Trabalhe Conosco.
-- Rode este script no MySQL do servidor (ex.: phpMyAdmin da Hostinger) uma vez.

CREATE TABLE IF NOT EXISTS cadastros (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  tipo       VARCHAR(20)  NOT NULL,           -- 'fornecedor' | 'candidato'
  nome       VARCHAR(150) NOT NULL,
  email      VARCHAR(150) NOT NULL,
  telefone   VARCHAR(40)  NOT NULL,
  empresa    VARCHAR(150) NULL,
  mensagem   TEXT         NULL,
  arquivo    VARCHAR(255) NULL,               -- nome do arquivo salvo (currículo/portfólio)
  ip         VARCHAR(45)  NULL,
  consent    TINYINT(1)   NOT NULL DEFAULT 0, -- consentimento LGPD
  criado_em  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX (tipo), INDEX (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
