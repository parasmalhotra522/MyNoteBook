import jwt from 'jsonwebtoken';

export const authGuard = (req, res, next) => {

    const authHeader = req.headers.authorization;
    let token;
    // console.log("In tehe auth header,", authHeader)

     if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Extract the token part
    } else {
        return res.status(401).send({ "error": "Authorization header missing or invalid" });
    }
    

     if (token) {
        // console.log("Check the token", token, toString(token));
        try {
            const decodedData = jwt.verify(token, process.env.JWTSecretKey);
            req.userId = decodedData.id;
            // console.log(".. User id", decodedData);
            next();
        } catch (error) {
            // console.log('CHeck the error', error);
            res.status(401).send({ "error": "Invalid Token" });
        }
    } else {
        res.status(401).send({ "error": "Token not provided" });
    }
    //  if(!token) {
    //         res.status(401).send({"error": "Invalid Token"})
    // }

    // if (req.cookies.jwt) {

    //     try {
    //         token = req.cookies.jwt;
    //         console.log("Token", token);
    //         const decodedData =  jwt.verify(token, process.env.JWTSecretKey);
    //         // console.log("DECODED", decodedData);
    //         req.userId = decodedData.id;
    //         next();
            
    //     } catch (error) {
    //                   res.status(401).send({"error": "Invalid Token"})
  
    //     }
    // }
   





}