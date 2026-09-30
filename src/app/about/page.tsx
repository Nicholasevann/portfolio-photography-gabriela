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
                              target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                              rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                              prefixIcon={item.icon}
                              suffixIcon={item.link.startsWith("http") ? "arrowUpRight" : undefined}
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
                              target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                              rel={item.link.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                              icon={item.icon}
                              tooltip={item.name}
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
                />
              </>
            )}

            {about.studies.display && (
              <Column fillWidth gap="m" marginBottom="40">
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                  {about.studies.title}
                </Heading>
                <Column fillWidth gap="l">
                  {about.studies.institutions.map((institution, index) => (
                    <ScrollReveal
                      key={`study-${institution.name}-${index}`}
                      translateY="12"
                      delay={index * 0.08}
                      fillWidth
                    >
                      <Column fillWidth gap="8">
                        <Row fillWidth horizontal="between" vertical="end" wrap gap="8">
                          <Text id={institution.name} variant="heading-strong-l">
                            {institution.name}
                          </Text>
                          {institution.timeframe && (
                            <Text variant="heading-default-xs" onBackground="neutral-weak">
                              {institution.timeframe}
                            </Text>
                          )}
                        </Row>
                        {institution.degree && (
                          <Text variant="body-default-s" onBackground="brand-weak" marginBottom="s">
                            {institution.degree}
                          </Text>
                        )}
                        {institution.achievements && institution.achievements.length > 0 ? (
                          <Column as="ul" gap="12" style={{ paddingLeft: "1.25rem" }}>
                            {institution.achievements.map((achievement, i) => (
                              <Text
                                as="li"
                                variant="body-default-m"
                                key={`study-${institution.name}-achievement-${i}`}
                              >
                                {achievement}
                              </Text>
                            ))}
                          </Column>
                        ) : institution.description ? (
                          <Text variant="body-default-m" onBackground="neutral-weak">
                            {institution.description}
                          </Text>
                        ) : null}
                      </Column>
                    </ScrollReveal>
                  ))}
                </Column>
              </Column>
            )}

            {about.technical.display && (
              <Column fillWidth gap="m" marginBottom="40">
                <Heading
                  as="h2"
                  id={about.technical.title}
                  variant="display-strong-s"
                  marginBottom="m"
                >
                  {about.technical.title}
                </Heading>
                <Column fillWidth gap="l">
                  {about.technical.skills.map((skill, index) => (
                    <ScrollReveal
                      key={`skill-${skill.title}-${index}`}
                      translateY="12"
                      delay={index * 0.08}
                      fillWidth
                    >
                      <Column fillWidth gap="8">
                        <Row fillWidth horizontal="between" vertical="end" wrap gap="8">
                          <Text id={skill.title} variant="heading-strong-l">
                            {skill.title}
                          </Text>
                          {skill.category && (
                            <Text variant="heading-default-xs" onBackground="neutral-weak">
                              {skill.category}
                            </Text>
                          )}
                        </Row>
                        {skill.role && (
                          <Text variant="body-default-s" onBackground="brand-weak" marginBottom="s">
                            {skill.role}
                          </Text>
                        )}
                        {skill.disciplines && skill.disciplines.length > 0 ? (
                          <Column as="ul" gap="12" style={{ paddingLeft: "1.25rem" }}>
                            {skill.disciplines.map((discipline, i) => (
                              <Text
                                as="li"
                                variant="body-default-m"
                                key={`skill-${skill.title}-disc-${i}`}
                              >
                                {discipline}
                              </Text>
                            ))}
                          </Column>
                        ) : skill.description ? (
                          <Text variant="body-default-m" onBackground="neutral-weak">
                            {skill.description}
                          </Text>
                        ) : null}
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
                    </ScrollReveal>
                  ))}
                </Column>
              </Column>
            )}
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}