using eShopKeeb.Contract.Abstractions;

namespace eShopKeeb.Catalog.Entities
{
    public class Category : EntityAuditBase<Guid>
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = string.Empty;

        public int DisplayOrder { get; set; } = 0;

        public Category() { }

        public static Category Create(string name, string description = "", int displayOrder = 0)
        {
            return new Category
            {
                Name = name,
                Description = description,
                DisplayOrder = displayOrder
            };
        }
    }
}
