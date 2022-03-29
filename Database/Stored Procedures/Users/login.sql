CREATE PROC login @identity varchar(max)
AS
SELECT id, username, fullname, phone, password, email, isAdmin FROM users
WHERE (username = @identity or email = @identity) and isDeleted = 'false';