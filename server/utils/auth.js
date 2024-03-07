const jwt = ("jsonwebtoken");

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function (req, res, next) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if(req.headers.authorization) {
            token = token.split(" ").pop.trim();
        }

        try {
            const {data} = jwt.verify(token, secret, {maxAge: expiration});
            const user = data;
            return {user};
        } catch {
            console.log("There seems to be a problem with the security token you're using. Please verify and try again. (Code: 5x85535556)");

        }
        return req;
    },

    signToken: function({username, email, _id}) {
        const payload = {username, email, _id};

        return jwt.sign({data: payload}, secret, {expiresIn: expiration});
    },
};