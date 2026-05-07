using eShopKeeb.Contract.Abstractions.Entities;
using eShopKeeb.Contract.Abstractions.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace eShopKeeb.Contract.Abstractions
{
    public class EntityAuditBase<TKey> : EntityBase<TKey>, IAuditEntity, ISoftDelete
    {
        public DateTime CreatedAt { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public Guid? UpdatedBy { get; set; }

        public bool IsDeleted { get; set; }

        public void Delete()
        {
            IsDeleted = true;
        }
    }
}
