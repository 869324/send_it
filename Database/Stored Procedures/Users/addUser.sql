CREATE PROC addUser @id varchar(max), @username varchar(max), @fullname varchar(max), @phone varchar(max), @email varchar(max), @password varchar(max)
AS
INSERT INTO users (id, username, fullname, phone, email, password) VALUES (@id, @username, @fullname, @phone, @email, @password);