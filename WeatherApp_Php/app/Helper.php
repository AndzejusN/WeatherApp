<?php

namespace App;

class Helper
{
    public static function matchCity()
    {
        $city = $_GET['city'] ?? NULL ?: 'Vilnius';

        return self::readData($city);
    }

    public static function readData($city)
    {
        return file_get_contents("http://localhost/weather/long-term/{$city}");
    }
}

define("FOO","BAR");



