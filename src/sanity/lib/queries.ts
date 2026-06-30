import { groq } from 'next-sanity'

export const getPostsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`

export const getPostBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`

export const getTestimonialsQuery = groq`*[_type == "testimonial"] | order(_createdAt desc)`

export const getMetricsQuery = groq`*[_type == "metric"] | order(order asc)`

export const getClientLogosQuery = groq`*[_type == "clientLogo"] | order(_createdAt asc)`
