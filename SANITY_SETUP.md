# Sanity CMS Setup Guide

## Step 1: Create a Sanity Project

1. Go to [sanity.io](https://www.sanity.io)
2. Click **Sign up** or **Log in**
3. Create a new project:
   - Project name: `CIT Hub`
   - Choose the **clean** template
   - Dataset name: `production`
   - Choose your plan (Free tier is fine)

## Step 2: Get Your Project Credentials

1. After creating the project, go to the project dashboard
2. Click **Settings** → **API**
3. Copy your **Project ID**
4. Copy your **Dataset** name (should be `production`)

## Step 3: Add Credentials to Your Environment File

1. Open `.env.local` in your project root
2. Find the Sanity configuration section:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. Replace `your_project_id_here` with your actual Project ID

## Step 4: Create an Auth Token

1. Go to Sanity dashboard → **Settings** → **API**
2. Scroll to **Tokens** section
3. Click **Add API token**
4. Name it: `CIT Hub Studio`
5. Set permissions to **Editor** (allows read and write)
6. Copy the token and save it somewhere safe

## Step 5: Deploy to Vercel

1. Add these environment variables to your **Vercel project**:
   - Go to Vercel dashboard
   - Select your CIT Hub project
   - Settings → **Environment Variables**
   - Add:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
     NEXT_PUBLIC_SANITY_DATASET = production
     ```

## Step 6: Run Sanity Studio Locally

To edit projects locally in the Sanity Studio:

```bash
npm run sanity:dev
```

This will open Sanity Studio at `http://localhost:3333`

## How Your Client Uses It

### Adding a New Project:

1. Client logs into the Sanity Studio
2. Clicks **"Create new"** → **"Project"**
3. Fills in the form:
   - **Project Title**: e.g., "Amazing Restaurant Branding"
   - **Category**: Choose from Development or Branding
   - **Tag**: e.g., "Restaurant Branding"
   - **Client Name**: e.g., "John Smith"
   - **Description**: Add 2-3 paragraphs
   - **Thumbnail**: Upload the main image
   - **Gallery**: Upload all project images
   - **Likes**: Set a number (0-100)
   - **Is Full Stack**: Toggle if it's a full-stack project
4. Click **Publish**

### Editing a Project:

1. Find the project in the Sanity Studio
2. Click to open it
3. Make changes
4. Click **Publish**

Your Next.js website automatically fetches and displays the updated projects!

## Fetching Data from Sanity in Next.js

Your app will use this query to fetch projects:

```javascript
import { client } from '@/sanity/lib/client'

const query = `
  *[_type == "project"] {
    _id,
    title,
    slug,
    category,
    tag,
    client,
    description,
    thumbnail,
    "images": gallery[].asset->url,
    likes,
    isFullstack
  }
`

const projects = await client.fetch(query)
```

## Sanity Image URLs

Images in Sanity are automatically hosted on a CDN. The URLs are automatically generated, so you don't need to manually manage `/public/projects/` folders anymore!

## Troubleshooting

**Q: I can't log into Sanity Studio**
A: Make sure you're using the correct Sanity account and have the correct Project ID in `.env.local`

**Q: Images aren't showing**
A: Wait 1-2 minutes after uploading. Sanity CDN takes time to process images.

**Q: Changes don't appear on website**
A: Make sure you clicked **Publish**, not just **Save**. Only published content appears on the live site.

**Q: "Unauthorized" error**
A: Check that your API token has **Editor** permissions in Sanity dashboard.

## Next Steps

1. ✅ Update your Next.js pages to fetch from Sanity instead of `projects.ts`
2. ✅ Remove the old `src/data/projects.ts` file once Sanity is fully integrated
3. ✅ Train your client on how to use the Sanity Studio
