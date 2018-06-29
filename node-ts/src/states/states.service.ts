"use strict";

import * as escape from "escape-html";
import * as express from "express";
import { NextFunction } from "express-serve-static-core";
import { IUserSessionRequest } from "../security/security.service";
import * as errorHandler from "../utils/error.handler";
import { IState, State } from "./states.schema";


export interface IReadRequest extends IUserSessionRequest {
  state: IState;
}
export function read(req: IReadRequest, res: express.Response) {
  res.json(req.state);
}

export function findByCurrentUser(req: IUserSessionRequest, res: express.Response, next: NextFunction) {
  State.find().exec(function (err, state) {
    if (err) return next();
    res.json(state);
  });
}

export function update(req: IReadRequest, res: express.Response, next: NextFunction) {
  let state = req.state;
  if (!state) {
    state = new State();
    state.user = req.user._id;
  }

  if (req.body.description) {
    state.description = req.body.description;
  }

  state.save(function (err: any) {
    if (err) return errorHandler.handleError(res, err);

    res.json(state);
  });
}
