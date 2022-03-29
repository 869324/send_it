create proc deleteUser @id varchar(max)
as
update users set isDeleted = 'true' where id= @id;