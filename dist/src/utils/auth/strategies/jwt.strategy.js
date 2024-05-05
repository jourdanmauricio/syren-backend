"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const envs_1 = require("../../../config/envs");
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: envs_1.config.jwtSecret,
};
const JwtStrategy = new passport_jwt_1.Strategy(options, (payload, done) => {
    return done(null, payload);
});
exports.default = JwtStrategy;
