<?php

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  header("access-control-allow-origin: *");
  die("CORS OK");
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  die("Please use a POST request.");
}

if (!array_key_exists("pass", $_POST)) {
  http_response_code(400);
  die("Bad request");
}

if (getenv("ADMIN_PASSWORD") !== $_POST["pass"]) {
  http_response_code(401);
  die("Bad password");
}
