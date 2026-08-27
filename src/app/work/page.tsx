import { Column, Heading, Meta, Schema, Text, RevealFx } from "@once-ui-system/core";
import { baseURL, person, work } from "@/resources";
import { WorkFilterView } from "@/components/work/WorkFilterView";
import { getProjects } from "@/lib/data-store";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/images/hero/hero-cover.jpg`,
    path: work.path,
  });
}

export default async function Work() {
  const projects = await getProjects();

  return (
    <Column maxWidth="m" fillWidth paddingTop="24" paddingX="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/images/hero/hero-cover.jpg`}
        author={{
          name: person.name,
          url: `${baseURL}/work`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RevealFx translateY="8" fillWidth horizontal="center">
        <Column maxWidth="s" horizontal="center" align="center" marginBottom="l" gap="8">
          <Heading variant="display-strong-m" align="center">
            Selected Work
          </Heading>
          <Text
            variant="body-default-m"
            onBackground="neutral-weak"
            align="center"
            wrap="balance"
          >
            A curated selection of property, architecture, and spatial photography.
          </Text>
        </Column>
      </RevealFx>

      <WorkFilterView initialProjects={projects} />
    </Column>
  );
}
