<?php

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  die("Please use a POST request.");
}

if (!array_key_exists("event", $_POST) || !array_key_exists("caption", $_POST)) {
  http_response_code(400);
  die("Bad request");
}

if (!isset($_FILES["file"]["error"]) || is_array($_FILES["file"]["error"])) {
  http_response_code(400);
  die("Please include a file in the payload");
}

if ($_FILES["file"]["error"] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  die("File was unable to upload: code " . $_FILES["file"]["error"] . ".  Please ensure your files are each 20 MB each.");
}

$mimes = [
  ".gif" => "image/gif",
  ".jpg" => "image/jpeg",
  ".png" => "image/png",
  ".webp" => "image/webp",
];

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($_FILES["file"]["tmp_name"]);
$ext = array_search($mime, $mimes, true);
if ($ext === false) {
  http_response_code(400);
  die("Invalid file");
}

$file = "img/" . uniqid("", true) . $ext;
if (!move_uploaded_file($_FILES["file"]["tmp_name"], "../" . $file)) {
  http_response_code(500);
  die("Unable to save uploaded file");
}

$payload = json_encode([
  "file" => $file,
  "event" => $_POST["event"],
  "caption" => $_POST["caption"]
]);

if ($payload === false || !file_put_contents("../pending.json", $payload . "\n", FILE_APPEND)) {
  http_response_code(500);
  die("Unable to save uploaded metadata");
}

die("OK");
