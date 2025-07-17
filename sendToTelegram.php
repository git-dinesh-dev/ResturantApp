<?php
// Get the form data
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Set up the Telegram bot token and chat ID
$botToken = "7862830997:AAF7cJ2VF8RzFGGY1ucbcY_Wzeg5ZaoLOms"; // Replace with your bot's token
$chatId = "-1002418420190"; // Replace with your chat ID or group ID

// Format the Telegram message
$text = "New contact form submission:\n";
$text .= "Name: " . $name . "\n";
$text .= "Email: " . $email . "\n";
$text .= "Subject: " . $subject . "\n";
$text .= "Message: " . $message . "\n";

// Set the URL to send the message via the Telegram Bot API
$telegramUrl = "https://api.telegram.org/bot$botToken/sendMessage";

// Set the data for the Telegram request
$telegramData = array(
    'chat_id' => $chatId,
    'text' => $text
);

// Use cURL to send the POST request to Telegram
$options = array(
    'http' => array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => http_build_query($telegramData),
    ),
);
$context  = stream_context_create($options);
$response = file_get_contents($telegramUrl, false, $context);

// Send an email
$to = "your-email@example.com"; // Replace with your email address
$from = $email; // Sender's email (from the form)
$headers = "From: $from\r\n";
$headers .= "Reply-To: $from\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Format the email message
$emailMessage = "New contact form submission:\n";
$emailMessage .= "Name: " . $name . "\n";
$emailMessage .= "Email: " . $email . "\n";
$emailMessage .= "Subject: " . $subject . "\n";
$emailMessage .= "Message: " . $message . "\n";

// Send the email
$mailSent = mail($to, "New Contact Form Submission: $subject", $emailMessage, $headers);

// Check if the email was sent successfully
if ($mailSent) {
    echo "Message sent successfully!";
} else {
    echo "Failed to send email.";
}

// Check the response from the Telegram API
if ($response === FALSE) {
    echo "Failed to send message to Telegram.";
}
?>
