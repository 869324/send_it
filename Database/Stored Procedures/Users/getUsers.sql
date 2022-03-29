CREATE PROC getUsers @page int = 1, @size int = 10, @order varchar(max) = 'fullname asc', @search varchar(max) = null

AS
SELECT * FROM users
WHERE
    isDeleted = 'false' 
    AND (@search is null or (fullname like '%' +@search+ '%' or email like '%' +@search+ '%'))

ORDER BY 
	CASE WHEN @order = 'fullname desc' THEN fullname END DESC,
	CASE WHEN @order = 'fullname asc' THEN fullname END ASC

OFFSET (@page - 1) * @size rows
FETCH NEXT @size ROWS ONLY;