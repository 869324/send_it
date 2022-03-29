create proc getUser @id varchar(max) 
as
select * from users where id = @id and isDeleted = 'false';