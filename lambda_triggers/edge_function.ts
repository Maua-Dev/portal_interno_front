const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}$/;
const hasSlash = /\/$/;

export async function lambda_handler(event: any, _: any, callback: any) {
  const { request } = event.Records[0].cf; 
  const uri = request.uri;
  if (uri && !uri.match(hasExtension) && !uri.match(hasSlash)) { 
      request.uri = `${uri}.html`; 
  } 
return callback(null, request)};