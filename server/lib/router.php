<?


class Router
{

	private $pathname;
	private $pathMatch = false;
	private $params = array();
	private $routes = array();
	
	
	public function __construct($pathname)
	{
		$this->pathname = $pathname;
	}
	
	
	private function pathMatch($reg, $method)
	{
		return (
			preg_match($reg, $this->pathname) &&
			$this->getRequestMethod() == $method
		);
	}
	
	private function getParams($regexp)
	{
		
	}
	
	private function getQuery()
	{
		if( isset( $_GET['path'] ) ){
			delete($_GET['path']);
		}
		
		return $_GET;
	}
	
	private function getRequestMethod()
	{
		return $_SERVER['REQUEST_METHOD'];
	}
	
	private function signRoute($method, $regexp, $ctrl)
	{
		$route = array(
			"ctrl" => $ctrl,
			"regexp" => $regexp,
			"method" => $method
		);
		array_push($this->routes, $route);
	}
	
	public function get($regexp, $ctrl)
	{
		$this->signRoute("get", $regexp, $ctrl);
	}
	
	public function post($regexp, $ctrl)
	{
		$this->signRoute("post", $regexp, $ctrl);
	}
	
	public function run()
	{
		foreach ($this->routes as $route) {
			if( $this->pathMatch($route["regexp"], $route["method"]) ){
				$route["ctrl"](
					array(
						"params" => $this->getParams($route['regexp']),
						"query" => $this->getQuery(),
						"pathname" => $this->pathname,
						"method" => $route['method']
					)
				);
				
				break;
			}
		}
	}
	
}