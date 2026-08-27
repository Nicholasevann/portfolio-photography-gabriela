import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about as staticAbout, person as staticPerson, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import WorkExperienceSection from "@/components/about/WorkExperienceSection";
import styles from "@/components/about/about.module.scss";
import React from "react";
import { getAbout, getPerson } from "@/lib/data-store";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatLocationLabel(loc: string): string {
  if (!loc) return "Bali, Indonesia";
  const lower = loc.toLowerCase();
  if (lower.includes("makassar") || lower.includes("bali")) return "Bali, Indonesia";
  if (lower.includes("jakarta")) return "Jakarta, Indonesia";
  if (loc.includes("/")) return loc.split("/")[1].replace(/_/g, " ");
  return loc;
}

export async function generateMetadata() {
  const dynamicAbout = await getAbout();
  const title = dynamicAbout?.title || staticAbout.title;
  const description = dynamicAbout?.description || staticAbout.description;

  return Meta.generate({
    title: title,
    description: description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: staticAbout.path,
  });
}

export default async function About() {
  const dynamicAbout = await getAbout();
  const dynamicPerson = await getPerson();

  const person = dynamicPerson || staticPerson;
  const about = {
    ...staticAbout,
    title: dynamicAbout?.title || staticAbout.title,
    description: dynamicAbout?.description || staticAbout.description,
    intro: {
      ...staticAbout.intro,
      title: dynamicAbout?.headline || staticAbout.intro.title,
      description: dynamicAbout?.introText || staticAbout.intro.description,
    },
    work: {
      ...staticAbout.work,
      experiences: dynamicAbout?.photographyExperiences || staticAbout.work.experiences,
    },
    studies: {
      ...staticAbout.studies,
      institutions: dynamicAbout?.education || staticAbout.studies.institutions,
    },
    technical: {
      ...staticAbout.technical,
      skills: dynamicAbout?.skills || staticAbout.technical.skills,
    },
  };

  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m" fillWidth>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <RevealFx translateY="8" fillWidth>
        <Row fillWidth s={{ direction: "column" }} horizontal="center">
          {about.avatar.display && (
            <Column
              className={styles.avatar}
              top="64"
              fitHeight
              position="sticky"
              s={{ position: "relative", style: { top: "auto" } }}
              xs={{ style: { top: "auto" } }}
              minWidth="160"
              paddingX="l"
              paddingBottom="xl"
              gap="m"
              flex={3}
              horizontal="center"
            >
              <Avatar src={person.avatar} size="xl" />
              <Row gap="8" vertical="center">
                <Icon onBackground="accent-weak" name="globe" />
                {formatLocationLabel(person.location)}
              </Row>
              {person.languages && person.languages.length > 0 && (
                <Row wrap gap="8">
                  {person.languages.map((language, index) => (
                    <Tag key={`${language}-${index}`} size="l">
                      {language}
                    </Tag>
                  ))}
                </Row>
              )}
            </Column>
          )}
          <Column className={styles.blockAlign} flex={9} maxWidth={40}>
            <Column
              id={about.intro.title}
              fillWidth
              minHeight="160"
              vertical="center"
              marginBottom="32"
            >
              {about.calendar.display && (
                <Row
                  fitWidth
                  border="brand-alpha-medium"
                  background="brand-alpha-weak"
                  radius="full"
                  padding="4"
                  gap="8"
                  marginBottom="m"
                  vertical="center"
                  className={styles.blockAlign}
                  style={{
                    backdropFilter: "blur(var(--static-space-1))",
                  }}
                >
                  <Icon paddingLeft="12" name="globe" onBackground="brand-weak" />
                  <Row paddingX="8">Software Developer Portfolio</Row>
                  <IconButton
                    href="https://my-porto-nine-livid.vercel.app/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-border="rounded"
                    variant="secondary"
                    icon="arrowUpRight"
                  />
                </Row>
              )}
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
              </Heading>
              <Text
                className={styles.textAlign}
                variant="display-default-xs"
                onBackground="neutral-weak"
              >
                {person.role}
              </Text>
              {social.length > 0 && (
                <Row
                  className={styles.blockAlign}
                  paddingTop="20"
                  paddingBottom="8"
                  gap="8"
                  wrap
                  horizontal="center"
                  fitWidth
                  data-border="rounded"
                >
                  {social
                    .filter((item) => item.essential)
                    .map((item) =>
                      item.link ? (
                        <React.Fragment key={`social-${item.name}`}>
                          <Row s={{ hide: true }}>
                            <Button
                              key={`btn-desktop-${item.name}`}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                          <Row hide s={{ hide: false }}>
                            <IconButton
                              size="l"
                              key={`btn-mobile-${item.name}`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                        </React.Fragment>
                      ) : null,
                    )}
                </Row>
              )}
            </Column>

            {about.intro.display && (
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
              </Column>
            )}

            {about.work.display && (
              <>
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                  {about.work.title}
                </Heading>
                <WorkExperienceSection
                  photographyExperiences={dynamicAbout?.photographyExperiences}
                  engineeringExperiences={dynamicAbout?.engineeringExperiences}
                />
              </>
            )}

            {about.studies.display && (
              <ScrollReveal translateY="12" fillWidth>
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.studies.institutions.map((institution, index) => (
                    <Column key={`study-${institution.name}-${index}`} fillWidth gap="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.description}
                      </Text>
                    </Column>
                  ))}
                </Column>
              </ScrollReveal>
            )}

            {about.technical.display && (
              <ScrollReveal translateY="12" fillWidth>
                <Heading
                  as="h2"
                  id={about.technical.title}
                  variant="display-strong-s"
                  marginBottom="40"
                >
                  {about.technical.title}
                </Heading>
                <Column fillWidth gap="l">
                  {about.technical.skills.map((skill, index) => (
                    <Column key={`skill-${skill.title}-${index}`} fillWidth gap="4">
                      <Text id={skill.title} variant="heading-strong-l">
                        {skill.title}
                      </Text>
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {skill.description}
                      </Text>
                      {skill.tags && skill.tags.length > 0 && (
                        <Row wrap gap="8" paddingTop="8">
                          {skill.tags.map((tag, tagIndex) => (
                            <Tag key={`tag-${skill.title}-${tag.name}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                              {tag.name}
                            </Tag>
                          ))}
                        </Row>
                      )}
                    </Column>
                  ))}
                </Column>
              </ScrollReveal>
            )}
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}