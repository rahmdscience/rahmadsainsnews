const localSiteUrl = "http://localhost:3000";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || localSiteUrl;

export const siteConfig = {
  name: "RSAH",
  shortName: "RSAH",
  tagline: "#tangguh",
  title: "RSAH — #tangguh",
  description:
    "RSAH adalah ruang untuk pemikiran sendiri dan sport—santai, tajam, dan langsung ke inti untuk generasi muda yang ingin terus #tangguh.",
  author: "Rahmad Sains",
  locale: "en_US",
  audience: "Young people aged 17–24",
};
