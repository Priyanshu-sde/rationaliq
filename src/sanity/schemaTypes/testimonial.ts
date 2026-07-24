import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      description: 'Optional - allow blank/anonymized',
    }),
    defineField({
      name: 'clientRoleCompany',
      title: 'Client Role / Company',
      type: 'string',
      description: 'Optional',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'string',
      options: {
        list: [
          { title: 'Thought Leadership', value: 'thought-leadership' },
          { title: 'Family Business NextGen IQ', value: 'family-business' },
          { title: 'D2C Retail Strategy', value: 'd2c-retail' },
          { title: 'General', value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Control homepage vs. impact-page-only display',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'clientRoleCompany',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Anonymous Client',
        subtitle,
        media,
      }
    },
  },
})
