create table users (
id varchar(100) primary key not null,
username varchar(max) not null,
fullname varchar(max) not null,
phone varchar(max) not null,
email varchar(max) not null,
password varchar(max) not null,
isAdmin varchar(max) default 'false' not null,
isDeleted varchar(max) not null default 'false',
isSent varchar(max) not null default 'false',
);