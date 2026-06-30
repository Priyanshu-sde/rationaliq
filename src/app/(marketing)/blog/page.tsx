import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { getPostsQuery } from "@/sanity/lib/queries"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { urlForImage } from "@/sanity/lib/image"
import { Reveal, AnimatedText, TiltCard, FloatingShape } from "@/components/anim"

export const metadata: Metadata = {
  title: "Blog | RationalIQ",
  description: "Insights on startups, family businesses, and retail strategy.",
}

export const revalidate = 3600

export default async function BlogPage() {
  let posts = []
  try {
    posts = await client.fetch(getPostsQuery)
  } catch (error) {
    console.warn('Could not fetch posts (likely missing Sanity credentials during build)')
  }

  return (
    <div className="relative overflow-hidden py-28 md:py-36">
      <FloatingShape
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-brand-primary/8 blur-3xl"
        amplitude={26}
        duration={11}
      />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14">
            <Reveal direction="up" distance={14}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                The blog
              </span>
            </Reveal>
            <AnimatedText
              as="h1"
              by="word"
              stagger={0.06}
              className="mt-4 font-serif text-4xl tracking-tight text-brand-fg sm:text-5xl md:text-6xl"
            >
              Insights worth the read.
            </AnimatedText>
            <Reveal direction="up" delay={0.1}>
              <p className="mt-5 text-lg text-brand-fg/70">
                Perspectives on navigating business transitions and growth.
              </p>
            </Reveal>
          </div>

          {posts?.length > 0 ? (
            <Reveal stagger={0.12} className="grid gap-8 md:grid-cols-2">
              {posts.map((post: any) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group block">
                  <TiltCard
                    max={5}
                    lift={6}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition-shadow duration-500 group-hover:shadow-xl"
                  >
                    {post.mainImage && (
                      <div className="aspect-video w-full overflow-hidden bg-brand-muted">
                        <img
                          src={urlForImage(post.mainImage)?.url()}
                          alt={post.mainImage.alt || post.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-2 text-xs text-brand-fg/50">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <CardTitle className="text-xl transition-colors group-hover:text-brand-primary">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="line-clamp-3 text-brand-fg/80">{post.excerpt}</p>
                    </CardContent>
                  </TiltCard>
                </Link>
              ))}
            </Reveal>
          ) : (
            <Reveal direction="up" className="rounded-2xl border border-dashed border-brand-border bg-brand-muted/20 py-24 text-center text-brand-fg/60">
              <p>No posts available yet. Check back soon.</p>
            </Reveal>
          )}
        </div>
      </div>
    </div>
  )
}
