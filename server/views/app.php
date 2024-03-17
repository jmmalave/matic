<?php


$emptySession = empty($_COOKIE['SESSID']);

if( $emptySession ){
	return header('location: /auth/login?next=/' . $_GET['path']);
}


require('./dist/app.html');