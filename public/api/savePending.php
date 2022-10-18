<?php

require_once "auth.php";

file_put_contents("../pending.json", $_POST["data"]);

die("OK");
