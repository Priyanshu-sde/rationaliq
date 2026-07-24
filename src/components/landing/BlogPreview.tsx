'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlForImage } from '@/sanity/lib/image'

export interface BlogPreviewPost {
  _id: string
  title: string
  slug?: { current?: string }
  excerpt?: string
  publishedAt?: string
  mainImage?: { asset?: unknown; alt?: string }
}

const PLACEHOLDERS: BlogPreviewPost[] = [
  {
    _id: 'ph-1',
    title: 'Why Every Family Business Needs a Constitution Before It Needs a CFO',
    excerpt:
      'The document that prevents the disputes no spreadsheet can fix - and how to start writing one.',
  },
  {
    _id: 'ph-2',
    title: 'The Thought Leadership Flywheel: From First Post to First Inbound Deal',
  },
  {
    _id: 'ph-3',
    title: 'What VC Diligence Actually Looks For (From Someone Who Ran It)',
  },
]

function formatDate(iso?: string) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function readTime(post: BlogPreviewPost) {
  const words = (post.excerpt ?? post.title).split(/\s+/).length
  return `${Math.max(3, Math.round(words / 40) + 3)} min read`
}

/**
 * Section 7 - Blog preview. Featured post (7 cols) + two stacked
 * smaller posts (5 cols). Falls back to styled placeholders when
 * Sanity has no posts yet.
 */
export function BlogPreview({ posts }: { posts: BlogPreviewPost[] }) {
  const reduce = useReducedMotion()

  if (!posts || posts.length === 0) {
    return null
  }

  const items = posts.slice(0, 3)
  const isPlaceholder = false
  const [featured, ...rest] = items

  const cardEntrance = (i: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' } as const,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  })

  const href = (p: BlogPreviewPost) =>
    isPlaceholder || !p.slug?.current ? '/blog' : `/blog/${p.slug.current}`

  const imageUrl = (p: BlogPreviewPost) => {
    if (isPlaceholder || !p.mainImage?.asset) return null
    try {
      return urlForImage(p.mainImage).width(1200).height(500).url()
    } catch {
      return null
    }
  }

  return (
    <section className="relative bg-(--bg-base) py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-label text-(--gold)">Fresh thinking</p>
            <h2 className="font-display text-section mt-5 text-(--text-primary)">
              From the desk
              <br />
              of Hitesh.
            </h2>
          </div>
          <Link
            href="/blog"
            className="tier-1 group inline-flex items-center gap-2 pb-2 text-sm font-medium text-(--text-secondary) hover:text-(--text-primary)"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Featured */}
          <motion.div className="md:col-span-7" {...cardEntrance(0)}>
            <Link
              href={href(featured)}
              className="tier-2 press group flex h-full flex-col overflow-hidden rounded-2xl border border-(--border) bg-(--bg-card) hover:border-(--border-hover) hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
            >
              <div className="relative h-[200px] overflow-hidden md:h-[240px]">
                {imageUrl(featured) ? (
                  <Image
                    src={imageUrl(featured)!}
                    alt={featured.mainImage?.alt ?? featured.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    style={{
                      background:
                        'linear-gradient(120deg, rgba(99,102,241,0.35), rgba(139,92,246,0.25) 55%, rgba(7,8,15,0.6)), #0B0D1A',
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="text-label flex items-center gap-2 text-(--indigo)">
                  <span className="h-1.5 w-1.5 rounded-full bg-(--indigo)" aria-hidden="true" />
                  Insights
                </p>
                <h3 className="font-display mt-4 text-[1.2rem] leading-snug text-(--text-primary)">
                  {featured.title}
                </h3>
                {featured.excerpt && (
                  <p className="mt-3 text-sm leading-relaxed text-(--text-secondary)">
                    {featured.excerpt}
                  </p>
                )}
                <p className="mt-auto pt-6 text-xs text-(--text-muted)">
                  {formatDate(featured.publishedAt) ?? 'Coming soon'} &middot; {readTime(featured)}
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Two smaller posts */}
          <div className="flex flex-col gap-5 md:col-span-5">
            {rest.map((post, i) => (
              <motion.div key={post._id} className="flex-1" {...cardEntrance(i + 1)}>
                <Link
                  href={href(post)}
                  className="tier-2 press group flex h-full flex-col rounded-2xl border border-(--border) bg-(--bg-card) p-7 hover:border-(--border-hover) hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]"
                >
                  <p className="text-label flex items-center gap-2 text-(--gold)">
                    <span className="h-1.5 w-1.5 rounded-full bg-(--gold)" aria-hidden="true" />
                    Insights
                  </p>
                  <h3 className="font-display mt-3.5 text-base leading-snug text-(--text-primary)">
                    {post.title}
                  </h3>
                  <p className="mt-auto pt-5 text-xs text-(--text-muted)">
                    {formatDate(post.publishedAt) ?? 'Coming soon'} &middot; {readTime(post)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
