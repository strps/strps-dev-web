import { gql } from '@apollo/client'

export const PAGE_BLOCK_FIELDS = gql`
  fragment SectionConfigFields on SectionConfig {
    section_id
    backgroundContainer
    theme
    background
    backgroundImage {
      url
      alt
      width
      height
    }
  }

  fragment PageHeroFields on PageHeroBlock {
    blockType
    eyebrow
    heroVariant: variant
    name
    headline
    showPlotLine
    label
    description
    location {
      city
      region
    }
    status {
      isAvailable
      label
      availableFrom
    }
    email
    heroLinks: links {
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    backgroundImage {
      url
      alt
      width
      height
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageServicesHeroFields on PageServicesHeroBlock {
    blockType
    eyebrow
    title
    description
    status {
      isAvailable
      label
      availableFrom
    }
    servicesHeroLinks: links {
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    highlights {
      text
    }
    backgroundImage {
      url
      alt
      width
      height
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageAboutFields on PageAboutBlock {
    blockType
    eyebrow
    title
    layout
    summary
    body
    image {
      url
      alt
      width
      height
    }
    aboutLink: link {
      type
      newTab
      url
      label
      appearance
      reference {
        relationTo
        value {
          ... on Page {
            slug
          }
        }
      }
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageSkillsFields on PageSkillsBlock {
    blockType
    eyebrow
    title
    skillsVariant: variant
    subtitle
    skillGroups {
      name
      icon
      keywords {
        keyword
      }
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageProjectsFields on PageProjectsBlock {
    blockType
    eyebrow
    title
    projectsVariant: variant
    projectsLink: link {
      type
      newTab
      url
      label
      appearance
      reference {
        relationTo
        value {
          ... on Page {
            slug
          }
        }
      }
    }
    populateBy
    limit
    selectedProjects {
      id
      title
      slug
      heroImage {
        url
        alt
      }
      meta {
        description
      }
      links {
        liveSite
        github
      }
      techStack {
        name
      }
      caseStudy {
        tag
        year
        problem
        contribution
        context
        decisions
        outcome
      }
    }
    githubUrl
    section {
      ...SectionConfigFields
    }
  }

  fragment PageExperienceFields on PageExperienceBlock {
    blockType
    title
    positions {
      company
      position
      startDate
      endDate
      summary
      highlights {
        highlight
      }
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageContactFields on PageContactBlock {
    blockType
    eyebrow
    title
    description
    email
    emailLabel
    note
    contactForm: form {
      ...FormDetailFields
    }
    contactLinks: links {
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageBlogFields on PageBlogBlock {
    blockType
    eyebrow
    title
    blogPopulateBy: populateBy
    blogLimit: limit
    selectedPosts {
      id
      title
      slug
      heroImage {
        url
        alt
      }
      meta {
        description
      }
      publishedAt
      tags {
        tag
      }
      populatedAuthors {
        name
      }
    }
    blogUrl
    section {
      ...SectionConfigFields
    }
  }

  fragment PageServicesFields on PageServicesBlock {
    blockType
    title
    intro
    services {
      id
      name
      forWho
      features {
        feature
      }
      timeline
      pricing
      goodFitPoints {
        point
      }
      proofLabel
      proofUrl
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageProcessFields on PageProcessBlock {
    blockType
    processVariant: variant
    title
    intro
    steps {
      id
      title
      description
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageFaqFields on PageFaqBlock {
    blockType
    title
    intro
    questions {
      id
      question
      answer
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageServicesTeaserFields on PageServicesTeaserBlock {
    blockType
    eyebrow
    title
    teaserLink: link {
      type
      newTab
      url
      label
      appearance
      reference {
        relationTo
        value {
          ... on Page {
            slug
          }
        }
      }
    }
    items {
      id
      name
      summary
      link {
        type
        newTab
        url
        label
        appearance
        reference {
          relationTo
          value {
            ... on Page {
              slug
            }
          }
        }
      }
    }
    section {
      ...SectionConfigFields
    }
  }

  fragment PageLabTeaserFields on PageLabTeaserBlock {
    blockType
    eyebrow
    title
    intro
    labTeaserLink: link {
      type
      newTab
      url
      label
      appearance
      reference {
        relationTo
        value {
          ... on Page {
            slug
          }
        }
      }
    }
    limit
    section {
      ...SectionConfigFields
    }
  }

  fragment FormDetailFields on Form {
    id
    enableRecaptcha
    title
    fields {
      ... on Checkbox {
        blockType
        name
        label
        width
        required
        defaultBool: defaultValue
      }
      ... on Country {
        blockType
        name
        label
        width
        required
      }
      ... on Email {
        blockType
        name
        label
        width
        required
      }
      ... on Message {
        blockType
        message
      }
      ... on Number {
        blockType
        name
        label
        width
        defaultNum: defaultValue
        required
      }
      ... on Select {
        blockType
        name
        label
        width
        defaultStr: defaultValue
        placeholder
        options {
          label
          value
        }
        required
      }
      ... on State {
        blockType
        name
        label
        width
        required
      }
      ... on Text {
        blockType
        name
        label
        width
        defaultStr: defaultValue
        required
      }
      ... on Textarea {
        blockType
        name
        label
        width
        defaultStr: defaultValue
        required
      }
    }
    submitButtonLabel
    confirmationType
    confirmationMessage
    redirect {
      url
    }
  }

  fragment FormBlockFields on FormBlock {
    blockType
    introType
    introContent
    introTitle
    introText
    form {
      ...FormDetailFields
    }
    section {
      ...SectionConfigFields
    }
  }
`

export const GET_PAGE_BY_SLUG = gql`
  ${PAGE_BLOCK_FIELDS}
  query GetPageBySlug($slug: String!, $draft: Boolean) {
    Pages(
      where: { slug: { equals: $slug } }
      limit: 1
      draft: $draft
    ) {
      docs {
        id
        title
        slug
        layout {
          ...PageHeroFields
          ...PageServicesHeroFields
          ...PageServicesTeaserFields
          ...PageAboutFields
          ...PageSkillsFields
          ...PageProjectsFields
          ...PageLabTeaserFields
          ...PageExperienceFields
          ...PageServicesFields
          ...PageProcessFields
          ...PageFaqFields
          ...PageContactFields
          ...PageBlogFields
          ...FormBlockFields
        }
        meta {
          title
          description
          image {
            url
          }
        }
        
      }
    }
  }
`

export const GET_HOME_PAGE = gql`
  ${PAGE_BLOCK_FIELDS}
  query GetHomePage($draft: Boolean) {
    Pages(
      where: { slug: { equals: "home" } }
      limit: 1
      draft: $draft
    ) {
      docs {
        id
        title
        slug
        layout {
          ...PageHeroFields
          ...PageAboutFields
          ...PageSkillsFields
          ...PageProjectsFields
          ...PageExperienceFields
          ...PageContactFields
          ...PageBlogFields
          ...FormBlockFields
        }
      }
    }
  }
`
