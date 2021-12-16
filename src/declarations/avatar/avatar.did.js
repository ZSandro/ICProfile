export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Trie = IDL.Rec();
  const Branch = IDL.Record({
    'left' : Trie,
    'size' : IDL.Nat,
    'right' : Trie,
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({ 'key' : IDL.Text, 'hash' : Hash });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Text), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Text), List));
  const Leaf = IDL.Record({ 'size' : IDL.Nat, 'keyvals' : AssocList });
  Trie.fill(
    IDL.Variant({ 'branch' : Branch, 'leaf' : Leaf, 'empty' : IDL.Null })
  );
  const Bio = IDL.Record({
    'nickName' : IDL.Opt(IDL.Text),
    'about' : IDL.Opt(IDL.Text),
    'socialAccounts' : IDL.Opt(Trie),
    'imageUrl' : IDL.Opt(IDL.Text),
    'location' : IDL.Opt(IDL.Text),
  });
  const ProfileUpdate = IDL.Record({
    'bio' : Bio,
    'image' : IDL.Opt(IDL.Text),
  });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const Profile = IDL.Record({
    'id' : IDL.Principal,
    'bio' : Bio,
    'image' : IDL.Opt(IDL.Text),
  });
  const Result_1 = IDL.Variant({ 'ok' : Profile, 'err' : Error });
  return IDL.Service({
    'create' : IDL.Func([ProfileUpdate], [Result], []),
    'delete' : IDL.Func([], [Result], []),
    'read' : IDL.Func([IDL.Principal], [Result_1], []),
    'update' : IDL.Func([ProfileUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
