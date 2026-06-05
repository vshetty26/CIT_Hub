import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'

const projectId = 'tz810ks6'
const dataset = 'production'

export default defineConfig({
  name: 'cithub-projects',
  title: 'CIT Hub Projects',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  cors: {
    allowCredentials: true,
    origin: [
      'https://www.cithub.com.au',
      'http://localhost:3000',
      'http://localhost:3333',
    ],
  },
})
