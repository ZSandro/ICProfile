import type { Principal } from '@dfinity/principal';
export type AssocList = [] | [[[Key, string], List]];
export interface Bio {
  'nickName' : [] | [string],
  'about' : [] | [string],
  'socialAccounts' : [] | [Trie],
  'imageUrl' : [] | [string],
  'location' : [] | [string],
}
export interface Branch { 'left' : Trie, 'size' : bigint, 'right' : Trie }
export type Error = { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null };
export type Hash = number;
export interface Key { 'key' : string, 'hash' : Hash }
export interface Leaf { 'size' : bigint, 'keyvals' : AssocList }
export type List = [] | [[[Key, string], List]];
export interface Profile {
  'id' : Principal,
  'bio' : Bio,
  'image' : [] | [string],
}
export interface ProfileUpdate { 'bio' : Bio, 'image' : [] | [string] }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Profile } |
  { 'err' : Error };
export type Trie = { 'branch' : Branch } |
  { 'leaf' : Leaf } |
  { 'empty' : null };
export interface _SERVICE {
  'create' : (arg_0: ProfileUpdate) => Promise<Result>,
  'delete' : () => Promise<Result>,
  'read' : (arg_0: Principal) => Promise<Result_1>,
  'update' : (arg_0: ProfileUpdate) => Promise<Result>,
}
