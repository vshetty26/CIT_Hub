export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: string;
  tag: string;
  thumbnail: string;
  client: string;
  description: string[];
  images: string[];
  isFullstack?: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: 'learning-ladder',
    slug: 'learning-ladder',
    title: 'Learning Ladder',
    category: 'Development',
    tag: 'Web Design',
    thumbnail: '/learningladder/logo.png',
    client: 'Learning Ladder',
    description: [
      "Learning Ladder is an innovative educational platform designed to help students climb the ladder of success through personalized learning experiences. We crafted a comprehensive web solution that combines intuitive design with powerful functionality.",
      "The CIT HUB team is proud to have delivered a complete web design and development solution for Learning Ladder. Your commitment to transforming education through technology is truly inspiring. May this digital platform empower countless learners on their journey to success!"
    ],
    images: [
      '/learningladder/logo.png',
      '/learningladder/image.png',
      '/learningladder/image%20copy.png'
    ]
  },
  {
    id: 'saugaat',
    slug: 'saugaat',
    title: 'Saugaat',
    category: 'Branding',
    tag: 'Gift Hampers',
    thumbnail: '/projects/saugaat/logo.png',
    client: 'Gary n Mandy',
    description: [
      "Saugaat is your gateway to a world of elegant gift hampers, meticulously curated for all occasions, right here in Australia.",
      "As a local Australian business, they take pride in offering a diverse and exquisite collection of gift hampers that cater to the nuances of gifting, from birthdays to Christmas, corporate events to weddings, and everything in between.",
      "The imperial look of the website with its elegant layout, font and features reflects the unique character of the online store.",
      "The CIT HUB team wishes Saugaat all the best in your future endeavors. May your path be as vibrant and diverse as the gifts you curate."
    ],
    // The user will replace these paths with their exact local image paths
    images: [
      '/projects/saugaat/saugaat1.png',
      '/projects/saugaat/saugaat2.png',
      '/projects/saugaat/saugaat3.png',
      '/projects/saugaat/saugaat4.png',
      '/projects/saugaat/saugaat5.png'
    ]
  },
  {
    id: 'sikh-awards',
    slug: 'australian-sikh-awards',
    title: 'Australian Sikh Awards',
    category: 'Branding',
    tag: 'Design',
    thumbnail: '/projects/Australian%20Sikh%20Awards/logo.png',
    client: 'Australian Sikh Awards',
    description: [
      "Designing brochure invites, pull-up banners, and other creatives for the Australian Sikh Awards has been an absolutely incredible experience. It’s been a pleasure to visually encapsulate the values of community, leadership, and excellence that these awards embody. Crafting creatives that resonate with the spirit of the Australian Sikh Awards has been a true honor.",
      "The CIT HUB team wishes the Australian Sikh Awards all the best in their future endeavors. May your journey continue to shine as bright as the spirits you recognize and honor. Your dedication to recognizing outstanding contributions is truly inspiring. Here’s to your continued success and the remarkable journey that lies ahead!"
    ],
    images: [
      '/projects/Australian%20Sikh%20Awards/logo.png',
      '/projects/Australian%20Sikh%20Awards/Australian%20Sikh%20Awards1.png',
      '/projects/Australian%20Sikh%20Awards/Australian%20Sikh%20Awards2.png'
    ]
  },
  {
    id: 'steel-boss',
    slug: 'steel-boss',
    title: 'Steel Boss',
    category: 'Branding',
    tag: 'Business Creatives',
    thumbnail: '/projects/Steel%20Boss/logo.png',
    client: 'Steel Boss',
    description: [
      "Designing business creatives for Steel Boss has been an incredibly gratifying experience. It's been a delight to visually capture the strength and precision they bring to their work. Creating creatives that reflect the essence of Steel Boss's expertise has been a true honor.",
      "Wishing Steel Boss all the best in your future endeavors. May your path be as sturdy and successful as the metals you fabricate. Your commitment to quality craftsmanship is truly impressive. Here's to your continued success and the solid journey that lies ahead."
    ],
    images: [
      '/projects/Steel%20Boss/logo.png',
      '/projects/Steel%20Boss/Steel%20Boss-main.png'
    ]
  },
  {
    id: 'dust-and-shine',
    slug: 'dust-and-shine',
    title: 'Dust and Shine',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Dust%20and%20Shine/logo.png',
    client: 'Dust and Shine',
    description: [
      "Crafting business creatives for Dust and Shine has been an incredibly rewarding experience. It's been a joy to visually represent their commitment to cleanliness and excellence. Designing creatives that mirror the essence of Dust and Shine's services has been a true privilege.",
      "Wishing Dust and Shine all the best in their future endeavors. May your path be as polished and successful as the spaces you transform. Your dedication to providing exceptional cleaning services is truly commendable. Here's to your continued success and the sparkling journey that awaits!"
    ],
    images: [
      '/projects/Dust%20and%20Shine/logo.png',
      '/projects/Dust%20and%20Shine/Dust%20and%20Shine1.png'
    ]
  },
  {
    id: 'glamegance',
    slug: 'glamegance',
    title: 'GlamEgance',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/GlamEgance/logo.png',
    client: 'GlamEgance by Chandni',
    description: [
      "Designing the logo and brand identity for GlamEgance by Chandni has been an incredible journey. It's been a privilege to visually capture the essence of their unique style and beauty offerings. Crafting a logo that resonates with GlamEgance's vision has been a true honor.",
      "The CIT HUB team wishes GlamEgance all the best in your future endeavors. May your path be as glamorous and successful as the brand you've built. Your commitment to enhancing beauty and confidence is truly admirable. Here's to your continued success and the exciting ventures that lie ahead!"
    ],
    images: [
      '/projects/GlamEgance/GlamEgance-main.png'
    ]
  },
  {
    id: 'mor-events-mukka',
    slug: 'mor-events-mukka',
    title: 'MOR Events & Mukka',
    category: 'Branding',
    tag: 'Festive Creatives',
    thumbnail: '/projects/MOR%20Events%20%26%20Mukka/logo.png',
    client: 'MOR Events & Mukka',
    description: [
      "Collaborating with MOR Events and Mukka to create business creatives for Diwali has been an incredibly amazing experience. It's been an absolute joy to visually capture the essence of this festive celebration and infuse it into the designs. Crafting creatives that resonate with the spirit of MOR Events and Mukka's Diwali collaboration has been a true honor.",
      "The CIT HUB team wishes MOR Events and Mukka all the best in your future endeavors. May your path be as illuminated and prosperous as the festival of lights itself. Your commitment to bringing people together and creating unforgettable experiences is truly inspiring. Here's to your continued success and the exciting journeys that lie ahead!"
    ],
    images: [
      '/projects/MOR%20Events%20%26%20Mukka/logo.png',
      '/projects/MOR%20Events%20%26%20Mukka/MOR%20Events%20%26%20Mukka-1.png'
    ]
  },
  {
    id: 'bbk',
    slug: 'bbk',
    title: 'BBK',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/BBK/logo.png',
    client: 'BBK',
    description: [
      "Designing a logo for BBK has been an absolutely amazing experience. It's been a joy to visually capture the essence of their nurturing and growth-focused approach. Crafting a logo that resonates with the heart of BBK's mission has been a true privilege.",
      "The CIT HUB team wishes BBK all the best in their future endeavors. Your dedication to fostering growth and cultivating a brighter future is truly commendable. Here's to your continued success and the beautiful journey ahead!"
    ],
    images: [
      '/projects/BBK/BBK-main.png'
    ]
  },
  {
    id: 'desi-daru',
    slug: 'desi-daru',
    title: 'Desi Daru',
    category: 'Branding',
    tag: 'Brand Identity',
    thumbnail: '/projects/Desi%20Daru/logo.png',
    client: 'Desi Daru',
    description: [
      "Designing business creative for Desi Daru has been an incredibly exciting journey. It's been an honor to visually capture the essence of their offerings, adding a touch of creativity to their brand identity. Crafting designs that resonate with the spirit of Desi Daru has been a true pleasure.",
      "The CIT HUB team wishes Desi Daru all the best on their path forward. May your future endeavors be as spirited and enjoyable as the products you bring to your customers. Your commitment to providing a unique whisky experience is commendable, and we're excited to see your continued growth and success. Cheers to your journey and the adventures that lie ahead!"
    ],
    images: [
      '/projects/Desi%20Daru/logo.png',
      '/projects/Desi%20Daru/Desi%20Daru-1.png'
    ]
  },
  {
    id: 'omaraa-aged-care',
    slug: 'omaraa-aged-care',
    title: 'Omaraa Aged Care',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Omaraagedcare/Omaraagedcare1.jpg',
    client: 'Omaraa Aged Care',
    description: [
      "Our full-stack collaboration with Omaraa Aged Care encompassed comprehensive branding, strategic marketing, and web development. We crafted their brand identity, created compelling marketing materials, and built a robust digital platform that seamlessly integrates care management, resident tracking, and staff coordination.",
      "The CIT HUB team is proud to have delivered end-to-end solutions for Omaraa Aged Care's digital transformation. Your commitment to providing compassionate and efficient care to seniors is truly commendable. May this complete brand and digital presence empower your team to deliver even better services and improve the lives of those in your care. Here's to your continued success!"
    ],
    images: [
      '/projects/Omaraagedcare/Omaraagedcare1.jpg',
      '/projects/Omaraagedcare/Omaraagedcare2.jpg',
      '/projects/Omaraagedcare/Omaraagedcare3.jpg',
      '/projects/Omaraagedcare/Omaraagedcare4.jpg'
    ]
  },
  {
    id: 'stepahead',
    slug: 'stepahead',
    title: 'Step Ahead',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Stepahead/Stepahead1.jpg',
    client: 'Step Ahead',
    description: [
      "Our full-stack partnership with Step Ahead included complete branding development, targeted marketing strategies, and a robust web application. We built their brand identity from the ground up, created engaging marketing materials, and developed a platform designed to support their mission of helping individuals achieve their goals through innovative technology.",
      "The CIT HUB team is thrilled to have delivered comprehensive branding, marketing, and web solutions for Step Ahead. Your vision to empower people and create meaningful change is truly inspiring. May this complete digital ecosystem serve as a catalyst for growth and success for all who use it. Here's to your continued journey of making a positive impact!"
    ],
    images: [
      '/projects/Stepahead/Stepahead1.jpg',
      '/projects/Stepahead/Stepahead2.jpg',
      '/projects/Stepahead/Stepahead3.jpg',
      '/projects/Stepahead/Stepahead4.jpg'
    ]
  },
  {
    id: 'ananta-modular',
    slug: 'ananta-modular',
    title: 'Ananta Modular',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Anantamodular/logo.jpg',
    client: 'Ananta Modular',
    description: [
      "Our full-stack engagement with Ananta Modular encompassed strategic branding, comprehensive marketing campaigns, and web development. We created their brand identity, developed compelling marketing materials, and built a platform that showcases their innovative modular solutions with seamless user experience and robust backend infrastructure.",
      "The CIT HUB team is proud to have delivered end-to-end branding, marketing, and web solutions for Ananta Modular. Your commitment to delivering quality modular solutions is truly commendable. May this complete digital presence help you reach more customers and expand your market presence. Here's to your continued success!"
    ],
    images: [
      '/projects/Anantamodular/logo.jpg',
      '/projects/Anantamodular/Anantamodular2.jpg',
      '/projects/Anantamodular/Anantamodular3.jpg',
      '/projects/Anantamodular/Anantamodular4.png'
    ]
  },
  {
    id: 'arn-haulage',
    slug: 'arn-haulage',
    title: 'ARN Haulage',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Arnhaulage/Arnhaulage1.png',
    client: 'ARN Haulage',
    description: [
      "Our full-stack collaboration with ARN Haulage included complete branding, strategic marketing, and web development. We established their brand identity, created professional marketing materials, and built a comprehensive logistics platform that streamlines their haulage operations, from fleet management to real-time tracking and customer coordination.",
      "The CIT HUB team is delighted to have contributed comprehensive branding, marketing, and web solutions to ARN Haulage's operational excellence. Your dedication to reliable and professional haulage services is truly impressive. May this complete digital ecosystem enhance your service delivery and help you grow your business. Here's to your continued success on the road!"
    ],
    images: [
      '/projects/Arnhaulage/Arnhaulage1.png',
      '/projects/Arnhaulage/Arnhaulage2.jpg',
      '/projects/Arnhaulage/Arnhaulage3.jpg',
      '/projects/Arnhaulage/Arnhaulage4.jpg'
    ]
  },
  {
    id: 'enable-coliving',
    slug: 'enable-coliving',
    title: 'Enable Coliving',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Enablecoliving/Enablecoliving1.jpg',
    client: 'Enable Coliving',
    description: [
      "Our full-stack partnership with Enable Coliving encompassed strategic branding, comprehensive marketing initiatives, and web development. We crafted their brand identity, developed engaging marketing campaigns, and created a platform that connects residents, manages properties, and facilitates community engagement in their innovative coliving spaces.",
      "The CIT HUB team is thrilled to have delivered complete branding, marketing, and web solutions for Enable Coliving's mission. Your vision for modern living spaces and inclusive communities is truly forward-thinking. May this comprehensive digital presence foster meaningful connections and enhance the coliving experience for all residents. Here's to building communities together!"
    ],
    images: [
      '/projects/Enablecoliving/Enablecoliving1.jpg',
      '/projects/Enablecoliving/Enablecoliving2.jpg',
      '/projects/Enablecoliving/Enablecoliving3.jpg',
      '/projects/Enablecoliving/Enablecoliving4.jpg'
    ]
  },
  {
    id: 'jn-united',
    slug: 'jn-united',
    title: 'JN United',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Jnunited/logo.jpg',
    client: 'JN United',
    description: [
      "Our full-stack collaboration with JN United included complete branding, strategic marketing, and web development. We established their brand identity, created compelling marketing materials, and built a robust application that supports their business operations with intuitive interfaces and powerful backend capabilities.",
      "The CIT HUB team is proud to have delivered comprehensive branding, marketing, and web solutions for JN United. Your commitment to excellence and innovation is truly commendable. May this complete digital ecosystem empower your team and drive your business forward. Here's to your continued growth and success!"
    ],
    images: [
      '/projects/Jnunited/logo.jpg',
      '/projects/Jnunited/Jnunited2.jpg',
      '/projects/Jnunited/Jnunited3.jpg',
      '/projects/Jnunited/Jnunited4.jpg'
    ]
  },
  {
    id: 'luxel-developers',
    slug: 'luxel-developers',
    title: 'Luxel Developers',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Luxeldevlopers/Luxeldevlopers1.jpg',
    client: 'Luxel Developers',
    description: [
      "Our full-stack engagement with Luxel Developers encompassed strategic branding, comprehensive marketing campaigns, and web development. We created their brand identity, developed professional marketing materials, and built a platform that showcases their real estate projects with stunning visuals and seamless property management capabilities.",
      "The CIT HUB team is delighted to have delivered complete branding, marketing, and web solutions for Luxel Developers. Your dedication to quality development and customer satisfaction is truly impressive. May this comprehensive digital presence help you connect with more clients and showcase your exceptional projects. Here's to your continued success in real estate!"
    ],
    images: [
      '/projects/Luxeldevlopers/Luxeldevlopers1.jpg',
      '/projects/Luxeldevlopers/Luxeldevlopers2.jpg',
      '/projects/Luxeldevlopers/Luxeldevlopers3.jpg',
      '/projects/Luxeldevlopers/Luxeldevlopers4.jpg'
    ]
  },
  {
    id: 'md-cooling',
    slug: 'md-cooling',
    title: 'MD Cooling',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/projects/Mdcooling/logo.jpg',
    client: 'MD Cooling',
    description: [
      "Our full-stack partnership with MD Cooling included complete branding, strategic marketing, and web development. We established their brand identity, created professional marketing materials, and developed a platform that streamlines their cooling solutions business with efficient service management, customer portals, and comprehensive backend systems.",
      "The CIT HUB team is proud to have contributed comprehensive branding, marketing, and web solutions to MD Cooling's digital transformation. Your expertise in cooling solutions and commitment to customer service is truly commendable. May this complete digital ecosystem enhance your operational efficiency and help you serve your customers better. Here's to your continued success!"
    ],
    images: [
      '/projects/Mdcooling/logo.jpg',
      '/projects/Mdcooling/Mdcooling2.jpg',
      '/projects/Mdcooling/Mdcooling3.jpg',
      '/projects/Mdcooling/Mdcooling4.jpg'
    ]
  },
  {
    id: 'pivotal-moments-media',
    slug: 'pivotal-moments-media',
    title: 'Pivotal Moments Media',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Pivotal/logo.png',
    client: 'Pivotal Moments Media',
    description: [
      "Crafting the logo, business cards, and other creative assets for Pivotal Moments Media has been an absolutely amazing experience. The opportunity to visually encapsulate their dedication to capturing impactful stories through media has been both inspiring and fulfilling. As each design element fell into place, it became clear that these visuals truly resonate with their essence.",
      "The CIT HUB team wishes Pivotal Moments Media all the best on their journey ahead. May your future endeavors be as remarkable and compelling as the stories you tell. Your commitment to visual storytelling is truly commendable, and I'm excited to see the impact you continue to make in the world of media. Here's to your continued success and growth!"
    ],
    images: [
      '/projects/Pivotal/logo.png',
      '/projects/Pivotal/image.png',
      '/projects/Pivotal/image%20copy%202.png'
    ]
  },
  {
    id: 'new-dai',
    slug: 'new-dai',
    title: 'New Dai',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/NewDai/logo.png',
    client: 'New Dai',
    description: [
      "Designing logo concepts for New Dai has been an incredible journey of creativity and collaboration. It's been a privilege to visually capture their dedication to crafting exquisite designs. As I've seen my logo ideas come to life, I'm reminded of the seamless blend of artistry and comfort that NEW DAI represents.",
      "The CIT HUB team extends their best wishes to NEW DAI's remarkable journey ahead – may their path be adorned with the same elegance and innovation that their upholstery designs exude. Best wishes for all your future endeavors!"
    ],
    images: [
      '/projects/NewDai/logo.png',
      '/projects/NewDai/image%20copy.png',
      '/projects/NewDai/image%20copy%202.png'
    ]
  },
  {
    id: 'wedding-factor-neha',
    slug: 'wedding-factor-neha',
    title: 'The Wedding Factor with Neha',
    category: 'Branding',
    tag: 'Design & Graphics',
    thumbnail: '/projects/Neha/logo.png',
    client: 'The Wedding Factor with Neha',
    description: [
      "Designing graphics for The Wedding Factor with Neha has been an absolute joy! It's like turning dreams into visuals, weaving together love stories and aesthetics. Each design is a chance to encapsulate the unique personality of a couple and the vision of the wedding planner. From elegant brochures, and pull-up banners to amazing logo design, every element is a brushstroke on the canvas of a couple's special day.",
      "The CIT HUB team extends their best wishes to The Wedding Factor with Neha for their future endeavors and is thrilled to include this achievement in their collection of successful projects. Your dedication to making weddings truly unforgettable is truly inspiring. Here's to your continued success!"
    ],
    images: [
      '/projects/Neha/logo.png',
      '/projects/Neha/image%20copy.png',
      '/projects/Neha/image%20copy%202.png'
    ]
  },
  {
    id: 'alexa-homes',
    slug: 'alexa-homes',
    title: 'Alexa Homes',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/Alexa%20Homes/logo.png',
    client: 'Alexa Homes',
    description: [
      "Designing a logo for Alexa Homes has been an absolute blast! It's like stepping into a world where creativity knows no bounds. Crafting a logo that captures the essence of a designer's style and vision is a thrilling challenge that keeps us excited throughout the process. The fusion of art and architecture, symbolism, and aesthetics, makes every logo design a unique masterpiece.",
      "The CIT HUB team wishes Alexa Homes all the best for their future endeavors and is delighted to add this one to their gallery of accomplished works. Your passion and innovation in home design is truly inspiring. Here's to your continued success!"
    ],
    images: [
      '/projects/Alexa%20Homes/logo.png',
      '/projects/Alexa%20Homes/image%20copy%202.png',
      '/projects/Alexa%20Homes/image%20copy%203.png'
    ]
  },
  {
    id: 'panache-by-divya',
    slug: 'panache-by-divya',
    title: 'Panache By Divya',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/Panache%20By%20Divya/logo.png',
    client: 'Divya',
    description: [
      "Designing a logo for Panache was fun and challenging at the same time. To craft a logo which reflects the style and icon of the design studio required lots of brainstorming and thinking out of the box. Panache by Divya is a design studio offering a wide range of Indian and Indo-western wear and jewellery for women and ethnic wear for men. They are known for their classy customised designs of premium quality outfits and jewellery.",
      "The design team at CIT HUB have been extremely creative and open to collaboration with both Divya and Abhishek to create an artistic masterpiece. The CIT HUB team wishes the Panache team all the best for their future endeavours and is delighted to add this one to their gallery of accomplished works!"
    ],
    images: [
      '/projects/Panache%20By%20Divya/logo.png',
      '/projects/Panache%20By%20Divya/image.png',
      '/projects/Panache%20By%20Divya/image%20copy%202.png'
    ]
  },
  {
    id: 'la-peinture',
    slug: 'la-peinture',
    title: 'LA Peinture – Nitu Ahuja',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/LA%20Peinture%20%E2%80%93%20Nitu%20Ahuja/logo.png',
    client: 'Nitu Ahuja',
    description: [
      "Designing a brand logo for an art lover and painter of her niche and exceeding the expectation is itself a great achievement for the CIT HUB team. Working with a visionary Nitu Grover Ahuja was a completely delightful experience. Nitu, who has secured a master in Fine Arts degree from RMIT University, has been teaching art for the past 20 years and her work has been displayed in many exhibitions including the top 100 artists' exhibition in India and the prestigious Lalit Kala Academy.",
      "The design team at CIT HUB have been extremely creative and open to collaboration with Nitu to create an artistic masterpiece. The CIT HUB team wishes her all the best for their future endeavours and is delighted to add this one to their gallery of accomplished works!"
    ],
    images: [
      '/projects/LA%20Peinture%20%E2%80%93%20Nitu%20Ahuja/logo.png',
      '/projects/LA%20Peinture%20%E2%80%93%20Nitu%20Ahuja/image%20copy.png',
      '/projects/LA%20Peinture%20%E2%80%93%20Nitu%20Ahuja/image%20copy%202.png'
    ]
  },
  {
    id: 'classy-and-trendy',
    slug: 'classy-and-trendy',
    title: 'Classy and Trendy',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Classy%20and%20Trendy/logo.png',
    client: 'Gagan',
    description: [
      "Working with the team at Classy & Trendy has been a wonderful experience for our staff at CIT HUB. Classy & Trendy is a complete women's designer outfits shop where you can find a wide range of gowns, casual dresses, Indo-Western wear, and jumpsuits. Both Gagan and Surender were extremely cooperative and clear with their requirements.",
      "Keeping in mind the business taste and vision, the team has come up with a look-alike Classy and Trendy artefact. Big shout out to McubeMedia team for putting together a cinematic logo animation. The CIT HUB team has skillfully crafted a successful project and is delighted to add this one to their gallery of accomplished works. We wish them all the best in their future endeavours!"
    ],
    images: [
      '/projects/Classy%20and%20Trendy/logo.png',
      '/projects/Classy%20and%20Trendy/image%20copy.png',
      '/projects/Classy%20and%20Trendy/image%20copy%202.png',
      '/projects/Classy%20and%20Trendy/image%20copy%203.png'
    ]
  },
  {
    id: 'majestic',
    slug: 'majestic',
    title: 'MAJESTIC',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/MAJESTIC/logo.png',
    client: 'Majestic Lounge',
    description: [
      "Crafted a logo mock-up that reflects identity and the passion that goes behind the vision of the Majestic Lounge. Majestic Lounge is the ultimate nightlife lounging experience – a place where lux and magnificence merge.",
      "The CIT HUB team wishes the Majestic Lounge team all the best for their future endeavours and is delighted to add this mock-up to their gallery of accomplished works. Your vision for creating an exceptional nightlife experience is truly inspiring. Here's to your continued success!"
    ],
    images: [
      '/projects/MAJESTIC/logo.png',
      '/projects/MAJESTIC/image%20copy.png'
    ]
  },
  {
    id: 'indian-bazar',
    slug: 'indian-bazar',
    title: 'The Indian Bazar',
    category: 'Development',
    tag: 'Web Design',
    thumbnail: '/projects/INDIAN%20BAZAR/logo.png',
    client: 'Rohit',
    description: [
      "The team at The Indian Bazar is proud to launch a new online Indian grocery store portal, fully designed and developed by the skilled CIT HUB team. The Indian Bazar is an Indian grocery store serving customers in the western suburbs of Melbourne, stocking a diverse range of popular brands. Customers can order online and collect from the shop or get home delivery.",
      "The Indian Bazar is fully owned and operated from Australia and currently home delivers in selected western suburbs of Melbourne with plans to extend services across all of Melbourne. The design team at CIT HUB have been extremely creative and collaborative with the client to create the masterpiece website www.theindianbazar.com.au. The smooth look and feel with its elegant layout, fonts, and features reflect the unique character of the online store.",
      "CIT HUB has skilfully crafted a successful project and is delighted to add this one to their gallery of accomplished works. Your vision for bringing quality Indian groceries online is truly commendable. Here's to your continued success!"
    ],
    images: [
      '/projects/INDIAN%20BAZAR/logo.png',
      '/projects/INDIAN%20BAZAR/image.png',
      '/projects/INDIAN%20BAZAR/image%20copy.png',
      '/projects/INDIAN%20BAZAR/image%20copy%203.png',
      '/projects/INDIAN%20BAZAR/image%20copy%204.png',
      '/projects/INDIAN%20BAZAR/image%20copy%205.png',
      '/projects/INDIAN%20BAZAR/image%20copy%206.png'
    ]
  },
  {
    id: 'atlas',
    slug: 'atlas',
    title: 'ATLAS',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/ATLAS/logo.png',
    client: 'Deep',
    description: [
      "Working with the team at ATLAS has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. The imperial look of the logo with its elegant layout, font and features resembles the features of the venture.",
      "CIT HUB team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Your vision and dedication to excellence is truly commendable. Here's to your continued success!"
    ],
    images: [
      '/projects/ATLAS/logo.png',
      '/projects/ATLAS/image.png',
      '/projects/ATLAS/image%20copy%202.png',
      '/projects/ATLAS/image%20copy%203.png'
    ]
  },
  {
    id: 'nav-constructions',
    slug: 'nav-constructions',
    title: 'NAV CONSTRUCTIONS',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/NAV%20CONSTRUCTIONS/logo.png',
    client: 'Navdeep',
    description: [
      "Working with the team at NAV CONSTRUCTIONS has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. The design team at CIT HUB have been extremely creative and open to a lot of collaboration to create an eye-catching branding.",
      "The imperial look of the logo with its elegant layout, font and features resembles the features of the venture. CIT HUB team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Your commitment to quality construction and professional branding is truly inspiring. Here's to your continued success!"
    ],
    images: [
      '/projects/NAV%20CONSTRUCTIONS/logo.png',
      '/projects/NAV%20CONSTRUCTIONS/image%20copy.png',
      '/projects/NAV%20CONSTRUCTIONS/image%20copy%202.png',
      '/projects/NAV%20CONSTRUCTIONS/image%20copy%203.png'
    ]
  },
  {
    id: 'quality-concreting',
    slug: 'quality-concreting',
    title: 'QUALITY CONCRETING',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/QUALITY%20CONCRETING/logo.png',
    client: 'Amanpreet Singh',
    description: [
      "Working with the team at QUALITY CONCRETING has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. The imperial look of the logo with its elegant layout, font and features resembles the features of the venture.",
      "CIT HUB team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Your dedication to quality concreting services and professional excellence is truly commendable. Here's to your continued success and growth!"
    ],
    images: [
      '/projects/QUALITY%20CONCRETING/logo.png',
      '/projects/QUALITY%20CONCRETING/image.png',
      '/projects/QUALITY%20CONCRETING/image%20copy%202.png',
      '/projects/QUALITY%20CONCRETING/image%20copy%203.png',
      '/projects/QUALITY%20CONCRETING/image%20copy%204.png'
    ]
  },
  {
    id: 'shiv-development',
    slug: 'shiv-development',
    title: 'Shiv Development',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Shiv%20Development/logo.png',
    client: 'Aditya Singh',
    description: [
      "Putting together branding for Shiv Developments was a wonderful experience for our staff at CIT HUB. The aesthetic look of the logo with its elegant layout, font and features resembles the features of the venture. The design team at CIT Hub have been extremely creative and open to a lot of collaboration with the client to create the masterpiece website www.shivdevelopments.com.au which launches into cyberspace today.",
      "CIT Hub team has skillfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Your vision for quality construction and professional branding is truly commendable. Here's to your continued success!"
    ],
    images: [
      '/Shiv%20Development/logo.png',
      '/Shiv%20Development/image%20copy.png',
      '/Shiv%20Development/image%20copy%202.png',
      '/Shiv%20Development/image%20copy%203.png',
      '/Shiv%20Development/image%20copy%204.png'
    ]
  },
  {
    id: 'planet-green-project',
    slug: 'planet-green-project',
    title: 'Planet Green Project',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Planet%20Green%20Project/logo.png',
    client: 'Abdul',
    description: [
      "Working with the team at Planet Green Project has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. Upgrade to your Lighting 100% FREE program under the Victorian Government Initiative (VEU scheme).",
      "CIT Hub team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Your commitment to sustainable energy solutions and environmental responsibility is truly inspiring. Here's to your continued success!"
    ],
    images: [
      '/projects/Planet%20Green%20Project/logo.png',
      '/projects/Planet%20Green%20Project/image.png',
      '/projects/Planet%20Green%20Project/image%20copy.png',
      '/projects/Planet%20Green%20Project/image%20copy%203.png'
    ]
  },
  {
    id: 'aditya-tashika',
    slug: 'aditya-tashika',
    title: 'Aditya Tashika',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Aditya%20Tashika/logo.png',
    client: 'Aditya and Tashika',
    description: [
      "Working with the team at Aditya Tashika (AT) has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. The Party Factor – A one-stop-shop for all your party needs! Planning a birthday, a milestone, a baby shower, housewarming or simply any event then look no further! Their motto is 'We CREATE you CELEBRATE'.",
      "The design team at CIT Hub have been extremely creative and open to a lot of collaboration with Aditya and Tashika to create an eye-catching branding. The imperial look of the logo with its elegant layout, font and features resembles the features of the venture. CIT Hub team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Here's to your continued success!"
    ],
    images: [
      '/projects/Aditya%20Tashika/logo.png',
      '/projects/Aditya%20Tashika/image%20copy.png',
      '/projects/Aditya%20Tashika/image%20copy%202.png'
    ]
  },
  {
    id: 'party-factor-neha',
    slug: 'party-factor-neha',
    title: 'The Party Factor with Neha',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/The%20Party%20Factor%20with%20Neha/logo.png',
    client: 'Neha Kapoor Khanna',
    description: [
      "Working with the team at The Party Factor with Neha (TPF) has been a wonderful experience for our staff at CIT HUB. The branding brings the idea to life with eye-refreshing designs. The Party Factor – A one-stop-shop for all your party needs! Planning a birthday, a milestone, a baby shower, housewarming or simply any event then look no further! Their motto is 'We CREATE you CELEBRATE'.",
      "The design team at CIT Hub have been extremely creative and open to a lot of collaboration with Neha, Director TPF to create an eye-catching branding. The imperial look of the logo with its elegant layout, font and features resembles the features of the venture. CIT Hub team has skilfully crafted a successful project and are delighted to add this one to their gallery of accomplished works. Here's to your continued success!"
    ],
    images: [
      '/projects/The%20Party%20Factor%20with%20Neha/logo.png',
      '/projects/The%20Party%20Factor%20with%20Neha/image%20copy.png',
      '/projects/The%20Party%20Factor%20with%20Neha/image%20copy%202.png',
      '/projects/The%20Party%20Factor%20with%20Neha/image%20copy%203.png',
      '/projects/The%20Party%20Factor%20with%20Neha/image%20copy%204.png'
    ]
  },
  {
    id: 'tyre-barn',
    slug: 'tyre-barn',
    title: 'Tyre Barn',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Tyre%20Barn/logo.png',
    client: 'Hardeep Singh Gill',
    description: [
      "Working with the team at TyreBarn has been a wonderful experience for our staff at CIT Hub. CIT Hub has skilfully crafted a successful project and are delighted to add this one to their own gallery of accomplished works. Big shout out to M CUBE MEDIA for their beautiful product photography to make the Tyre Barn's products stand out of the pack.",
      "We strive to provide our clients with the best quality services. Your commitment to excellence in the tyre industry is truly commendable. All artworks are under copyright © cithub. Here's to your continued success!"
    ],
    images: [
      '/projects/Tyre%20Barn/logo.png',
      '/projects/Tyre%20Barn/image.png',
      '/projects/Tyre%20Barn/image%20copy%202.png'
    ]
  },
  {
    id: 'fitness-tadka',
    slug: 'fitness-tadka',
    title: 'Fitness Tadka',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Fitness%20Tadka/logo.png',
    client: 'Kanika Bhasin & Abhishek',
    description: [
      "CIT HUB design team have been extremely creative in putting up an elegant branding for an Australian based new weight management and nutrition brand – Fitness Tadka. An inspiring Logo, Business Card, Marketing material and a refreshing website that offers a professional look and feel with easy information access for the customers. Congratulation and Best of luck to the whole team for their new venture.",
      "Fitness Tadka Mantra – we believe in healthy diet for a healthy body, mind and soul. The meals are designed keeping in mind your required Calorie intake according to daily routine and the goals you want to achieve. Meals provided to you will not only satisfy your taste buds but also make you feel lighter. All artworks are under copyright © Cithub. Here's to your continued success!"
    ],
    images: [
      '/Fitness%20Tadka/logo.png',
      '/Fitness%20Tadka/image%20copy.png',
      '/Fitness%20Tadka/image%20copy%202.png'
    ]
  }
];
