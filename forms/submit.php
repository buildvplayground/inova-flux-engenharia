<?php
/**
 * Processamento de Formulário de Contato
 * Landing Page: Análise Comercial
 */

// Headers
header('Content-Type: application/json; charset=utf-8');

// Apenas POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Método não permitido']));
}

// Validar CSRF token (se implementado)
// session_start();
// if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
//     http_response_code(403);
//     exit(json_encode(['error' => 'CSRF validation failed']));
// }

// Campos obrigatórios
$required_fields = ['nome', 'email', 'celular', 'empresa', 'cargo', 'area', 'faturamento'];

// Validar campos obrigatórios
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        exit(json_encode(['error' => "Campo '$field' é obrigatório"]));
    }
}

// Função para sanitizar inputs
function sanitize_input($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

// Preparar dados
$form_data = [
    'landing_page' => sanitize_input($_POST['landing_page'] ?? 'analise-comercial-evidencia'),
    'nome' => sanitize_input($_POST['nome']),
    'email' => filter_var($_POST['email'], FILTER_SANITIZE_EMAIL),
    'celular' => sanitize_input($_POST['celular']),
    'empresa' => sanitize_input($_POST['empresa']),
    'cargo' => sanitize_input($_POST['cargo']),
    'area' => sanitize_input($_POST['area']),
    'website' => filter_var($_POST['website'] ?? '', FILTER_SANITIZE_URL),
    'faturamento' => sanitize_input($_POST['faturamento']),
    'mensagem' => sanitize_input($_POST['mensagem'] ?? ''),
    'consentimento' => isset($_POST['consentimento']) ? 'sim' : 'não',
    'data_submissao' => date('Y-m-d H:i:s'),
    'ip_address' => sanitize_ip($_SERVER['REMOTE_ADDR']),
    'user_agent' => sanitize_input($_SERVER['HTTP_USER_AGENT'] ?? ''),
];

// Validar email
if (!filter_var($form_data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit(json_encode(['error' => 'E-mail inválido']));
}

// Salvar em arquivo CSV (para desenvolvimento)
// Em produção, usar banco de dados ou serviço de CRM
$csv_file = __DIR__ . '/../data/submissions.csv';
$csv_dir = dirname($csv_file);

// Criar diretório se não existir
if (!is_dir($csv_dir)) {
    mkdir($csv_dir, 0755, true);
}

// Escrever em CSV
$csv_line = implode('|', [
    $form_data['data_submissao'],
    $form_data['landing_page'],
    $form_data['nome'],
    $form_data['email'],
    $form_data['celular'],
    $form_data['empresa'],
    $form_data['cargo'],
    $form_data['area'],
    $form_data['website'],
    $form_data['faturamento'],
    $form_data['mensagem'],
    $form_data['consentimento'],
    $form_data['ip_address']
]);

if (!file_exists($csv_file)) {
    // Criar cabeçalho
    $header = implode('|', [
        'Data/Hora', 'Landing Page', 'Nome', 'Email', 'Celular',
        'Empresa', 'Cargo', 'Área', 'Website', 'Faturamento',
        'Mensagem', 'Consentimento', 'IP'
    ]);
    file_put_contents($csv_file, $header . "\n");
}

// Adicionar linha
file_put_contents($csv_file, $csv_line . "\n", FILE_APPEND);

// Enviar email de notificação (opcional)
if (function_exists('mail')) {
    $to = 'contato@sucessoemvendas.com.br';
    $subject = "Nova Solicitação de Análise Comercial - {$form_data['nome']}";

    $message = "
    <html>
    <body>
        <h2>Nova Solicitação de Análise Comercial</h2>
        <table border='1'>
            <tr><td><strong>Nome:</strong></td><td>{$form_data['nome']}</td></tr>
            <tr><td><strong>Email:</strong></td><td>{$form_data['email']}</td></tr>
            <tr><td><strong>Celular:</strong></td><td>{$form_data['celular']}</td></tr>
            <tr><td><strong>Empresa:</strong></td><td>{$form_data['empresa']}</td></tr>
            <tr><td><strong>Cargo:</strong></td><td>{$form_data['cargo']}</td></tr>
            <tr><td><strong>Área:</strong></td><td>{$form_data['area']}</td></tr>
            <tr><td><strong>Faturamento:</strong></td><td>{$form_data['faturamento']}</td></tr>
            <tr><td><strong>Mensagem:</strong></td><td>{$form_data['mensagem']}</td></tr>
            <tr><td><strong>Landing Page:</strong></td><td>{$form_data['landing_page']}</td></tr>
            <tr><td><strong>Data:</strong></td><td>{$form_data['data_submissao']}</td></tr>
        </table>
        <p><strong>IP:</strong> {$form_data['ip_address']}</p>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";

    @mail($to, $subject, $message, $headers);
}

// Resposta de sucesso
http_response_code(200);
exit(json_encode([
    'success' => true,
    'message' => 'Formulário enviado com sucesso! Redirecionando para WhatsApp...',
    'whatsapp_url' => 'https://wa.me/55?text=' . urlencode(
        "Olá! Meu nome é {$form_data['nome']} da empresa {$form_data['empresa']}. " .
        "Gostaria de solicitar a análise comercial gratuita."
    ),
    'data' => $form_data
]));

function sanitize_ip($ip) {
    $ip = filter_var($ip, FILTER_VALIDATE_IP);
    return $ip !== false ? $ip : 'unknown';
}
?>
