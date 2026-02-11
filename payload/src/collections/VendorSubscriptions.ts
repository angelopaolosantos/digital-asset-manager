// collections/VendorSubscriptions.ts
import { CollectionConfig } from 'payload'

export const VendorSubscriptions: CollectionConfig = {
  slug: 'vendor-subscriptions',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'vendors',
      required: true,
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Expired', value: 'expired' },
      ],
    },
    {
      name: 'tier',
      type: 'select',
      defaultValue: 'basic',
      options: [
        { label: 'Basic', value: 'basic' },
        { label: 'Premium', value: 'premium' },
      ],
    },
    {
      name: 'expiresAt',
      type: 'date',
    },
  ],
}
