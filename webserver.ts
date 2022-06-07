import { PersonService, serve } from "./deps.ts";

const jsonContentTypeHeader = {
  "content-type": "application/json; charset=UTF-8",
  };

function logAndReturnErrorResponse(errorMessage: string, errorStatusCode = 400): Response {
  console.error(errorMessage);
  return new Response(JSON.stringify({error: errorMessage}), {
    headers: jsonContentTypeHeader,
    status: errorStatusCode
  })
}

function handleRequest(request: Request): Response {
  if (request.method !== "GET") {
    return logAndReturnErrorResponse(`Only GET method is allowed, but got: ${request.method}`, 405)
  }
  
  const { pathname } = new URL(request.url);
  if (pathname.includes("/person")) {
    if (pathname === "/person" || pathname === "/person/") {
      return new Response(JSON.stringify(PersonService.getAllPersons()), {headers: jsonContentTypeHeader,})
    } else if (pathname.includes("/person/") ) {
      const userId = pathname.substring(8);
      const person = PersonService.getPersonForId(userId);
      if (!person) {
        return logAndReturnErrorResponse(`No user found for id: ${userId}`);
      } else {
        return new Response(JSON.stringify(person), {headers: jsonContentTypeHeader},)
      }
    } 
  } 
  return logAndReturnErrorResponse(`No api endpoint found for path ${pathname}`);
}

serve(handleRequest);
