create proc updateUser @id varchar(100), @username varchar(max) = null, @fullname varchar(max) = null, @phone varchar(max) = null, @email varchar(max) = null,
@password varchar(max) = null, @isAdmin  varchar(max) = null, @isDeleted varchar(max) = null, @isSent  varchar(max) = null 
as 
update users set username = isNull(@username, username), fullname = isNull(@fullname, fullname), phone = isNull(@phone, phone), email = isNull(@email, email),
password = isNull(@password, password), isAdmin = isNull(@isAdmin, isAdmin), isDeleted = isNull(@isDeleted, isDeleted), isSent = isNull(@isSent, isSent)
where id = @id;
