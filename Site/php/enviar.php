<?php
/**
 * Backend de cadastro (Fornecedores / Trabalhe Conosco) — Inova Flux.
 * Recebe POST multipart, valida, grava no MySQL (PDO, prepared statements),
 * salva o currículo e notifica por e-mail (best-effort). Responde JSON.
 */
header('Content-Type: application/json; charset=utf-8');

function out($ok, $message, $code = 200) {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(false, 'Método não permitido.', 405);
}

// honeypot anti-spam: campo "website" deve vir vazio
if (!empty($_POST['website'])) {
    out(true, 'Cadastro recebido.'); // finge sucesso para bots
}

// ---- Config ----
$cfgFile = __DIR__ . '/db-config.php';
if (!file_exists($cfgFile)) {
    out(false, 'Servidor ainda não configurado (db-config.php ausente). Fale pelo WhatsApp (17) 9 9606-5834.', 500);
}
$cfg = require $cfgFile;

// ---- Coleta e validação ----
$tipo     = trim($_POST['tipo']     ?? '');
$nome     = trim($_POST['nome']     ?? '');
$email    = trim($_POST['email']    ?? '');
$telefone = trim($_POST['telefone'] ?? '');
$empresa  = trim($_POST['empresa']  ?? '');
$mensagem = trim($_POST['mensagem'] ?? '');
$consent  = isset($_POST['consent']) ? 1 : 0;

$erros = [];
if (!in_array($tipo, ['fornecedor', 'candidato'], true)) $erros[] = 'tipo inválido';
if ($nome === '' || mb_strlen($nome) > 150)              $erros[] = 'nome';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))          $erros[] = 'e-mail';
if ($telefone === '')                                    $erros[] = 'telefone';
if (!$consent)                                           $erros[] = 'consentimento LGPD';
if ($erros) {
    out(false, 'Verifique os campos: ' . implode(', ', $erros) . '.', 422);
}

// ---- Upload (opcional) ----
$arquivoSalvo = null;
if (isset($_FILES['arquivo']) && $_FILES['arquivo']['error'] === UPLOAD_ERR_OK) {
    $maxUpload = $cfg['max_upload'] ?? (5 * 1024 * 1024);
    if ($_FILES['arquivo']['size'] > $maxUpload) {
        out(false, 'Arquivo acima do limite de 5 MB.', 422);
    }
    $permitidos = ['pdf' => 'application/pdf', 'doc' => 'application/msword',
                   'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    $ext = strtolower(pathinfo($_FILES['arquivo']['name'], PATHINFO_EXTENSION));
    if (!isset($permitidos[$ext])) {
        out(false, 'Formato não permitido. Envie PDF, DOC ou DOCX.', 422);
    }
    $dir = $cfg['upload_dir'] ?? (__DIR__ . '/uploads');
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $nomeSeguro = preg_replace('/[^A-Za-z0-9_.-]/', '_', pathinfo($_FILES['arquivo']['name'], PATHINFO_FILENAME));
    $arquivoSalvo = date('Ymd_His') . '_' . substr($nomeSeguro, 0, 60) . '.' . $ext;
    if (!move_uploaded_file($_FILES['arquivo']['tmp_name'], $dir . '/' . $arquivoSalvo)) {
        $arquivoSalvo = null; // não bloqueia o cadastro se o upload falhar
    }
}

// ---- Persistência (PDO) ----
try {
    $dsn = "mysql:host={$cfg['db_host']};dbname={$cfg['db_name']};charset={$cfg['db_charset']}";
    $pdo = new PDO($dsn, $cfg['db_user'], $cfg['db_pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $stmt = $pdo->prepare(
        'INSERT INTO cadastros (tipo, nome, email, telefone, empresa, mensagem, arquivo, ip, consent)
         VALUES (:tipo, :nome, :email, :telefone, :empresa, :mensagem, :arquivo, :ip, :consent)'
    );
    $stmt->execute([
        ':tipo' => $tipo, ':nome' => $nome, ':email' => $email, ':telefone' => $telefone,
        ':empresa' => ($empresa ?: null), ':mensagem' => ($mensagem ?: null),
        ':arquivo' => $arquivoSalvo, ':ip' => ($_SERVER['REMOTE_ADDR'] ?? null), ':consent' => $consent,
    ]);
} catch (Throwable $e) {
    // não vaza detalhes do banco ao cliente
    error_log('Inova Flux cadastro erro: ' . $e->getMessage());
    out(false, 'Não foi possível salvar seu cadastro agora. Fale pelo WhatsApp (17) 9 9606-5834.', 500);
}

// ---- Notificação por e-mail (best-effort) ----
if (!empty($cfg['notify_email'])) {
    $assunto = 'Novo cadastro (' . $tipo . '): ' . $nome;
    $corpo = "Tipo: $tipo\nNome: $nome\nE-mail: $email\nTelefone: $telefone\n"
           . "Empresa/Área: $empresa\nMensagem: $mensagem\nArquivo: " . ($arquivoSalvo ?: '—') . "\n";
    $headers = 'From: no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'inovaflux.com.br') . "\r\n"
             . 'Reply-To: ' . $email . "\r\n" . 'Content-Type: text/plain; charset=utf-8';
    @mail($cfg['notify_email'], $assunto, $corpo, $headers);
}

out(true, 'Cadastro enviado com sucesso! Em breve entraremos em contato.');
