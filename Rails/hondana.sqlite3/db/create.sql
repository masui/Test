drop table if exists bookinfos;
create table bookinfos (
  id INTEGER PRIMARY KEY,
  isbn VARCHAR(10)            not null,
  title VARCHAR(100)       not null,
  publisher VARCHAR(100)   not null,
  authors VARCHAR(200),
  price INTEGER,
  imageurl VARCHAR(100)
);
