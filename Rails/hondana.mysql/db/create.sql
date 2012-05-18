drop table if exists bookinfos;
create table bookinfos (
  id int                  not null auto_increment,
  ISBN char(10)           not null,
  title varchar(100)      not null,
  publisher varchar(100)  not null,
  authors varchar(200),
  price int,
  imageurl varchar(100),
  primary key(id)
);

