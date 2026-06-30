import { client } from "@/sanity/lib/client"
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  let post = null
  try {
    post = await client.fetch(getPostBySlugQuery, { slug: params.slug })
  } catch (error) {
    console.warn('Could not fetch post metadata')
  }
  if (!post) return { title: 'RationalIQ' }
  
  return {
    title: post.seoTitle || `${post.title} | RationalIQ`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      images: post.mainImage ? [urlForImage(post.mainImage)?.url()] : [],
    }
  }
}

export async function generateStaticParams() {
  let posts = []
  try {
    posts = await client.fetch(getPostsQuery)
  } catch (error) {
    console.warn('Could not fetch static params')
  }
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post = null
  try {
    post = await client.fetch(getPostBySlugQuery, { slug: params.slug })
  } catch (error) {
    console.warn('Could not fetch post')
  }

  if (!post) {
    notFound()
  }

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": post.mainImage ? [urlForImage(post.mainImage)?.url()] : [],
    "datePublished": post.publishedAt,
    "author": [{
        "@type": "Person",
        "name": "Hitesh Saiswani",
        "url": "https://rationaliq.com/team"
      }]
  }

  return (
    <div className="py-20 md:py-32">
      <JsonLd data={articleData} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-brand-fg/70 hover:text-brand-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog
          </Link>
          
          <div className="mb-12">
            <div className="text-sm text-brand-fg/60 mb-4">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-brand-fg md:text-5xl lg:text-6xl font-serif">
              {post.title}
            </h1>
          </div>

          {post.mainImage && (
            <div className="mb-12 rounded-2xl overflow-hidden aspect-video bg-brand-muted">
              <img 
                src={urlForImage(post.mainImage)?.url()} 
                alt={post.mainImage.alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-fg prose-p:text-brand-fg/80 prose-a:text-brand-primary hover:prose-a:text-brand-primary/80 max-w-none">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
