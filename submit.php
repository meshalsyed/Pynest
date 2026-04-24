<?php
/**
 * Pynest – Early Access Form Handler
 * ─────────────────────────────────────────────────────────
 * Upload this file to the SAME directory as index.html on
 * your PHP-enabled hosting (e.g. Hostinger, cPanel, etc.)
 *
 * ✏️  Change TO_EMAIL to your real inbox below.
 */

define('TO_EMAIL',   'info@pynest.in');       // ← your receiving email
define('FROM_EMAIL', 'noreply@pynest.in');    // ← sender shown in inbox (must be your domain)
define('SITE_NAME',  'Pynest');

/* ── CORS / headers ─────────────────────────────────────── */
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

/* ── Only accept POST ───────────────────────────────────── */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

/* ── Sanitize & validate inputs ─────────────────────────── */
$name  = trim(strip_tags($_POST['name']  ?? ''));
$email = trim(strip_tags($_POST['email'] ?? ''));

if (empty($name)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Name is required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

/* ── Rate-limit: one submission per IP per 10 minutes ───── */
$ip_hash  = md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$tmp_file = sys_get_temp_dir() . '/pynest_rl_' . $ip_hash . '.txt';
$now      = time();
if (file_exists($tmp_file)) {
    $last = (int) file_get_contents($tmp_file);
    if ($now - $last < 600) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Too many requests. Please wait a few minutes.']);
        exit;
    }
}
file_put_contents($tmp_file, $now);

/* ── Build the email ────────────────────────────────────── */
$subject = SITE_NAME . ' – New Early Access Request';

$body  = "You have a new early access sign-up on " . SITE_NAME . ".\n\n";
$body .= "─────────────────────────────\n";
$body .= "Name  : {$name}\n";
$body .= "Email : {$email}\n";
$body .= "Date  : " . date('d M Y, H:i:s T') . "\n";
$body .= "IP    : " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "\n";
$body .= "─────────────────────────────\n\n";
$body .= "Reply directly to this email to contact the lead.\n";

$headers  = "From: " . SITE_NAME . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* ── Send ───────────────────────────────────────────────── */
$sent = mail(TO_EMAIL, $subject, $body, $headers);

/* ── Auto-reply to the user ─────────────────────────────── */
if ($sent) {
    $reply_subject = "You're on the Pynest Early Access List 🌿";

    $reply_body  = "Hi {$name},\n\n";
    $reply_body .= "Thank you for joining the Pynest early access list!\n\n";
    $reply_body .= "We're putting the final touches on something truly beautiful — ";
    $reply_body .= "curated luxury villas and premium homestays with private pools in Pondicherry.\n\n";
    $reply_body .= "As an early member, you'll receive:\n";
    $reply_body .= "  • Priority access before public launch\n";
    $reply_body .= "  • Exclusive launch offers\n";
    $reply_body .= "  • A curated guide to Pondicherry's finest experiences\n\n";
    $reply_body .= "We'll be in touch soon.\n\n";
    $reply_body .= "Warm regards,\n";
    $reply_body .= "The Pynest Team\n";
    $reply_body .= "pynest.in  ·  info@pynest.in\n";

    $reply_headers  = "From: " . SITE_NAME . " <" . FROM_EMAIL . ">\r\n";
    $reply_headers .= "Reply-To: " . TO_EMAIL . "\r\n";
    $reply_headers .= "MIME-Version: 1.0\r\n";
    $reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    mail($email, $reply_subject, $reply_body, $reply_headers);
}

/* ── Respond to JS ──────────────────────────────────────── */
if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Submitted successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail could not be sent. Please contact us directly.']);
}
