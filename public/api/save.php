<?php

require_once "auth.php";

file_put_contents("../images.json", $_POST["data"]);

die("OK");
