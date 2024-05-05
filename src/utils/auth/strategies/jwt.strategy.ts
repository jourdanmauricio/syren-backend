import {
  Strategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { config } from '../../../config/envs';

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret!,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

export default JwtStrategy;
