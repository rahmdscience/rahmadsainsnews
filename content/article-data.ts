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

type ArticleSeed = Pick<Article, "slug" | "chapter" | "title" | "excerpt" | "body"> & {
  image: string;
  imageAlt: string;
  pullQuote?: string;
  featured?: boolean;
  mediaCaption?: string;
  mediaCredit?: string;
  gallery?: Article["gallery"];
};

const chapterConfig = {
  Thoughts: { category: "thoughts" as const, color: "#FF8126", image: "/images/Rahmad%20Sains_Arc.png", imageAlt: "Abstract architectural form by Rahmad Sains" },
  Sports: { category: "sports" as const, color: "#48B8F5", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1800&q=85", imageAlt: "Athlete training on a track" },
  "Vocation Life": { category: "vocation-life" as const, color: "#39C879", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85", imageAlt: "People collaborating around a table" },
};

const seeds: ArticleSeed[] = [
  { slug: "think-for-yourself", chapter: "Thoughts", title: "Think for Yourself", excerpt: "Question the obvious before it starts thinking for you.", body: "Thoughts is where RSAH slows down long enough to question the obvious. Ideas, pressure, culture, and the small decisions that quietly shape who we become.", image: chapterConfig.Thoughts.image, imageAlt: chapterConfig.Thoughts.imageAlt, pullQuote: "Your first opinion does not have to be your final one.", featured: true, mediaCaption: "A shape can look fixed until you change your point of view.", mediaCredit: "RSAH archive" },
  { slug: "lepasin-beban-dengan-usaha-sendiri", chapter: "Thoughts", title: "Lepasin Beban dengan Usaha Sendiri Emang Gaada Duanya", excerpt: "UTS pertama di dunia perkuliahan, tugas animasi yang diremehkan, begadang, panik, dan rasa lega setelah akhirnya selesai.", body: 'Jumat, 6 November kemarin, saya baru saja menuntaskan UTS pertama saya di dunia perkuliahan. Sebenarnya UTS ini sudah harus selesai dari minggu sebelumnya, tetapi karena satu dan lain hal, ada bagian yang baru dilakukan minggu ini. Hari itu lumayan berat karena ini pertama kalinya saya mendapat tugas yang dijadikan UTS sekaligus. Mata kuliahnya Bahasa Inggris. Kami diminta membuat animasi dan script presentasi berdasarkan praktikum yang sudah dilakukan, bebas memilih KAD atau FisTek. Kelompok saya memilih KAD dengan materi pembuatan larutan. Secara kasat mata, materinya terlihat mudah karena itu praktikum KAD pertama dan langkah kerjanya hanya sekitar enam tahap. Namanya juga maba, ada sedikit rasa jumawa dan meremehkan: "yah cuma buat animasi PPT, gampang ini" dan "ini saja, singkat kok step-nya". Setelah mulai dicicil, barulah terasa: waduh, kok jadi agak challenging? Waktu pengerjaannya sebenarnya empat minggu, dan jujur saja saya juga meremehkan waktu itu karena merasa sudah punya basic. Sampai minggu keempat, hanya satu orang sekelas yang berani maju. Presentasinya tidak terlalu lancar, tetapi akhirnya selesai. Setelah itu dia tidak sengaja bilang "wtf" di depan kelas dan dosen. Dosen yang tadinya mau memberi nilai 90 karena dia berani maju dan menyelesaikan presentasi akhirnya mengurangi 10 poin karena keceplosan dan beberapa hal lain. Untungnya dosen kami baik. Satu kelas boleh nego untuk meminta tambahan waktu, dan akhirnya presentasi dijadwalkan ulang. Sehari sebelum tampil, teman-teman mulai menghafal dengan cara masing-masing. Ada yang jongkok menyender di dinding, menyendiri, pergi ke WC seperti saya, jalan-jalan sambil menghafal, sampai menempelkan kepala ke tembok. Random, tetapi semuanya tryhard karena memang belum siap. Jadwal sempat berubah lagi karena kelas kosong tidak ditemukan, lalu dosen memberi tambahan waktu. Hari Jumat diawali UTS Kimia yang open book, tetapi tetap saja dibantai. Saya cuma bisa mengelus dada. Setelah itu masuk ke kelas Bahasa Inggris. Karena waktunya mepet salat Jumat, kami meminta agar mahasiswa laki-laki maju lebih dulu dan dosen kembali mengizinkan. Satu per satu maju dan langsung mendapat nilai sekaligus koreksi. Yang paling sering dikoreksi adalah isi PPT dan pronunciation. Giliran saya maju, jujur saya deg-degan karena kelompok saya sepertinya punya langkah paling banyak. Dari yang awalnya sekitar enam step, tiba-tiba berkembang menjadi dua belas. Singkat cerita, presentasi selesai dan hasilnya memuaskan, walaupun ada kesalahan pendengaran dari dosen sehingga nilainya seharusnya mungkin bisa lebih tinggi. Setelah presentasi, beban itu seperti lepas. Tidak ada lagi pikiran yang mengganggu. Saya tinggal membantu teman-teman yang presentasi berikutnya, misalnya ketika mereka lupa nama material dalam Bahasa Inggris. Setelah salat Jumat dan membeli nasi padang dekat kampus, saya pergi ke rumah teman untuk makan. Presentasi masih berlanjut sekitar jam dua, terutama untuk teman-teman perempuan yang belum kebagian giliran. Dosen bahkan memperpanjang waktu sampai Rabu depan dan Jumat depan karena masih ada yang belum hafal. Sesampainya di rumah teman, saya makan, ngobrol, lalu ketiduran. Sehari sebelumnya saya benar-benar tidak tidur dari Kamis sampai Jumat karena menghafal, mengerjakan laprak, dan melengkapi catatan. Saat naik motor, kepala saya agak berkunang-kunang dan badan terasa tidak enak. Tapi, syukurlah, semuanya bisa dilewati. Dari situ saya belajar satu hal: beban yang diremehkan tetap bisa terasa berat ketika benar-benar dikerjakan. Namun setelah usaha itu dituntaskan, lega yang datang memang tidak ada duanya.', image: chapterConfig.Thoughts.image, imageAlt: chapterConfig.Thoughts.imageAlt, pullQuote: "Beban yang diremehkan tetap bisa terasa berat ketika benar-benar dikerjakan." },
  { slug: "attention-is-a-choice", chapter: "Thoughts", title: "Attention Is a Choice", excerpt: "Your focus is being rented out. Take some of it back.", body: "Every notification wants a small piece of your life. Attention is not an infinite resource, so spend it on the people, work, and questions that make you sharper.", image: chapterConfig.Thoughts.image, imageAlt: chapterConfig.Thoughts.imageAlt },
  { slug: "slow-down-the-noise", chapter: "Thoughts", title: "Slow Down the Noise", excerpt: "Speed can make a bad idea feel like a decision.", body: "The fastest answer is often just the loudest one. Give yourself enough quiet to notice what you actually think before the room decides for you.", image: chapterConfig.Thoughts.image, imageAlt: chapterConfig.Thoughts.imageAlt },
  { slug: "what-you-do-with-doubt", chapter: "Thoughts", title: "What You Do with Doubt", excerpt: "Doubt is useful when it becomes a question, not a prison.", body: "Uncertainty does not mean stop. Use it to find the next honest question, then take the smallest step that gives you better information.", image: chapterConfig.Thoughts.image, imageAlt: chapterConfig.Thoughts.imageAlt },
  { slug: "built-through-repetition", chapter: "Sports", title: "Built Through Repetition", excerpt: "The work counts, especially when nobody is watching.", body: "Sport is more than the final score. It is discipline when nobody is watching, the courage to start again, and the honest feedback that turns effort into progress.", image: chapterConfig.Sports.image, imageAlt: chapterConfig.Sports.imageAlt, pullQuote: "Consistency is a form of self-respect.", mediaCaption: "Progress is usually quiet before it becomes visible.", mediaCredit: "Unsplash", gallery: [{ src: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=85", alt: "Athlete lifting weights during training", caption: "Strength is built in the ordinary sessions.", credit: "Unsplash" }] },
  { slug: "start-before-ready", chapter: "Sports", title: "Start Before Ready", excerpt: "Confidence is often the receipt, not the payment.", body: "Waiting to feel ready is a comfortable way to stay exactly where you are. Start with the version of the plan you can actually do today.", image: chapterConfig.Sports.image, imageAlt: chapterConfig.Sports.imageAlt, pullQuote: "The first rep is allowed to be ugly." },
  { slug: "rest-is-part-of-work", chapter: "Sports", title: "Rest Is Part of the Work", excerpt: "Recovery is not quitting. It is how effort becomes capacity.", body: "A body and mind that never recover cannot keep improving. Rest is a deliberate part of training, not a reward you have to earn after breaking yourself.", image: chapterConfig.Sports.image, imageAlt: chapterConfig.Sports.imageAlt },
  { slug: "compete-with-yesterday", chapter: "Sports", title: "Compete with Yesterday", excerpt: "The scoreboard is useful. It is not your identity.", body: "Competition can sharpen you without owning you. Measure the result, learn from it, and return to the only opponent you can actually change: your previous self.", image: chapterConfig.Sports.image, imageAlt: chapterConfig.Sports.imageAlt },
  { slug: "the-honest-scoreboard", chapter: "Sports", title: "The Honest Scoreboard", excerpt: "What changed when nobody was there to applaud it?", body: "The most honest score is not always public. It is the habit you kept, the weakness you faced, and the promise you stopped making excuses for.", image: chapterConfig.Sports.image, imageAlt: chapterConfig.Sports.imageAlt },
  { slug: "choose-a-way-forward", chapter: "Vocation Life", title: "Choose a Way Forward", excerpt: "There is no perfect map. Build a direction you can keep choosing.", body: "Vocation Life is about work, direction, and building a life that feels like yours. No perfect map - just sharper questions, useful skills, and the nerve to move.", image: chapterConfig["Vocation Life"].image, imageAlt: chapterConfig["Vocation Life"].imageAlt, pullQuote: "A direction is stronger when you choose it on purpose.", mediaCaption: "Direction becomes clearer when you start moving.", mediaCredit: "Unsplash" },
  { slug: "skills-before-status", chapter: "Vocation Life", title: "Skills Before Status", excerpt: "A title can open a door. Skill keeps you in the room.", body: "Chase capability before applause. Skills compound quietly, travel with you, and give you more choices than a label ever can.", image: chapterConfig["Vocation Life"].image, imageAlt: chapterConfig["Vocation Life"].imageAlt },
  { slug: "make-work-fit-life", chapter: "Vocation Life", title: "Make Work Fit Life", excerpt: "A career is part of your life, not permission to postpone it.", body: "Work matters, but it is not the whole story. Build a rhythm that leaves enough of you available for health, people, curiosity, and a life outside the output.", image: chapterConfig["Vocation Life"].image, imageAlt: chapterConfig["Vocation Life"].imageAlt },
  { slug: "the-first-useful-step", chapter: "Vocation Life", title: "The First Useful Step", excerpt: "A direction becomes real when it changes what you do next.", body: "You do not need the five-year answer. Find the next useful step, do it properly, and let evidence make the route more precise.", image: chapterConfig["Vocation Life"].image, imageAlt: chapterConfig["Vocation Life"].imageAlt },
  { slug: "leave-room-to-change", chapter: "Vocation Life", title: "Leave Room to Change", excerpt: "Changing direction is not a character flaw.", body: "The plan you made at seventeen is allowed to expire. Keep the lessons, release the performance, and choose again with better information.", image: chapterConfig["Vocation Life"].image, imageAlt: chapterConfig["Vocation Life"].imageAlt },
];

export const articles: Article[] = seeds.map((seed) => {
  const config = chapterConfig[seed.chapter];
  const chapterNumber = seeds.filter((item) => item.chapter === seed.chapter).indexOf(seed) + 1;
  return {
    ...seed,
    eyebrow: seed.chapter + " / " + String(chapterNumber).padStart(2, "0"),
    author: "RSAH Editorial",
    publishedAt: null,
    readingTime: 3,
    category: config.category,
    color: config.color,
    video: null,
    mediaCaption: seed.mediaCaption ?? null,
    mediaCredit: seed.mediaCredit ?? null,
    gallery: seed.gallery ?? [],
    externalLinks: [],
    pullQuote: seed.pullQuote ?? null,
    alignment: "center",
    mediaType: "image",
    featured: seed.featured ?? false,
    relatedArticles: [],
    seoTitle: seed.title + " | RSAH",
    seoDescription: seed.excerpt,
    socialImage: "/images/Rahmad%20Sains_Arc.png",
  };
});

articles.forEach((article) => {
  article.relatedArticles = articles.filter((candidate) => candidate.chapter === article.chapter && candidate.slug !== article.slug).slice(0, 2).map((candidate) => candidate.slug);
});
