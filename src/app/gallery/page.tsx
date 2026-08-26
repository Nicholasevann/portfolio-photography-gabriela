import { Column, Heading, Meta, Schema, Text, RevealFx } from "@once-ui-system/core";
import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/images/hero/hero-cover.jpg`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <Column maxWidth="l" fillWidth paddingTop="24" paddingX="l" horizontal="center" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/images/hero/hero-cover.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}/work`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RevealFx translateY="8" fillWidth horizontal="center">
        <Column maxWidth="s" horizontal="center" align="center" marginBottom="m" gap="8">
          <Heading variant="display-strong-m" align="center">
            Photography Gallery
          </Heading>
          <Text
            variant="body-default-m"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
          >
            {gallery.description}
          </Text>
        </Column>
      </RevealFx>
      <GalleryView />
    </Column>
  );
}
