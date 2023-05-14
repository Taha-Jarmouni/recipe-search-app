

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = '95dfe643-e22b-4216-8aed-e2e7bb1a8380';
export const MODAL_CLOSE_SEC = 2.5; //2.5s


































/*

*So remember here in the helpers function whenever we get this error 
/(if (!res.ok) throw new Error(`${data.message} (${res.status})`);)/
iside of the getJson in helpers.js file
then that error was not automatically propagated down to this loadRecipe async function
which was actually calling the getJson function in the model.js file and so therefore we
had to re-throw the error here in the helpers.js file so basically to mark this whole promise
here as rejected in the helpers.js file so that then here in the model.js we would get
into this catch block but now here again in the model.js we have the
same problem because now if we get an error here then this promise so this whole
loadRecipe() promise will also not get rejected now so therefore here we will never
enter the catch Block in this function,
*Essentially we will have to do the same thing as before which is to
throw the error here in the model.js after console.error(`${err} 💥💥💣💣`);
again and so with this we will then have access to the exact same error object
as we have here
*/
















