import {
   JSON_CONTENT_TYPE_HEADER,
   logAndReturnErrorResponse,
   PersonService,
   returnDataResponse,
   startServer,
} from './deps.ts'

const port = 3018
const responseHeaders = new Headers(JSON_CONTENT_TYPE_HEADER)

function handleRequest(request: Request): Response {
   if (request.method !== 'GET') {
      return logAndReturnErrorResponse(
         `Only GET method is allowed, but got: ${request.method}`,
         responseHeaders,
         405,
      )
   }

   const { pathname } = new URL(request.url)
   if (pathname.includes('/person')) {
      if (pathname === '/person' || pathname === '/person/') {
         return new Response(JSON.stringify(PersonService.getAllPersons()), {
            headers: JSON_CONTENT_TYPE_HEADER,
         })
      } else if (pathname.includes('/person/')) {
         const userId = pathname.substring(8)
         const person = PersonService.getPersonForId(userId)
         if (!person) {
            return logAndReturnErrorResponse(
               `No user found for id: ${userId}`,
               responseHeaders,
            )
         } else {
            return returnDataResponse(person, responseHeaders)
         }
      }
   }
   return logAndReturnErrorResponse(
      `No api endpoint found for path ${pathname}`,
      responseHeaders,
   )
}

startServer(handleRequest, { port: port })
