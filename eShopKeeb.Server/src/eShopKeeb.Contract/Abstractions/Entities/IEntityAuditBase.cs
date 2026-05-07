using eShopKeeb.Contract.Abstractions.Interfaces;

namespace eShopKeeb.Contract.Abstractions.Entities
{
    public interface IEntityAuditBase<TKey> : IEntityBase<TKey>, IAuditEntity, ISoftDelete
    {

    }
}
