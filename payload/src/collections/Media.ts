// collections/Media.ts
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: true,
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      const user = req.user

      // Admin can read all media
      if (user?.role === 'admin') return true

      const or: any[] = []

      // public media is accessible to everyone
      or.push({ accessLevel: { equals: 'public' } })

      // vendor can read their own media
      if (user?.role === 'vendor' && user.vendor) {
        or.push({
          vendor: { equals: user.vendor },
        },)
      }

      if (user?.role === 'client' && user.subscribedVendors?.length) {
        or.push({
          and: [
            { accessLevel: { equals: 'subscriber' } },
            {
              vendor: {
                in: user.subscribedVendors,
              }
            },
          ]
        })
      }

      if (user?.id) {
        or.push({
          and: [
            { accessLevel: { equals: 'exclusive' } },
            { allowedClients: { contains: user.id } },
          ],
        })
      }

      // 🚨 ALWAYS return ONE Where object
      return { or }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'vendors',
      required: true,
    },
    {
      name: 'accessLevel',
      type: 'select',
      defaultValue: 'subscriber',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Subscriber', value: 'subscriber' },
        { label: 'Exclusive', value: 'exclusive' },
        { label: 'Private', value: 'private' },
      ],
    },
    {
      name: 'allowedClients',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        condition: (_, siblingData) =>
          siblingData.accessLevel === 'exclusive',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'usageRights',
      type: 'textarea',
    },
    {
      name: 'expirationDate',
      type: 'date',
    },
    {
      name: 'downloadable',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'storagePath',
      type: 'text',
      admin: { readOnly: true },
    },
  ],
  hooks: {
    beforeChange: [],
    afterChange: [],
  }
}

