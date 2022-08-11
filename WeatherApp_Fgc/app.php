<?php

$city = $_POST['city'] ?? 'Vilnius';

$content = @file_get_contents("https://api.meteo.lt/v1/places/" . $city . "/forecasts/long-term");

if (!$content) {
    $apiData = file_get_contents("https://api.meteo.lt/v1/places/vilnius/forecasts/long-term");

    $error = "<div class=\"alert alert-warning\" role=\"alert\">";
    $error .= 'Paieškos lauke klaidingai įvestas miesto pavadinimas';
    $error .= "</div>";

} else {
    $apiData = file_get_contents("https://api.meteo.lt/v1/places/" . $city . "/forecasts/long-term");
}

$weatherArr = json_decode($apiData, true);