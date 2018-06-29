"use strict";

import * as mongoose from "mongoose";

export interface IState extends mongoose.Document {
    description: string;
    user: mongoose.Schema.Types.ObjectId;
    updated: Number;
  }

  export let StateSchema = new mongoose.Schema({
    description: {
      type: String,
      default: "",
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "Usuario es requerido"
    },
    updated: {
        type: Date,
        default: Date.now()
      },
  }, { collection: "states" });
  /**
   * Antes de guardar
   */
  StateSchema.pre("save", function (this: IState, next) {
    this.updated = Date.now();

    next();
  });

  export let State = mongoose.model<IState>("State", StateSchema);
