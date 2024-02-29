﻿using Barkeep.Models;
using Barkeep.Utils;
using Microsoft.Data.SqlClient;

namespace Barkeep.Repositories
{
    public class CountryRepository : BaseRepository, ICountryRepository
    {
        public CountryRepository(IConfiguration configuration) : base(configuration) { }

        //Private helper methods to DRY out Country SQL queries
        private string GetCountries()
        {
            return @"SELECT 
                    c.Id, c.Name
                    
                    FROM [Country] c";
        }

        private string OrderByName()
        {
            return " ORDER BY c.Name";
        }

        private Country CountryObject(SqlDataReader reader)
        {
            Country country = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
            return country;
        }

        public List<Country> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCountries();
                    sql += OrderByName();
                    cmd.CommandText = sql;

                    var categories = new List<Country>();

                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Country country = CountryObject(reader);

                        categories.Add(country);
                    }

                    reader.Close();
                    return categories;
                }
            }
        }

        public Country GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = GetCountries();
                    sql += " WHERE c.Id = @id";
                    cmd.CommandText = sql;

                    DbUtils.AddParameter(cmd, "@id", id);

                    Country country = null;
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        country = CountryObject(reader);
                    }

                    reader.Close();
                    return country;
                }
            }
        }
    }
}
