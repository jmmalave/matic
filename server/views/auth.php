<?php

$hasSession = isset($_COOKIE['SESSID']);

if( $hasSession ){
	return header('location: /app');
}

require('./dist/auth.html');