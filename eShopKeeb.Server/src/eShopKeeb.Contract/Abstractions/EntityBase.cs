using eShopKeeb.Contract.Abstractions.Entities;

namespace eShopKeeb.Contract.Abstractions
{
    public class EntityBase<TKey> : IEntityBase<TKey>
    {
        public TKey Id { get; set; }
    }
}
