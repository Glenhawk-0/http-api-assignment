// do html and css
// function to handle the index page
// i dont think we need this. at least not here

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

const getCSS = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getIndex,
  // getCSS
};
