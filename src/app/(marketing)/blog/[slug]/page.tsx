import { client } from "@/sanity/lib/client"
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { JsonLd } from "@/components/JsonLd"
import { Reveal, AnimatedText, Parallax } from "@/components/anim"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  let post = null
  try {
    const resolvedParams = await params;
    post = await client.fetch(getPostBySlugQuery, { slug: resolvedParams.slug })
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  let post = null
  try {
    const resolvedParams = await params;
    post = await client.fetch(getPostBySlugQuery, { slug: resolvedParams.slug })
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
    <div className="py-28 md:py-36">
      <JsonLd data={articleData} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal direction="up" distance={12}>
            <Link href="/blog" className="link-underline mb-8 inline-flex items-center text-sm font-medium text-[#94a3b8] transition-colors hover:text-[#6366f1]">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog
            </Link>
          </Reveal>

          <div className="mb-12">
            <Reveal direction="up">
              <div className="mb-4 text-sm text-[#94a3b8]">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.04}
              className="font-serif text-4xl font-bold tracking-tight text-[#f1f5f9] md:text-5xl lg:text-6xl"
            >
              {post.title}
            </AnimatedText>
          </div>

          {post.mainImage && (
            <Reveal direction="up" scale distance={24}>
              <div className="mb-12 aspect-video overflow-hidden rounded-2xl bg-white/[0.05]">
                <Parallax speed={-0.1} className="h-full w-full">
                  <img
                    src={urlForImage(post.mainImage)?.url()}
                    alt={post.mainImage.alt || post.title}
                    className="h-[115%] w-full object-cover"
                  />
                </Parallax>
              </div>
            </Reveal>
          )}

          <Reveal direction="up" className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#f1f5f9] prose-p:text-[#94a3b8] prose-a:text-[#6366f1] hover:prose-a:text-[#6366f1]/80">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>No content available.</p>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  )
}
