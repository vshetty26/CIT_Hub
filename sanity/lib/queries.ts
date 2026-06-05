import { client } from './client'

export const projectsQuery = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    category,
    tag,
    client,
    description,
    thumbnail {
      asset -> {
        _id,
        url
      },
      alt
    },
    "images": gallery[] {
      asset -> {
        _id,
        url
      },
      alt
    },
    likes,
    isFullstack
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    tag,
    client,
    description,
    thumbnail {
      asset -> {
        _id,
        url
      },
      alt
    },
    "images": gallery[] {
      asset -> {
        _id,
        url
      },
      alt
    },
    likes,
    isFullstack
  }
`

export async function getProjects() {
  try {
    return await client.fetch(projectsQuery)
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await client.fetch(projectBySlugQuery, { slug })
  } catch (error) {
    console.error('Error fetching project from Sanity:', error)
    return null
  }
}
