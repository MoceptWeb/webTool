function route(handler, pathname) {
  console.log("About to router a request for " + pathname);
  if (typeof handler[pathname] === 'function') {
    return handler[pathname]();
  } else {
    console.log("No request handler found for " + pathname);
    return "404 NOT found";
  }
}

exports.route = route;
