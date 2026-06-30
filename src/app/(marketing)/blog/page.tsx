import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { getPostsQuery } from "@/sanity/lib/queries"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card"
import { urlForImage } from "@/sanity/lib/image"

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
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-brand-fg sm:text-5xl font-serif">Insights</h1>
            <p className="mt-4 text-lg text-brand-fg/70">
              Perspectives on navigating business transitions and growth.
            </p>
          </div>
          
          {posts?.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {posts.map((post: any) => (
                <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
                  <Card className="h-full flex flex-col overflow-hidden hover:border-brand-primary/50 transition-colors">
                    {post.mainImage && (
                      <div className="aspect-video w-full overflow-hidden bg-brand-muted">
                        <img 
                          src={urlForImage(post.mainImage)?.url()} 
                          alt={post.mainImage.alt || post.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="text-xs text-brand-fg/50 mb-2">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <CardTitle className="text-xl group-hover:text-brand-primary transition-colors">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-brand-fg/80 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-brand-fg/60">
              <p>No posts available yet. Check back soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
