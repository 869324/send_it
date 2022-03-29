CREATE PROC getMessage @id int
AS
SELECT * FROM messages where id = @id and isDeleted = 'false';