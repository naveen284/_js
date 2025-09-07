<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// ---- basic validation ----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(403);
  exit('Invalid request.');
}

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

// sanitize
$name  = preg_replace("/[\r\n]+/", ' ', strip_tags($name));
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

if ($name === '' || $subject === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  exit('Please complete the form correctly.');
}

// ====== PHPMailer setup ======
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ---- choose ONE require style ----
// A) Composer:
require __DIR__ . '/vendor/autoload.php';

// B) Manual (if you copied /phpmailer/src to your project):
// require __DIR__ . '/phpmailer/Exception.php';
// require __DIR__ . '/phpmailer/PHPMailer.php';
// require __DIR__ . '/phpmailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    // SMTP config
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = '';   // Your Gmail address that will send the email
    $mail->Password   = '';      // The App Password you just generated
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;   // TLS
    $mail->Port       = 587;

    // Sender & recipients
    // Use your authenticated Gmail as the From address
    $mail->setFrom('email', 'Website Contact');
    // Send to the address where you want to receive messages
    $mail->addAddress('email', 'Site Owner'); // The email address that will receive the form submissions
    // Let replies go to the person who filled the form
    $mail->addReplyTo($email, $name);

    // Content
    $mail->Subject = $subject;
    $mail->Body    =
        "Name: {$name}\n".
        "Email: {$email}\n\n".
        "Message:\n{$message}\n";

    // (Optional) Plain text only; if you prefer HTML:
    // $mail->isHTML(true); $mail->Body = nl2br($mail->Body);

    // DEBUG (dev only): uncomment to see SMTP conversation
    // $mail->SMTPDebug = 2; $mail->Debugoutput = 'html';

    $mail->send();
    header('Location: thank-you.html');
    exit;
} catch (Exception $e) {
    http_response_code(500);
    echo "Mailer Error: " . $mail->ErrorInfo;
}
?>
