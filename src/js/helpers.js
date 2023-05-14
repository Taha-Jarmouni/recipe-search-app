import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';



const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData  

      ? fetch(url, { 
        
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json', 
          },                                   
          body: JSON.stringify(uploadData)
        })

      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json(); 
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};


























// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);//10s
//       const data = await res.json();
//       // console.log(res, data);
//       if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err
//   }
// };
// export const sendJSON = async function (url, uploadData) {
//   try {
  //     const fetchPro = fetch(url, {
    //       method: 'POST', // method post to send info into the api
    //       headers: { 
      //         'Content-Type': 'application/json', // make sure you write that right, we tell the api that the data that we going to send is going to be a Json format
      //       },                                    // then the api can accept that data and create a new recipe in the database 
//       body: JSON.stringify(uploadData)// that data convert to Json string so that can be sent
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json(); // await any data can coming back bc this forkify api return the data back that we just sent 
//     console.log(data);
//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };


