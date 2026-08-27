import {
  Heading,
  Text,
  Button,
  RevealFx,
  Column,
  Badge,
  Row,
  Grid,
  Schema,
  Meta,
  Media,
  SmartLink,
} from "@once-ui-system/core";
import {
  home as staticHome,
  person as staticPerson,
  baseURL,
  services,
  introduction as staticIntro,
  contact as staticContact,
  social,
} from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getPortfolioData } from "@/lib/data-store";

export async function generateMetadata() {
  const portfolioData = await getPortfolioData();
  const title = portfolioData?.home?.title || staticHome.title;
  const description = portfolioData?.home?.description || staticHome.description;

  return Meta.generate({
    title: title,
    description: description,
    baseURL: baseURL,
    path: staticHome.path,
    image: staticHome.image,
  });
}

export default async function Home() {
  const portfolioData = await getPortfolioData();
  const person = portfolioData?.person || staticPerson;
  const home = {
    ...staticHome,
    headline: portfolioData?.home?.headline || staticHome.headline,
    subline: portfolioData?.home?.subline || staticHome.subline,
  };
  const contact = {
    ...staticContact,
    email: person.email || staticContact.email,
  };

  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/work`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero Section */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="24"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" align="center" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" align="center" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx paddingTop="8" delay={0.4} horizontal="center">
            <Button
              id="selected-work-btn"
              data-border="rounded"
              href="/work"
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              Selected Work
            </Button>
          </RevealFx>
        </Column>

        {/* Hero Visual Reveal */}
        <RevealFx translateY="16" delay={0.5} fillWidth paddingTop="24">
          <Row
            fillWidth
            radius="l"
            overflow="hidden"
            border="neutral-alpha-weak"
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
            }}
          >
            <Media
              priority
              aspectRatio="16 / 9"
              sizes="(max-width: 960px) 100vw, 960px"
              alt="ne.lens photography"
              src="/images/hero/hero-cover.jpg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Row>
        </RevealFx>
      </Column>

      {/* Featured Work Section */}
      <Column id="featured-work" fillWidth gap="l" marginTop="32">
        <Row fillWidth horizontal="between" vertical="end" paddingX="l">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="brand-medium">
              Portfolio
            </Text>
            <Heading as="h2" variant="heading-strong-xl">
              Featured Work
            </Heading>
          </Column>
          <SmartLink href="/work" suffixIcon="arrowRight">
            <Text variant="body-default-s">View all projects</Text>
          </SmartLink>
        </Row>
        <Projects />
      </Column>

      {/* Introduction Section */}
      <RevealFx translateY="12" fillWidth>
        <Column
          fillWidth
          paddingX="l"
          paddingY="32"
          gap="m"
          horizontal="center"
          align="center"
          style={{
            borderTop: "1px solid var(--neutral-alpha-weak)",
            borderBottom: "1px solid var(--neutral-alpha-weak)",
          }}
        >
          <Text variant="label-default-s" onBackground="brand-medium">
            {staticIntro.tag}
          </Text>
          <Column maxWidth="s" horizontal="center" align="center" gap="12">
            <Heading
              as="h3"
              align="center"
              variant="heading-strong-xl"
              wrap="balance"
            >
              {staticIntro.headline}
            </Heading>
            <Text
              align="center"
              variant="body-default-m"
              onBackground="neutral-weak"
              wrap="balance"
            >
              {staticIntro.description}
            </Text>
          </Column>
        </Column>
      </RevealFx>

      {/* Services Section */}
      <Column fillWidth gap="l" paddingX="l" marginTop="16">
        <RevealFx translateY="8">
          <Column gap="4">
            <Text variant="label-default-s" onBackground="brand-medium">
              Services
            </Text>
            <Heading as="h2" variant="heading-strong-xl">
              Disciplines & Specializations
            </Heading>
          </Column>
        </RevealFx>

        <Grid columns={2} s={{ columns: 1 }} fillWidth gap="16">
          {services.map((service, index) => (
            <RevealFx key={`service-${service.title}-${index}`} translateY="12" delay={index * 0.08} fillWidth>
              <Column
                fillWidth
                padding="24"
                radius="m"
                border="neutral-alpha-weak"
                background="surface"
                gap="12"
              >
                <Text variant="label-default-xs" onBackground="brand-medium">
                  0{index + 1}
                </Text>
                <Heading as="h3" variant="heading-strong-m">
                  {service.title}
                </Heading>
                <Text variant="body-default-xs" onBackground="brand-weak">
                  {service.tagline}
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {service.description}
                </Text>
              </Column>
            </RevealFx>
          ))}
        </Grid>
      </Column>

      {/* Contact Section */}
      <RevealFx translateY="12" fillWidth>
        <Column
          fillWidth
          marginTop="32"
          marginBottom="24"
          padding="32"
          radius="l"
          border="neutral-alpha-weak"
          background="surface"
          horizontal="center"
          align="center"
          gap="m"
        >
          <Text variant="label-default-s" onBackground="brand-medium">
            {staticContact.tag}
          </Text>
          <Heading as="h2" align="center" variant="display-strong-m">
            {staticContact.headline}
          </Heading>
          <Text variant="heading-default-s" onBackground="brand-weak" align="center">
            {staticContact.subline}
          </Text>
          <Column maxWidth="xs" horizontal="center" align="center">
            <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              align="center"
              wrap="balance"
            >
              {staticContact.description}
            </Text>
          </Column>
          <Row gap="12" paddingTop="12" wrap horizontal="center">
            <Button
              href={`mailto:${contact.email}`}
              variant="primary"
              size="m"
              prefixIcon="email"
              arrowIcon
            >
              Get in touch
            </Button>
            {social
              .filter((s) => s.name === "Instagram")
              .map((s, index) => (
                <Button
                  key={`contact-social-${s.name}-${index}`}
                  href={s.link}
                  variant="secondary"
                  size="m"
                  prefixIcon="instagram"
                >
                  Instagram
                </Button>
              ))}
          </Row>
        </Column>
      </RevealFx>
    </Column>
  );
}
