create table messages (id int identity primary key not null, 
name varchar(max) not null,
email varchar(max) not null,
message varchar(max) not null,
date datetime2 not null,
isRead varchar(max) not null default 'false',
isDeleted varchar(max) default 'false' not null)