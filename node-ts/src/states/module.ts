"use strict";

import { Express } from "express";
import * as passport from "passport";
import * as state from "./states.service";

export function init(app: Express) {
  // Rutas de acceso a mascotas
  app
    .route("/states")
    .get(passport.authenticate("jwt", { session: false }), state.findByCurrentUser)
    .post(passport.authenticate("jwt", { session: false }), state.update);

}
