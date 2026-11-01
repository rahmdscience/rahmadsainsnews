export type Article = {
  slug: string;
  chapter: "Thoughts" | "Sports" | "Vocation Life";
  title: string;
  eyebrow: string;
  excerpt: string;
  body: string;
  author: string;
  publishedAt: string | null;
  readingTime: number;
  category: "thoughts" | "sports" | "vocation-life";
  color: string;
  image: string;
  imageAlt: string;
  video: { src: string; poster: string; alt: string } | null;
  mediaCaption: string | null;
  mediaCredit: string | null;
  gallery: { src: string; alt: string; caption?: string; credit?: string }[];
  externalLinks: { label: string; href: string; newTab?: boolean }[];
  pullQuote: string | null;
  alignment: "left" | "center" | "right";
  mediaType: "image" | "video" | "mixed";
  featured: boolean;
  relatedArticles: string[];
  seoTitle: string;
  seoDescription: string;
  socialImage: string;
};

export const articles: Article[] = [
  { slug: "think-for-yourself", chapter: "Thoughts", title: "Think for Yourself", eyebrow: "Thoughts / 01", excerpt: "Question the obvious before it starts thinking for you.", body: "Thoughts is where RSAH slows down long enough to question the obvious. Ideas, pressure, culture, and the small decisions that quietly shape who we become.", author: "RSAH Editorial", publishedAt: null, readingTime: 3, category: "thoughts", color: "#FF8126", image: "/images/Rahmad%20Sains_Arc.png", imageAlt: "Abstract architectural form by Rahmad Sains", video: null, mediaCaption: "A shape can look fixed until you change your point of view.", mediaCredit: "RSAH archive", gallery: [], externalLinks: [], pullQuote: "Your first opinion does not have to be your final one.", alignment: "center", mediaType: "image", featured: true, relatedArticles: ["built-through-repetition", "choose-a-way-forward"], seoTitle: "Think for Yourself | RSAH", seoDescription: "A direct look at independent thinking, pressure, culture, and the choices that shape us.", socialImage: "/images/Rahmad%20Sains_Arc.png" },
  { slug: "built-through-repetition", chapter: "Sports", title: "Built Through Repetition", eyebrow: "Sports / 02", excerpt: "The work counts, especially when nobody is watching.", body: "Sport is more than the final score. It is discipline when nobody is watching, the courage to start again, and the honest feedback that turns effort into progress.", author: "RSAH Editorial", publishedAt: null, readingTime: 3, category: "sports", color: "#48B8F5", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800&q=85", imageAlt: "Athlete training on a track", video: null, mediaCaption: "Progress is usually quiet before it becomes visible.", mediaCredit: "Unsplash", gallery: [{ src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=85", alt: "Athlete lifting weights during training", caption: "Strength is built in the ordinary sessions.", credit: "Unsplash" }], externalLinks: [], pullQuote: "Consistency is a form of self-respect.", alignment: "center", mediaType: "image", featured: false, relatedArticles: ["think-for-yourself", "choose-a-way-forward"], seoTitle: "Built Through Repetition | RSAH", seoDescription: "A sharp take on discipline, repetition, competition, and progress through sport.", socialImage: "/images/Rahmad%20Sains_Arc.png" },
  { slug: "choose-a-way-forward", chapter: "Vocation Life", title: "Choose a Way Forward", eyebrow: "Vocation Life / 03", excerpt: "There is no perfect map. Build a direction you can keep choosing.", body: "Vocation Life is about work, direction, and building a life that feels like yours. No perfect map - just sharper questions, useful skills, and the nerve to move.", author: "RSAH Editorial", publishedAt: null, readingTime: 3, category: "vocation-life", color: "#39C879", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85", imageAlt: "People collaborating around a table", video: null, mediaCaption: "Direction becomes clearer when you start moving.", mediaCredit: "Unsplash", gallery: [], externalLinks: [], pullQuote: "A direction is stronger when you choose it on purpose.", alignment: "center", mediaType: "image", featured: false, relatedArticles: ["think-for-yourself", "built-through-repetition"], seoTitle: "Choose a Way Forward | RSAH", seoDescription: "A practical reflection on work, direction, skills, and building a life that feels like yours.", socialImage: "/images/Rahmad%20Sains_Arc.png" },
];
