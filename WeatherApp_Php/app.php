<?php

use Sunrise\Http\Message\ResponseFactory;
use Sunrise\Http\Router\RequestHandler\CallableRequestHandler;
use Sunrise\Http\Router\RouteCollector;
use Sunrise\Http\Router\Router;
use Sunrise\Http\ServerRequest\ServerRequestFactory;
use function Sunrise\Http\Router\emit;

$collector = new RouteCollector();

$collector->get('home', '/', new CallableRequestHandler(function () {
    $apiData = file_get_contents(ROOT_PATH . "/views/index.phtml");
    return (new ResponseFactory)->createHtmlResponse(200, $apiData);
}));

$collector->get('places', '/weather/places', new CallableRequestHandler(function () {
    $apiData = file_get_contents("https://api.meteo.lt/v1/places");
    $apiData = json_decode($apiData);
    return (new ResponseFactory)->createJsonResponse(200, $apiData, JSON_PRETTY_PRINT);
}));

$collector->get('place', '/weather/places/{id}', new CallableRequestHandler(function ($request) {
    $city = $request->getAttribute('id');
    $apiData = file_get_contents("https://api.meteo.lt/v1/places/" . $city);
    $apiData = json_decode($apiData);
    return (new ResponseFactory)->createJsonResponse(200, $apiData, JSON_PRETTY_PRINT);
}));

$collector->get('longterm', '/weather/long-term/{place}', new CallableRequestHandler(function ($request) {
    $city = $request->getAttribute('place');
    $apiData = file_get_contents("https://api.meteo.lt/v1/places/" . $city . "/forecasts/long-term");
    $apiData = json_decode($apiData);
    return (new ResponseFactory)->createJsonResponse(200, $apiData, JSON_PRETTY_PRINT);
}));

$router = new Router();
$router->addRoute(...$collector->getCollection()->all());
$request = ServerRequestFactory::fromGlobals();
$response = $router->handle($request);
emit($response);