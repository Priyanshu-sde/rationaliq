import { type SchemaTypeDefinition } from 'sanity'

import { post } from './post'
import { testimonial } from './testimonial'
import { metric } from './metric'
import { clientLogo } from './clientLogo'
import { teamMember } from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, testimonial, metric, clientLogo, teamMember],
}
