<?php

use API\API;

spl_autoload_register(function ($className) {
    $baseDir = __DIR__ . "/lib/";
    $file = $baseDir . str_replace("\\", DIRECTORY_SEPARATOR, $className) . ".php";
    if (file_exists($file)) require $file;
});

$api = new API();

$api->processRequest();