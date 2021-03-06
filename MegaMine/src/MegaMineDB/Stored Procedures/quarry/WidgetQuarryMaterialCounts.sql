IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetQuarryMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetQuarryMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetQuarryMaterialCounts]
(
	@CompanyID int
)
AS
BEGIN
	SET NOCOUNT ON;

    WITH cte AS (
      SELECT ROW_NUMBER() OVER (ORDER BY (COUNT(mat.MaterialId)) DESC) AS Seq, 
        qry.QuarryId, qry.QuarryName, COUNT(mat.MaterialId) AS MaterialCount
      FROM quarry.Material mat
		JOIN quarry.Quarry qry ON mat.QuarryId = qry.QuarryId
	  WHERE mat.CompanyId = @CompanyID AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
      GROUP BY qry.QuarryId, qry.QuarryName
    )
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Pie', X = QuarryName, Y = MaterialCount, KeyOrder = 0, XOrder = 0 FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Pie', X = 'Others', Y = SUM(MaterialCount), KeyOrder = 0, XOrder = 1 FROM cte WHERE Seq > 5
	HAVING SUM(MaterialCount) IS NOT NULL
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go

--exec [quarry].[WidgetQuarryMaterialCounts] 4