<?php
/**
 * Configuração do banco e do backend de cadastros.
 * >>> COPIE este arquivo para "db-config.php" e preencha com os dados reais. <<<
 * O arquivo db-config.php NÃO é versionado (está no .gitignore).
 */
return [
    'db_host'      => 'localhost',
    'db_name'      => 'inovaflux',
    'db_user'      => 'USUARIO_DO_BANCO',
    'db_pass'      => 'SENHA_DO_BANCO',
    'db_charset'   => 'utf8mb4',

    // E-mail que recebe os cadastros (best-effort via mail()).
    'notify_email' => 'contato@inovaflux.com.br',

    // Pasta onde os currículos são salvos. Idealmente fora da raiz pública
    // e protegida (veja uploads/.htaccess). Caminho absoluto no servidor.
    'upload_dir'   => __DIR__ . '/uploads',

    // Tamanho máximo de upload em bytes (5 MB).
    'max_upload'   => 5 * 1024 * 1024,
];
