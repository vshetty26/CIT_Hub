'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const NextStudio = dynamic(() => import('next-sanity/studio').then(mod => mod.NextStudio), { ssr: false })

export default function StudioPage() {
  const config = useMemo(() => ({
    name: 'cithub-projects',
    title: 'CIT Hub Projects',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'tz810ks6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    plugins: [],
    schema: {
      types: [],
    },
  }), [])

  return <NextStudio config={config} />
}

