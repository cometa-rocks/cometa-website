<?php

/**
 * this mail.php excepts input as post and verifies that captcha is ok
 * If captcha is ok, sends mail
 * 
 *  - name ............. name of the user filling the form
 * - email ............ email of user
 * - sibject  ......... the subject of the mail
 * - captchaID ........ Referenz to CaptchaID in Backend
 * - userEnteredInput . The Captcha the user entered to be verified in backend
 * - mail-version ..... if emmpty backend reacts as before (old version), if 'toni' uses newhandling
 * 
 * Return Codes
 * 502 - captcha wrong
 * 400 - mail not sent
 * 200 - mail sent ok
 * 
 * Changelog:
 * 2021-12-17 RRO added mail-version as parameter to keep old behaviour and be able to insert new behaviour into code
 * 
 */


// FIXME - only set debugging on DEV and STAGE ... not on PROD
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


session_start();
header('X-Powered-By: beer');


// Check on variable incming
//
if (!isset($_POST['name'])) {
    echo 'This programms needs post parameters to work: name, email, subject, message, answer (from cpatcha)';
    exit;
}



// 
// execute rest of code, if variables coming in are ok
require_once __DIR__.'/simple-botdetect.php';
require_once __DIR__.'/PHPMailer/PHPMailerAutoload.php';

// secret variables for mailing
require_once __DIR__.'/cometa_secret_variables.php';

// Init the mailer object
$mail = new PHPMailer;

// sending emails via mail.amvara.de
$mail->isSMTP();
$mail->Host = 'mail.amvara.de';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'tec_dev@amvara.de';
$mail->Password = $COMETA_SECRET_VARIABLES_MAIL_PASSWORD;    
$mail->SMTPOptions = ['ssl'=> ['allow_self_signed' => true]];

$to = $COMETA_SECRET_VARIABLES_MAILTO;
$name = $_POST['name'];
$from = $_POST['email'];
$title = $_POST['subject'];
$message = nl2br($_POST['message']);
$userCaptchaId = $_POST['captchaId'];
$userInputEnteredCode = $_POST['userEnteredInput'];


if ( $_POST['mail-version'] == 'toni') {
    // New Captcha behaviour
    $MailCaptcha = new SimpleCaptcha('welcomeCaptcha');
    $isHuman = $MailCaptcha->Validate($userInputEnteredCode,$userCaptchaId);
    
} else 
{   // old Captcha behaviour
    $MailCaptcha = new Captcha('MailCaptcha');
    $MailCaptcha->UserInputID = 'answer';
    $isHuman = $MailCaptcha->Validate();
}


// Check Captcha Restult and act on it
if (!isset($_POST['mail-version']) && !$isHuman ) {
    // ---------------------- old behavior ----------------------------
    http_response_code(502);
    echo 'Invalid ReCaptcha confirmation. Please, refresh the page and try again.';
    return;
} 

// ---------------------- new behavior ----------------------------
if(isset($_POST['mail-version']) == 'toni' && !$isHuman) {
        $arr = array(   'success' => false, 
                        'successCode'=> 400,  
                        'message' => 'Invalid captcha code, please try to fill the captcha input again'
                    );
        echo json_encode($arr);
        return;
}


//
// If code executiopn get's here , then captcha was valid and mail should be send
//

// Generate BODY for the message
$body = "
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    <title>Mail from COMETA.ROCKS</title>
</head>
<body>
    <p>$message</p>

    <code>Message sent from: $from</code><br>
    <code>$name sends his message from ".$_SERVER['HTTP_HOST']."</code>
</body>
</html>
";

// Prepare Mail
$mail->setFrom('tec_dev@amvara.de', 'COMETA.ROCKS');
$mail->addAddress($to);
$mail->Subject = '[COMETA WEBSITE] '. $title;
$mail->isHtml(TRUE);
$mail->Body = $body;
$mail->CharSet = 'UTF-8';

// Send mail and act on return code from mailserver ... return true or false + $mail->ErrorInfo
$mail_sent = true; // default ist false ... if mail was sent correctly this turns true
try {
    $mail->send();
} catch (Exception  $e) {
    $mail_sent = false;
}

// ---------------------- old behavior ----------------------------
// response old - on failure
if(!isset($_POST['mail-version']) && !$mail_sent) {
    // error
    echo 'Message was not sent.';
    echo 'Mailer error: ' . $mail->ErrorInfo;
} 

// response old - on success 
if(!isset($_POST['mail-version']) && $mail_sent) {
    echo 'Thank you for contacting us. We will get back to you as early as possible!';
}


// ---------------------- new behavior ----------------------------
// response old - on failure
if(isset($_POST['mail-version']) == 'toni' && !$mail_sent) {
    // error
    echo 'Message was not sent.';
    echo 'Mailer error: ' . $mail->ErrorInfo;
    $arr = array(   'success' => false, 
                    'successCode'=> 503,  
                    'message' => 'We are sorry to inform you that this mail sending service is temporarily down, please try again later'
    );
    echo json_encode($arr);
    return;
}

// response new - on success 
if(isset($_POST['mail-version']) == 'toni' && $mail_sent) {
    $arr = array(   'success' => true, 
                    'successCode'=> 200,  
                    'message' => 'We are bringing Co.meta to your universe'
    );
    echo json_encode($arr);
    return;
}
?>