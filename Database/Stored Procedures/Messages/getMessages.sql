CREATE PROC getMessages @page int = 1, @size int = 20, @search varchar(max) = null
AS
SELECT * FROM messages WHERE isDeleted = 'false' and (@search is null or name like '%' +@search+ '%' or email like '%' +@search+ '%' or message like '%' +@search+ '%')
ORDER BY date DESC
OFFSET (@page - 1) * @size ROWS
FETCH NEXT @size ROWS ONLY;
