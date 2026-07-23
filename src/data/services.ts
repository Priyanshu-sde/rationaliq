import { Network, BookOpen, Store, LineChart, type LucideIcon } from 'lucide-react'

export interface Service {
  id: string
  code: string
  name: string
  title: string
  tag: string
  audience: string
  blurb: string
  desc: string
  body: string
  href: string
  image: string
  color: string
  accent: string
  glow: string
  icon: LucideIcon
  points: string[]
}

export const SERVICES: Service[] = [
  {
    id: 'family',
    code: '01',
    name: 'Family Business',
    title: 'Family Business',
    tag: 'STEWARDS',
    audience: 'STEWARDS',
    blurb:
      'Leverage our experience led by a Chartered Accountant and Certified Family Business Advisor from FFI USA who was born in a business family as a one stop solution.',
    desc:
      'Leverage the experience of a Chartered Accountant and Certified Family Business Advisor from FFI USA who was born in a business family as a one stop solution.',
    body:
      'Leverage the experience of a Chartered Accountant and Certified Family Business Advisor from FFI USA who was born in a business family as a one stop solution.',
    href: '/services/family-businesses',
    image: '/family.jpg',
    color: '#fcd34d', // amber-300
    accent: '#fcd34d',
    glow: 'rgba(252, 211, 77, 0.13)',
    icon: Network,
    points: [
      'Succession planning',
      'Constitution and family board assistance',
      'Next gen coaching',
      'Professionalisation exercise',
      'Business advisory',
      'Thought leadership and personal branding',
      'Estate and wealth planning',
    ],
  },
  {
    id: 'education',
    code: '02',
    name: 'Education',
    title: 'Education',
    tag: 'INSTITUTIONS',
    audience: 'INSTITUTIONS',
    blurb:
      'Feel the transformation through education and training initiatives that are always hands on, directly translate to skills and change the way you think.',
    desc:
      'Feel the transformation through education and training initiatives that are always hands on, directly translate to skills and change the way you think.',
    body:
      'Feel the transformation through education and training initiatives that are always hands on, directly translate to skills and change the way you think.',
    href: '/services/educational-companies',
    image: '/education.jpg',
    color: '#99f6e4', // teal-200
    accent: '#99f6e4',
    glow: 'rgba(153, 246, 228, 0.13)',
    icon: BookOpen,
    points: [
      'Industry readiness programs for students (Finance, Sales, Soft Skills & Communication)',
      'Customised & goal-based corporate training',
      'Practical & industry-ready educational content and curriculum',
      'Distribution of education content on YouTube or LMS',
    ],
  },
  {
    id: 'startups',
    code: '03',
    name: 'D2C Startups',
    title: 'D2C Startups',
    tag: 'FOUNDERS',
    audience: 'FOUNDERS',
    blurb:
      "If you've peaked at selling online and want fractional business intelligence for your offline retail strategy, you're at the right place.",
    desc:
      "If you've peaked at selling online and want fractional business intelligence for your offline retail strategy, you're at the right place.",
    body:
      "If you've peaked at selling online and want fractional business intelligence for your offline retail strategy, you're at the right place.",
    href: '/services/startups',
    image: '/startup.jpg',
    color: '#e879f9', // fuchsia-400
    accent: '#e879f9',
    glow: 'rgba(232, 121, 249, 0.13)',
    icon: Store,
    points: [
      'Retail store design',
      'Display strategy',
      'Sales trainings',
      'In-store demonstration staff training',
      'Product and price placement',
      'Customer & in-store SOP creation',
    ],
  },
  {
    id: 'vc',
    code: '04',
    name: 'Investors & Personal Brands',
    title: 'Investors & Personal Brands',
    tag: 'INVESTORS',
    audience: 'INVESTORS',
    blurb:
      'Get seen by top 1% of your audience through thought leadership IPs. And yes, content creation is not thought leadership.',
    desc:
      'Get seen by top 1% of your audience through thought leadership IPs. And yes, content creation is not thought leadership.',
    body:
      'Get seen by top 1% of your audience through thought leadership IPs. And yes, content creation is not thought leadership.',
    href: '/services/venture-capital',
    image: '/vc.jpg',
    color: '#f59e0b', // amber-500
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.13)',
    icon: LineChart,
    points: [
      'Thought leadership vs mass content creation',
      'Unique & counter-intuitive IP creation',
      'Top 1% founder attraction & positioning',
      'Blunt truth industry authority',
    ],
  },
]
