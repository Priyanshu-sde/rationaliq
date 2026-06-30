import { defineField, defineType } from 'sanity'

export const metric = defineType({
  name: 'metric',
  title: 'Metric',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Family business leaders served"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., "250+" (kept as string to allow "+", "K", etc.)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'For manual sort control',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
  },
})
