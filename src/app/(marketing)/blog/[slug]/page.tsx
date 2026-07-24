import { client } from "@/sanity/lib/client"
import { getPostBySlugQuery, getPostsQuery } from "@/sanity/lib/queries"
import { urlForImage } from "@/sanity/lib/image"
import { notFound } from "next/navigation"
import { PortableText, PortableTextComponents } from "@portabletext/react"

function isChildrenEmpty(children: React.ReactNode): boolean {
  if (children === null || children === undefined || children === '') return true
  if (typeof children === 'string') return children.trim() === ''
  if (Array.isArray(children)) {
    if (children.length === 0) return true
    return children.every((child) => isChildrenEmpty(child))
  }
  if (typeof children === 'object' && children !== null && 'props' in children) {
    const props = (children as any).props
    if (props && 'children' in props) {
      return isChildrenEmpty(props.children)
    }
  }
  return false
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      if (isChildrenEmpty(children)) {
        return <p className="min-h-[1.5em] whitespace-pre-wrap">&nbsp;</p>
      }
      return <p className="whitespace-pre-wrap">{children}</p>
    },
    h1: ({ children }) => <h1 className="whitespace-pre-wrap">{children}</h1>,
    h2: ({ children }) => <h2 className="whitespace-pre-wrap">{children}</h2>,
    h3: ({ children }) => <h3 className="whitespace-pre-wrap">{children}</h3>,
    h4: ({ children }) => <h4 className="whitespace-pre-wrap">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="whitespace-pre-wrap">{children}</blockquote>,
  },
}
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
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p>No content available.</p>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  )
}
