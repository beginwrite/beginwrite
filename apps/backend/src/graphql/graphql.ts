/* tslint:disable */
/* eslint-disable */
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

export interface User {
  id: string;
  name: string;
}

export interface IMutation {
  createUser(name: string): User | Promise<User>;
}

export interface IQuery {
  users(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

type Nullable<T> = T | null;
