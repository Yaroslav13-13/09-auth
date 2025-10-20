export const SITE_NAME = "NoteHub";
export const SITE_DESCRIPTION = "NoteHub — manage your notes easily";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://notehub.app";

export const getPageMetadata = (
  title: string,
  description?: string,
  path?: string
) => ({
  title: `${title} | ${SITE_NAME}`,
  description: description ?? SITE_DESCRIPTION,
  openGraph: {
    title: `${title} | ${SITE_NAME}`,
    description: description ?? SITE_DESCRIPTION,
    url: path ? `${SITE_URL}${path}` : SITE_URL,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | ${SITE_NAME}`,
    description: description ?? SITE_DESCRIPTION,
  },
});
