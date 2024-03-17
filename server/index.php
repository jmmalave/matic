<?

include './matic-db.php';
include './lib/router.php';

if( !defined('ROUTERPATH') ){
	define('ROUTERPATH', $_GET['path'] ?? '');
}


$router = new Router( ROUTERPATH );

$router->get('/(auth\/login)/', function(){});
$router->get('/auth\/(.+)/', function(){});
$router->get('/auth\/(.*)\/edit/', function($req){
	var_dump($req);
});

$router->run();
