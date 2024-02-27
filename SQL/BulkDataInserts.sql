USE Barkeep;
GO

ALTER TABLE [Component] DROP CONSTRAINT [FK_Component_Country];
GO
ALTER TABLE [State] DROP CONSTRAINT [FK_State_Country];
GO
ALTER TABLE [Bar] DROP CONSTRAINT [FK_Bar_Country];
GO
TRUNCATE TABLE [Country];
BULK INSERT [Country]
FROM 'C:\Users\Molly Blossom\workspace\Barkeep\BulkDataCSV\Countries.csv'
WITH (
	FORMAT='CSV',
	FIRSTROW=2
)
GO
ALTER TABLE [Component] ADD CONSTRAINT [FK_Component_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([Id]);
GO
ALTER TABLE [Bar] ADD CONSTRAINT [FK_Bar_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([Id]);
GO


ALTER TABLE [Component] DROP CONSTRAINT [FK_Component_State];
GO
ALTER TABLE [Region] DROP CONSTRAINT [FK_Region_State];
GO
ALTER TABLE [Bar] DROP CONSTRAINT [FK_Bar_State];
GO
TRUNCATE TABLE [State];
BULK INSERT [State]
FROM 'C:\Users\Molly Blossom\workspace\Barkeep\BulkDataCSV\States.csv'
WITH (
	FORMAT='CSV',
	FIRSTROW=2
)
GO
ALTER TABLE [State] ADD CONSTRAINT [FK_State_Country] FOREIGN KEY ([CountryId]) REFERENCES [Country] ([Id]);
GO
ALTER TABLE [Component] ADD CONSTRAINT [FK_Component_State] FOREIGN KEY ([StateId]) REFERENCES [State] ([Id]);
GO
ALTER TABLE [Region] ADD CONSTRAINT [FK_Region_State] FOREIGN KEY ([StateId]) REFERENCES [State] ([Id]);
GO
ALTER TABLE [Bar] ADD CONSTRAINT [FK_Bar_State] FOREIGN KEY ([StateId]) REFERENCES [State] ([Id]);
GO


ALTER TABLE [Category] DROP CONSTRAINT [FK_Category_Provider_Bar];
GO
ALTER TABLE [MenuCategory] DROP CONSTRAINT [FK_MenuCategory_Category];
GO
ALTER TABLE [ComponentCategory] DROP CONSTRAINT [FK_ComponentCategory_Category];
GO
TRUNCATE TABLE [Category];
BULK INSERT [Category]
FROM 'C:\Users\Molly Blossom\workspace\Barkeep\BulkDataCSV\Categories.csv'
WITH (
	FORMAT='CSV',
	FIRSTROW=2
)
GO
ALTER TABLE [Category] ADD CONSTRAINT [FK_Category_Provider_Bar] FOREIGN KEY ([ProviderBarId]) REFERENCES [Bar] ([Id]);
GO
ALTER TABLE [MenuCategory] ADD CONSTRAINT [FK_MenuCategory_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]);
GO
ALTER TABLE [ComponentCategory] ADD CONSTRAINT [FK_ComponentCategory_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]);
GO

ALTER TABLE [Varietal] DROP CONSTRAINT [FK_Varietal_VarietalType];
GO
TRUNCATE TABLE [Varietal];
BULK INSERT [Varietal]
FROM 'C:\Users\Molly Blossom\workspace\Barkeep\BulkDataCSV\Varietals.csv'
WITH (
	FORMAT='CSV',
	FIRSTROW=2
)
GO

ALTER TABLE [Varietal] ADD CONSTRAINT [FK_Varietal_VarietalType] FOREIGN KEY ([VarietalTypeId]) REFERENCES [VarietalType] ([Id]);
GO