import Cookies from 'js-cookie';

export const useCookies = () => {
  const setCookies = (userData) => {
    // const expiresIn = ((new Date()).getTime() + 1000 * 36000) ;

    // console.log("Expiring time", expiresIn)
    Cookies.set('user', JSON.stringify(userData), { expires: 60*60 });
  }
  const getCookies = () => {
   return Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  }
  
  const removeCookies = () => {
    console.log("Checking remove cookies ")
    Cookies.remove('user');
  }
  return {setCookies, getCookies, removeCookies}
}


