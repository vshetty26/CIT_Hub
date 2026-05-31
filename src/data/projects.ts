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
    id: 'saugaat',
    slug: 'saugaat',
    title: 'Saugaat',
    category: 'Branding',
    tag: 'Gift Hampers',
    thumbnail: '/projects/saugaat/saugaat-main.png',
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
    thumbnail: '/projects/Australian Sikh Awards/Australian Sikh Awards-main.png',
    client: 'Australian Sikh Awards',
    description: [
      "Designing brochure invites, pull-up banners, and other creatives for the Australian Sikh Awards has been an absolutely incredible experience. It’s been a pleasure to visually encapsulate the values of community, leadership, and excellence that these awards embody. Crafting creatives that resonate with the spirit of the Australian Sikh Awards has been a true honor.",
      "The CIT HUB team wishes the Australian Sikh Awards all the best in their future endeavors. May your journey continue to shine as bright as the spirits you recognize and honor. Your dedication to recognizing outstanding contributions is truly inspiring. Here’s to your continued success and the remarkable journey that lies ahead!"
    ],
    images: [
      '/projects/Australian Sikh Awards/Australian Sikh Awards1.png',
      '/projects/Australian Sikh Awards/Australian Sikh Awards2.png'
    ]
  },
  {
    id: 'steel-boss',
    slug: 'steel-boss',
    title: 'Steel Boss',
    category: 'Branding',
    tag: 'Business Creatives',
    thumbnail: '/projects/Steel Boss/Steel Boss-main.png',
    client: 'Steel Boss',
    description: [
      "Designing business creatives for Steel Boss has been an incredibly gratifying experience. It's been a delight to visually capture the strength and precision they bring to their work. Creating creatives that reflect the essence of Steel Boss's expertise has been a true honor.",
      "Wishing Steel Boss all the best in your future endeavors. May your path be as sturdy and successful as the metals you fabricate. Your commitment to quality craftsmanship is truly impressive. Here's to your continued success and the solid journey that lies ahead."
    ],
    images: [
      '/projects/Steel Boss/Steel Boss-main.png'
    ]
  },
  {
    id: 'dust-and-shine',
    slug: 'dust-and-shine',
    title: 'Dust and Shine',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/Dust and Shine/Dust and Shine-main.png',
    client: 'Dust and Shine',
    description: [
      "Crafting business creatives for Dust and Shine has been an incredibly rewarding experience. It's been a joy to visually represent their commitment to cleanliness and excellence. Designing creatives that mirror the essence of Dust and Shine's services has been a true privilege.",
      "Wishing Dust and Shine all the best in their future endeavors. May your path be as polished and successful as the spaces you transform. Your dedication to providing exceptional cleaning services is truly commendable. Here's to your continued success and the sparkling journey that awaits!"
    ],
    images: [
      '/projects/Dust and Shine/Dust and Shine-main.png',
      '/projects/Dust and Shine/Dust and Shine1.png'
    ]
  },
  {
    id: 'glamegance',
    slug: 'glamegance',
    title: 'GlamEgance',
    category: 'Branding',
    tag: 'Logo & Identity',
    thumbnail: '/projects/GlamEgance/GlamEgance-main.png',
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
    thumbnail: '/projects/MOR Events & Mukka/MOR Events & Mukka-main.png',
    client: 'MOR Events & Mukka',
    description: [
      "Collaborating with MOR Events and Mukka to create business creatives for Diwali has been an incredibly amazing experience. It's been an absolute joy to visually capture the essence of this festive celebration and infuse it into the designs. Crafting creatives that resonate with the spirit of MOR Events and Mukka's Diwali collaboration has been a true honor.",
      "The CIT HUB team wishes MOR Events and Mukka all the best in your future endeavors. May your path be as illuminated and prosperous as the festival of lights itself. Your commitment to bringing people together and creating unforgettable experiences is truly inspiring. Here's to your continued success and the exciting journeys that lie ahead!"
    ],
    images: [
      '/projects/MOR Events & Mukka/MOR Events & Mukka-main.png',
      '/projects/MOR Events & Mukka/MOR Events & Mukka-1.png'
    ]
  },
  {
    id: 'bbk',
    slug: 'bbk',
    title: 'BBK',
    category: 'Branding',
    tag: 'Logo Design',
    thumbnail: '/projects/BBK/BBK-main.png',
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
    thumbnail: '/projects/Desi Daru/Desi Daru-main.png',
    client: 'Desi Daru',
    description: [
      "Designing business creative for Desi Daru has been an incredibly exciting journey. It's been an honor to visually capture the essence of their offerings, adding a touch of creativity to their brand identity. Crafting designs that resonate with the spirit of Desi Daru has been a true pleasure.",
      "The CIT HUB team wishes Desi Daru all the best on their path forward. May your future endeavors be as spirited and enjoyable as the products you bring to your customers. Your commitment to providing a unique whisky experience is commendable, and we're excited to see your continued growth and success. Cheers to your journey and the adventures that lie ahead!"
    ],
    images: [
      '/projects/Desi Daru/Desi Daru-main.png',
      '/projects/Desi Daru/Desi Daru-1.png'
    ]
  },
  {
    id: 'omaraa-aged-care',
    slug: 'omaraa-aged-care',
    title: 'Omaraa Aged Care',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Omaraagedcare/Omaraagedcare1.jpg',
    client: 'Omaraa Aged Care',
    description: [
      "Our full-stack collaboration with Omaraa Aged Care encompassed comprehensive branding, strategic marketing, and web development. We crafted their brand identity, created compelling marketing materials, and built a robust digital platform that seamlessly integrates care management, resident tracking, and staff coordination.",
      "The CIT HUB team is proud to have delivered end-to-end solutions for Omaraa Aged Care's digital transformation. Your commitment to providing compassionate and efficient care to seniors is truly commendable. May this complete brand and digital presence empower your team to deliver even better services and improve the lives of those in your care. Here's to your continued success!"
    ],
    images: [
      '/fullstack/Omaraagedcare/Omaraagedcare1.jpg',
      '/fullstack/Omaraagedcare/Omaraagedcare2.jpg',
      '/fullstack/Omaraagedcare/Omaraagedcare3.jpg',
      '/fullstack/Omaraagedcare/Omaraagedcare4.jpg'
    ]
  },
  {
    id: 'stepahead',
    slug: 'stepahead',
    title: 'Step Ahead',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Stepahead/Stepahead1.jpg',
    client: 'Step Ahead',
    description: [
      "Our full-stack partnership with Step Ahead included complete branding development, targeted marketing strategies, and a robust web application. We built their brand identity from the ground up, created engaging marketing materials, and developed a platform designed to support their mission of helping individuals achieve their goals through innovative technology.",
      "The CIT HUB team is thrilled to have delivered comprehensive branding, marketing, and web solutions for Step Ahead. Your vision to empower people and create meaningful change is truly inspiring. May this complete digital ecosystem serve as a catalyst for growth and success for all who use it. Here's to your continued journey of making a positive impact!"
    ],
    images: [
      '/fullstack/Stepahead/Stepahead1.jpg',
      '/fullstack/Stepahead/Stepahead2.jpg',
      '/fullstack/Stepahead/Stepahead3.jpg',
      '/fullstack/Stepahead/Stepahead4.jpg'
    ]
  },
  {
    id: 'ananta-modular',
    slug: 'ananta-modular',
    title: 'Ananta Modular',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Anantamodular/Anantamodular1.jpg',
    client: 'Ananta Modular',
    description: [
      "Our full-stack engagement with Ananta Modular encompassed strategic branding, comprehensive marketing campaigns, and web development. We created their brand identity, developed compelling marketing materials, and built a platform that showcases their innovative modular solutions with seamless user experience and robust backend infrastructure.",
      "The CIT HUB team is proud to have delivered end-to-end branding, marketing, and web solutions for Ananta Modular. Your commitment to delivering quality modular solutions is truly commendable. May this complete digital presence help you reach more customers and expand your market presence. Here's to your continued success!"
    ],
    images: [
      '/fullstack/Anantamodular/Anantamodular1.jpg',
      '/fullstack/Anantamodular/Anantamodular2.jpg',
      '/fullstack/Anantamodular/Anantamodular3.jpg',
      '/fullstack/Anantamodular/Anantamodular4.png'
    ]
  },
  {
    id: 'arn-haulage',
    slug: 'arn-haulage',
    title: 'ARN Haulage',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Arnhaulage/Arnhaulage1.png',
    client: 'ARN Haulage',
    description: [
      "Our full-stack collaboration with ARN Haulage included complete branding, strategic marketing, and web development. We established their brand identity, created professional marketing materials, and built a comprehensive logistics platform that streamlines their haulage operations, from fleet management to real-time tracking and customer coordination.",
      "The CIT HUB team is delighted to have contributed comprehensive branding, marketing, and web solutions to ARN Haulage's operational excellence. Your dedication to reliable and professional haulage services is truly impressive. May this complete digital ecosystem enhance your service delivery and help you grow your business. Here's to your continued success on the road!"
    ],
    images: [
      '/fullstack/Arnhaulage/Arnhaulage1.png',
      '/fullstack/Arnhaulage/Arnhaulage2.jpg',
      '/fullstack/Arnhaulage/Arnhaulage3.jpg',
      '/fullstack/Arnhaulage/Arnhaulage4.jpg'
    ]
  },
  {
    id: 'enable-coliving',
    slug: 'enable-coliving',
    title: 'Enable Coliving',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Enablecoliving/Enablecoliving1.jpg',
    client: 'Enable Coliving',
    description: [
      "Our full-stack partnership with Enable Coliving encompassed strategic branding, comprehensive marketing initiatives, and web development. We crafted their brand identity, developed engaging marketing campaigns, and created a platform that connects residents, manages properties, and facilitates community engagement in their innovative coliving spaces.",
      "The CIT HUB team is thrilled to have delivered complete branding, marketing, and web solutions for Enable Coliving's mission. Your vision for modern living spaces and inclusive communities is truly forward-thinking. May this comprehensive digital presence foster meaningful connections and enhance the coliving experience for all residents. Here's to building communities together!"
    ],
    images: [
      '/fullstack/Enablecoliving/Enablecoliving1.jpg',
      '/fullstack/Enablecoliving/Enablecoliving2.jpg',
      '/fullstack/Enablecoliving/Enablecoliving3.jpg',
      '/fullstack/Enablecoliving/Enablecoliving4.jpg'
    ]
  },
  {
    id: 'jn-united',
    slug: 'jn-united',
    title: 'JN United',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Jnunited/Jnunited1.jpg',
    client: 'JN United',
    description: [
      "Our full-stack collaboration with JN United included complete branding, strategic marketing, and web development. We established their brand identity, created compelling marketing materials, and built a robust application that supports their business operations with intuitive interfaces and powerful backend capabilities.",
      "The CIT HUB team is proud to have delivered comprehensive branding, marketing, and web solutions for JN United. Your commitment to excellence and innovation is truly commendable. May this complete digital ecosystem empower your team and drive your business forward. Here's to your continued growth and success!"
    ],
    images: [
      '/fullstack/Jnunited/Jnunited1.jpg',
      '/fullstack/Jnunited/Jnunited2.jpg',
      '/fullstack/Jnunited/Jnunited3.jpg',
      '/fullstack/Jnunited/Jnunited4.jpg'
    ]
  },
  {
    id: 'luxel-developers',
    slug: 'luxel-developers',
    title: 'Luxel Developers',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Luxeldevlopers/Luxeldevlopers1.jpg',
    client: 'Luxel Developers',
    description: [
      "Our full-stack engagement with Luxel Developers encompassed strategic branding, comprehensive marketing campaigns, and web development. We created their brand identity, developed professional marketing materials, and built a platform that showcases their real estate projects with stunning visuals and seamless property management capabilities.",
      "The CIT HUB team is delighted to have delivered complete branding, marketing, and web solutions for Luxel Developers. Your dedication to quality development and customer satisfaction is truly impressive. May this comprehensive digital presence help you connect with more clients and showcase your exceptional projects. Here's to your continued success in real estate!"
    ],
    images: [
      '/fullstack/Luxeldevlopers/Luxeldevlopers1.jpg',
      '/fullstack/Luxeldevlopers/Luxeldevlopers2.jpg',
      '/fullstack/Luxeldevlopers/Luxeldevlopers3.jpg',
      '/fullstack/Luxeldevlopers/Luxeldevlopers4.jpg'
    ]
  },
  {
    id: 'md-cooling',
    slug: 'md-cooling',
    title: 'MD Cooling',
    category: 'Development',
    tag: 'Full Stack',
    thumbnail: '/fullstack/Mdcooling/Mdcooling1.jpg',
    client: 'MD Cooling',
    description: [
      "Our full-stack partnership with MD Cooling included complete branding, strategic marketing, and web development. We established their brand identity, created professional marketing materials, and developed a platform that streamlines their cooling solutions business with efficient service management, customer portals, and comprehensive backend systems.",
      "The CIT HUB team is proud to have contributed comprehensive branding, marketing, and web solutions to MD Cooling's digital transformation. Your expertise in cooling solutions and commitment to customer service is truly commendable. May this complete digital ecosystem enhance your operational efficiency and help you serve your customers better. Here's to your continued success!"
    ],
    images: [
      '/fullstack/Mdcooling/Mdcooling1.jpg',
      '/fullstack/Mdcooling/Mdcooling2.jpg',
      '/fullstack/Mdcooling/Mdcooling3.jpg',
      '/fullstack/Mdcooling/Mdcooling4.jpg'
    ]
  }
];
