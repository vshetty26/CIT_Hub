# Sanity CMS - Quick Start Guide

## What is Sanity CMS?

Sanity is a headless CMS (Content Management System) that allows non-technical users to manage content through a visual interface. Your clients can add, edit, and delete projects without touching any code.

## Installation Status ✅

I've already installed Sanity for you. Here's what's been set up:

- ✅ Sanity packages installed
- ✅ Project schema created (defines what data a project has)
- ✅ Sanity configuration files created
- ✅ Sanity Studio page created at `/studio`
- ✅ Query helper functions created

## What's Next: 3 Steps

### STEP 1: Create a Sanity Account & Project (5 minutes)

1. Go to **https://www.sanity.io** and sign up (use Google or GitHub for quick signup)
2. Create a new project:
   - Name: `CIT Hub`
   - Template: `Clean` (select this)
   - Dataset: `production`
   - Region: Your region
3. Click **Create**

### STEP 2: Get Your Project Credentials (2 minutes)

1. Go to your Sanity project dashboard
2. Click **Settings** (gear icon) → **API**
3. Copy your **Project ID** (looks like: `a1b2c3d4e5f6g7h8i9`)
4. Update `.env.local` in your project:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

### STEP 3: Deploy to Vercel (3 minutes)

1. Go to **Vercel Dashboard**
2. Select your **CIT Hub** project
3. Go to **Settings** → **Environment Variables**
4. Add these two variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
   NEXT_PUBLIC_SANITY_DATASET = production
   ```
5. Redeploy your project

## Using Sanity Studio

### Local Development

To run Sanity Studio locally (for testing):

```bash
npm run sanity:dev
```

This opens Sanity Studio at: **http://localhost:3333**

### Embedded Studio (Recommended for Clients)

Your clients can access the studio directly at:

```
https://your-domain.com/studio
```

They log in with their Sanity account and can manage projects there.

## How to Use (For Your Clients)

### Adding a New Project

1. Go to `https://your-domain.com/studio` (or local studio)
2. Click **"Create"** → **"Project"**
3. Fill in the form:

| Field | Example |
|-------|---------|
| **Project Title** | "Elegant Restaurant Branding" |
| **Slug** | Auto-fills from title |
| **Category** | Choose: Development OR Branding |
| **Tag** | "Restaurant Branding" or "Web Design" |
| **Client Name** | "John Smith" |
| **Description** | Add 2-3 paragraphs describing the project |
| **Thumbnail Image** | Upload main image (appears in carousel) |
| **Gallery** | Upload all project images |
| **Likes** | Number 0-100 |
| **Is Full Stack?** | Toggle if it's a full-stack project |

4. Click **Publish** (IMPORTANT: Don't just Save, you must Publish!)

### Editing a Project

1. Find the project in Sanity Studio
2. Click to open it
3. Make your changes
4. Click **Publish**

### Deleting a Project

1. Find the project in Sanity Studio
2. Click the three dots (⋮) menu
3. Click **Delete**

## Current Architecture

Right now your projects are in `src/data/projects.ts`. You can:

**Option A: Use both (Gradual Migration)**
- Keep using `projects.ts` while you test Sanity
- Migrate data gradually
- Switch fully when you're confident

**Option B: Switch completely (Full Migration)**
- Migrate all existing projects to Sanity
- Update your pages to fetch from Sanity instead of `projects.ts`
- I can do this for you

## Integration Code (For Your Pages)

When you're ready to use Sanity data, your pages will use this:

```typescript
import { getProjects } from '@/sanity/lib/queries'

export default async function WorkPage() {
  const projects = await getProjects()
  
  return (
    <div>
      {projects.map(project => (
        <div key={project._id}>
          <h2>{project.title}</h2>
          {/* Display project data */}
        </div>
      ))}
    </div>
  )
}
```

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| **"Project ID not found"** | Make sure you added `NEXT_PUBLIC_SANITY_PROJECT_ID` to `.env.local` and restarted |
| **Images not showing** | Wait 2-3 minutes for Sanity CDN. They auto-upload to their servers. |
| **Changes don't appear** | Make sure you clicked **Publish**, not just **Save** |
| **Can't access `/studio`** | Make sure `next dev` is running and go to `http://localhost:3000/studio` |
| **"Unauthorized" error** | Check your API token has proper permissions in Sanity dashboard |

## Next Steps (When You're Ready)

Let me know when you want me to:

1. **Migrate existing projects** from `projects.ts` to Sanity
2. **Update your pages** to fetch from Sanity automatically
3. **Set up image optimization** for Sanity images
4. **Create a user guide** document for your clients

## Support

For Sanity documentation: **https://www.sanity.io/docs**

For questions about this setup: Ask me!

---

**Summary**: You now have a professional CMS ready to use. Just create your Sanity account, add your Project ID to `.env.local`, and you're done! 🎉
