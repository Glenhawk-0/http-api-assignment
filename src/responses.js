// i used piceces of code from the week 3 examples as a baseline. 
// ill be honest though, i like... kinda half understand how it works. 
// i apologize.
const fs = require('fs'); // pull in the file system module

// Load our index fully into memory.
// THIS IS NOT ALWAYS THE BEST IDEA.
// We are using this for simplicity. Ideally we won't have
// synchronous operations or load entire files into memory.
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// function to send response // add status and remove the 200 default there. 
const respond = (request, response, content, type, statusCode) => {
  // set status code (200 success) and content type
//response.writeHead(200, {
  response.writeHead(statusCode, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  // write the content string or buffer to response
  response.write(content);
  // send the response to the client
  response.end();
};

// function for our /cats page
// Takes request, response and an array of client requested mime types
const getCats = (request, response) => {
  // object to send
  const cat = {
    name: 'mr. cat',
    age: 4,
  };

  // if the client's most preferred type (first option listed)
  // is xml, then respond xml instead
  if (request.acceptedTypes[0] === 'text/xml') {
    // create a valid XML string with name and age tags.
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>${cat.name}</name>`;
    responseXML = `${responseXML} <age>${cat.age}</age>`;
    responseXML = `${responseXML} </response>`;

    // return response passing out string and content type
    return respond(request, response, responseXML, 'text/xml');
  }

  // stringify the json object (so it doesn't use references/pointers/etc)
  // but is instead a flat string object.
  // Then write it to the response.
  const catString = JSON.stringify(cat);

  // return response passing json and content type
  return respond(request, response, catString, 'application/json');
};// end of get cats

// function to handle the index page
/* i dont think we need this. at least not here
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};*/

// exports to set functions to public.
// In this syntax, you can do getCats:getCats, but if they
// are the same name, you can short handle to just getCats,
// change this to the statuses we need. 

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};