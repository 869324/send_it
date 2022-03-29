create proc checkUserExistence @email varchar(max), @username varchar(max)
as
select * from users where email = @email or username = @username;