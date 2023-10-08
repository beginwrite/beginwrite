
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    name: string;
}

export interface IQuery {
    users(): Nullable<User[]> | Promise<Nullable<User[]>>;
}

type Nullable<T> = T | null;
