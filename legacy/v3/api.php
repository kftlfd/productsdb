<?php

require __DIR__ . "/vendor/autoload.php";

// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/config", "db.env");
// $dotenv->load();

$api = new src\APIv1\API();
$api->processRequest();
