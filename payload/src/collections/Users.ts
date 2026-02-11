// collections/Users.ts
import { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'client',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Client', value: 'client' },
      ],
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'vendors',
      admin: {
        condition: (_, siblingData) => siblingData.role === 'vendor',
      },
    },
    {
      name: 'subscribedVendors',
      type: 'relationship',
      relationTo: 'vendors',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.role === 'client',
      },
    },
  ],
}
